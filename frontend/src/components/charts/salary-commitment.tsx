import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [{ month: "january", salary: 1260, debts: 570 }]

const chartConfig = {
  salary: {
    label: "Salary",
    color: "#53ff50",
  },
  debts: {
    label: "Debts",
    color: "#ff5757",
  },
} satisfies ChartConfig

export function SalaryCommitment() {
  const totalSalaryCommitment = ((chartData[0].debts / chartData[0].salary) * 100).toFixed(2)

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[250px]"
    >
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-white text-2xl font-bold"
                    >
                      {totalSalaryCommitment.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-black-500"
                    >
                      % (percents)
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="salary"
          stackId="a"
          cornerRadius={5}
          fill={chartConfig.salary.color}
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="debts"
          fill={chartConfig.debts.color}
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  )
}
