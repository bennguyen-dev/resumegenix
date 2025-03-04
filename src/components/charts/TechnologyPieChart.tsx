import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Skills } from "@/types/resume";

interface TechnologyPieChartProps {
  data: Skills["technical"];
  title: string;
}

const TechnologyPieChart: React.FC<TechnologyPieChartProps> = ({
  data,
  title,
}) => {
  if (!data) {
    return <p>No technology pie chart data available.</p>;
  }

  // Prepare data for the pie chart
  const pieData = Object.keys(data).map((key) => ({
    name: key,
    value: data?.[key as keyof typeof data]?.length,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#A569BD",
  ];

  return (
    <div>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TechnologyPieChart;
