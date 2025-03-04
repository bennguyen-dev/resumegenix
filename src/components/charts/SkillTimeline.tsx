"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Define the type for the data (you'll need to create this)
import { TechnologyTimeline } from "@/types/resume";

interface SkillTimelineProps {
  data: TechnologyTimeline[] | undefined;
  title: string;
  dataKey: string;
}

const SkillTimeline: React.FC<SkillTimelineProps> = ({ data, title }) => {
  if (!data) {
    return <p>No data available.</p>;
  }

  // Prepare data for Recharts:  Convert name and total_months to be chart friendly
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.total_months,
  }));

  return (
    <div>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillTimeline;
