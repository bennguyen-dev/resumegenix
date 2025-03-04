import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TimelineItem } from "@/types/resume";

interface SkillTimelineLineChartProps {
  data: TimelineItem[];
  title: string;
}

const SkillTimelineLineChart: React.FC<SkillTimelineLineChartProps> = ({
  data,
  title,
}) => {
  if (!data || data.length === 0) {
    return <p>No skill timeline data available.</p>;
  }

  // Convert first_used to a numerical value for the x-axis
  const chartData = data.map((item) => ({
    ...item,
    year: new Date(item.first_used).getFullYear(),
    total_months: item.total_months || 0, // Handle null total_months values
  }));

  return (
    <div>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis dataKey="total_months" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="total_months"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillTimelineLineChart;
