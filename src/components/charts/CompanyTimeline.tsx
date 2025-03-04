import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Experience } from "@/types/resume"; // Assuming your Experience type

interface CompanyTimelineProps {
  data: Experience[];
  title: string;
}

const CompanyTimeline: React.FC<CompanyTimelineProps> = ({ data, title }) => {
  if (!data || data.length === 0) {
    return <p>No company timeline data available.</p>;
  }

  // Prepare data for the chart
  const chartData = data
    .map((item) => {
      const startDate = new Date(item.start_date);
      const endDate =
        item.end_date === "Present" ? new Date() : new Date(item.end_date); //Handle present

      const durationInMonths =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());
      return {
        company: item.company,
        start: startDate.getTime(), // Use timestamps for Recharts
        duration: durationInMonths,
      };
    })
    .sort((a, b) => a.start - b.start); // Sort by start date

  // Find the earliest and latest dates to set the XAxis domain
  const earliestDate = chartData[0].start;
  const latestDate = new Date().getTime();

  const tickFormatter = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <YAxis type="category" dataKey="company" width={150} />
          <XAxis
            type="number"
            domain={[earliestDate, latestDate]} // Set the domain
            tickFormatter={tickFormatter}
            // interval="preserveStartAndEnd" //Ensure first and last ticks are shown
          />
          <Tooltip
            labelFormatter={(value: number) =>
              new Date(value).toLocaleDateString()
            }
          />
          <Bar dataKey="duration" fill="#64B5F6" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompanyTimeline;
