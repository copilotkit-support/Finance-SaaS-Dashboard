import { Cell, Legend } from "recharts";
import { useEffect, useState } from "react";
import { Pie, PieChart, Tooltip } from "recharts";

interface PieDataItem {
  name: string;
  value: number;
  color: string;
  shortName: string;
}


interface PieDataProps {
  args: PieDataItem[]
  title: string
}

export function PieData({ args, title }: PieDataProps) {
  const [chartData, setChartData] = useState<PieDataItem[]>([]);
  useEffect(() => {
    console.log(JSON.stringify(args), "argsarhs");
    setChartData(args);
  }, [args]);

  return (
    <div className="flex-1 p-4 rounded-2xl shadow-lg flex flex-col items-center min-w-[250px] max-w-[350px] h-[260px]">
      <h2 className="text-xl font-semibold mb-2 text-gray-700 text-center">
        {title || "Data Distribution"}
      </h2>
      <div className="h-[180px] flex flex-col items-center justify-center">
        <PieChart width={260} height={180}>
          {/* <Legend wrapperStyle={{ color: 'white' }} /> */}
          <Pie
            data={chartData}
            cx={130}
            cy={90}
            innerRadius={30}
            outerRadius={70}
            paddingAngle={0}
            // legendType="circle"
            dataKey="value"
            labelLine={false}
            label={({ value }) => value}
          >
            {chartData?.map((entry, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={chartData[index]?.color}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
        </PieChart>
      
      </div>
      
    </div>
  )
}

export const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0]?.payload;
    return (
      <div className="bg-white p-2 rounded shadow text-black">
        <div>{name.split("_").join(" ")}</div>
        <div>Value: {value}</div>
      </div>
    );
  }
  return null;
};

export function chunkArray<T>(array: T[], size: number): T[][] {
  const result = [];
  for (let i = 0; i < array?.length; i += size) {
    result.push(array?.slice(i, i + size));
  }
  return result;
}