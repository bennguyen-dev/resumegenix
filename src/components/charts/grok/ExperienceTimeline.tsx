import { CVData } from "@/types/resume";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export function ExperienceTimeline({ data }: { data: CVData["experience"] }) {
  const chartData = data.map((exp) => ({
    label: `${exp.company} - ${exp.position}`,
    duration: exp.duration_months,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="duration"
          label={{ value: "Duration (months)", position: "bottom" }}
        />
        <YAxis type="category" dataKey="label" width={200} />
        <Bar dataKey="duration" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
