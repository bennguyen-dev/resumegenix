import { Pie, PieChart, Cell, Legend, ResponsiveContainer } from "recharts";
import { CVData } from "@/types/resume";

export function SkillsDistribution({ data }: { data: CVData }) {
  const technicalSkills = data.skills.technical;
  const softSkills = data.skills.soft;

  const technicalTotal = Object.values(technicalSkills).flat().length;
  const softTotal = softSkills.length;

  const chartData = [
    { name: "Technical", value: technicalTotal },
    { name: "Soft", value: softTotal },
  ];

  const colors = ["#8884d8", "#82ca9d"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
