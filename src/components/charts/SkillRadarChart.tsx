import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import { Skills } from "@/types/resume";

interface SkillRadarChartProps {
  data: Skills["technical"];
  title: string;
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ data, title }) => {
  if (!data) {
    return <p>No skill radar data available.</p>;
  }

  // Prepare data for the radar chart
  const radarData = Object.keys(data).map((key) => ({
    skill: key,
    value: data?.[key as keyof typeof data]?.length, // Use the number of skills in each category as the value
  }));

  return (
    <div>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis
            angle={30}
            domain={[0, Math.max(...radarData.map((item) => item.value)) + 1]}
          />
          <Radar
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadarChart;
