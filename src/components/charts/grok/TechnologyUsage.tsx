import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export function TechnologyUsage({ data }: { data: any }) {
  const technologyTimeline = data.technology_timeline;

  const allTechnologies: any[] = [];

  for (const category in technologyTimeline) {
    technologyTimeline[category].forEach((tech: any) => {
      allTechnologies.push({
        name: tech.name,
        total_months: tech.total_months,
      });
    });
  }

  const chartData = allTechnologies.sort(
    (a: any, b: any) => b.total_months - a.total_months,
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" />
        <YAxis label={{ value: "Total Months", position: "insideLeft" }} />
        <Bar dataKey="total_months" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
