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

import { Projects } from "@/types/resume";

interface ProjectBreakdownProps {
  projectData: Projects[] | undefined;
}

const ProjectBreakdown: React.FC<ProjectBreakdownProps> = ({ projectData }) => {
  if (!projectData) {
    return <p>No project data available.</p>;
  }

  // Count projects by framework
  const frameworkCounts: { [key: string]: number } = {};
  projectData.forEach((project) => {
    if (project.frameworks_used) {
      project.frameworks_used.forEach((framework) => {
        frameworkCounts[framework] = (frameworkCounts[framework] || 0) + 1;
      });
    }
  });

  const frameworkData = Object.entries(frameworkCounts).map(
    ([name, count]) => ({ name, count }),
  );

  return (
    <div>
      <h3>Project Breakdown by Framework</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={frameworkData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectBreakdown;
