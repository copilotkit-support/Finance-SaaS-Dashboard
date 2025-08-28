import { useEffect, useState } from "react"
import { Legend } from "recharts"
import { CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"
import { Bar } from "recharts"
import { BarChart } from "recharts"
import { X } from "lucide-react"

interface BarChartData {
  name: string;
  value: number;
}

export function BarData({ args, from, onRemove }: any) {
  const [data, setData] = useState<BarChartData[]>([])
  const chartColors = [
    "hsl(12, 76%, 61%)",
    "hsl(173, 58%, 39%)",
    "hsl(197, 37%, 24%)",
    "hsl(43, 74%, 66%)",
    "hsl(27, 87%, 67%)"
  ];

  useEffect(() => {
    debugger
    console.log(args)
    if (args?.items) {
      setData(args?.items)
    }
  }, [args?.items])

  return (
    <>
      {/* Bar Chart Section */}
      <div className="relative flex-1 p-4 rounded-2xl shadow-lg flex flex-col items-center min-w-[250px] h-[260px]">
        {from === "canvas" && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Remove"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <h2 className="text-xl font-semibold mb-2 text-gray-700 text-center">{args?.title_of_chart || "Data Distribution"} </h2>
        <div className="h-[180px] flex items-center justify-center">
          <BarChart width={(data?.length > 5 && from === "canvas") ? 720 : 260} height={180} data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b855" />
            <XAxis dataKey="name" stroke="#cbd5e1" className="text-black"
              tickFormatter={(value: string) => value[0]?.toUpperCase()} />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={{ background: '#1f2937', border: 'none', color: 'white' }} />
            <Legend wrapperStyle={{ color: 'white' }} />
            <Bar
              dataKey="value"
              fill={chartColors[3]}
            />
            {/* <Bar dataKey="merged" fill="#475569" /> */}
            {/* <Bar dataKey="closed" fill="#cbd5e1" /> */}
          </BarChart>
        </div>
      </div>
    </>
  )
}