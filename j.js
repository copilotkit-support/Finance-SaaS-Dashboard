#!/usr/bin/env node

// Simple CSV → Array<Object> converter.
// Usage:
//   node j.js <input.csv> [-o output.json] [--delimiter ","]
// Examples:
//   node j.js data_csv.csv              // writes to out.json
//   node j.js data_csv.csv -o j.json    // writes to j.json

const fs = require('fs');
const path = require('path');

function showUsageAndExit(message) {
  if (message) {
    console.error(message);
  }
  console.error(
    'Usage: node j.js <input.csv> [-o output.json] [--delimiter ","]' +
      '\n' +
      '  -o, --output       Optional output JSON file path (defaults to out.json)\n' +
      '  --delimiter        Optional delimiter (default auto-detect; fallbacks to ",")\n'
  );
  process.exit(1);
}

function parseArgs(argv) {
  const args = { input: null, output: null, delimiter: null };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!args.input && !token.startsWith('-')) {
      args.input = token;
      continue;
    }
    if (token === '-o' || token === '--output') {
      const next = argv[i + 1];
      if (!next || next.startsWith('-')) showUsageAndExit('Missing value for ' + token);
      args.output = next;
      i++;
      continue;
    }
    if (token === '--delimiter') {
      const next = argv[i + 1];
      if (!next || next.startsWith('-')) showUsageAndExit('Missing value for --delimiter');
      args.delimiter = next === 'tab' ? '\t' : next;
      i++;
      continue;
    }
    showUsageAndExit('Unknown argument: ' + token);
  }
  if (!args.input) showUsageAndExit('Missing <input.csv>');
  return args;
}

function detectDelimiter(text) {
  const candidates = { ',': 0, ';': 0, '\t': 0, '|': 0 };
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      // Toggle quotes, accounting for escaped quotes "" inside quoted field
      if (inQuotes && text[i + 1] === '"') {
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (!inQuotes) {
      if (ch === '\n' || ch === '\r') break; // only inspect header line
      if (candidates.hasOwnProperty(ch)) candidates[ch]++;
    }
  }
  let best = ',';
  let bestCount = -1;
  for (const k of Object.keys(candidates)) {
    if (candidates[k] > bestCount) {
      bestCount = candidates[k];
      best = k;
    }
  }
  return bestCount > 0 ? best : ',';
}

function parseCSV(text, delimiter) {
  const rows = [];
  const D = delimiter;
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      continue;
    }

    if (ch === D) {
      row.push(field);
      field = '';
      continue;
    }

    if (ch === '\n' || ch === '\r') {
      // End of row
      row.push(field);
      field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
      // Handle CRLF
      if (ch === '\r' && text[i + 1] === '\n') i++;
      continue;
    }

    field += ch;
  }

  // Push last field/row if not terminated by newline
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.length > 1 || row[0] !== '') rows.push(row);
  }

  return rows;
}

function rowsToObjects(rows) {
  if (!rows.length) return [];
  const headers = rows[0].map(h => String(h).trim());
  const dataRows = rows.slice(1);
  return dataRows.map(r => {
    const obj = {};
    for (let i = 0; i < headers.length; i++) {
      const key = headers[i] || `col${i + 1}`;
      obj[key] = r[i] !== undefined ? r[i] : '';
    }
    return obj;
  });
}

function csvFileToObjects(filePath, explicitDelimiter) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''); // strip BOM
  const delimiter = explicitDelimiter || detectDelimiter(raw);
  const rows = parseCSV(raw, delimiter);
  return rowsToObjects(rows);
}

(function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputPath = path.resolve(process.cwd(), args.input);
  if (!fs.existsSync(inputPath)) showUsageAndExit('Input file not found: ' + inputPath);

  const objects = csvFileToObjects(inputPath, args.delimiter);
  const json = JSON.stringify(objects, null, 2);

  if (args.output) {
    const outPath = path.resolve(process.cwd(), args.output);
    fs.writeFileSync(outPath, json, 'utf8');
    console.error('Wrote JSON to ' + outPath);
  } else {
    const outPath = path.resolve(process.cwd(), 'out.json');
    fs.writeFileSync(outPath, json, 'utf8');
    console.error('Wrote JSON to ' + outPath);
  }
})();


