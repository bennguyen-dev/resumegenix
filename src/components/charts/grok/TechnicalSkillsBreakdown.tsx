import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { CVData } from "@/types/resume";

export function TechnicalSkillsBreakdown({ data }: { data: CVData }) {
  const technical = data.skills.technical;

  const chartData = Object.keys(technical).map((key) => ({
    category: key,
    count: technical[key as keyof typeof technical].length,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis label={{ value: "Number of Skills", position: "insideLeft" }} />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
