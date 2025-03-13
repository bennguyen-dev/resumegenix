"use client";

import React, { useMemo } from "react";
import { CVData } from "@/types/resume";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SkillDurationRadarChartProps {
  projects: CVData["projects"];
}

const ProjectDurationChart: React.FC<SkillDurationRadarChartProps> = ({
  projects,
}) => {
  const data = useMemo(() => {
    return projects.map((project) => ({
      project: project.name,
      duration: project.duration_months ? project.duration_months / 12 : 0,
    }));
  }, [projects]);

  const formatYearMonth = (value: number) => {
    const years = Math.floor(value);
    const months = Math.round((value - years) * 12);
    return `${years} year${years !== 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`;
  };

  const chartConfig = {
    duration: {
      label: "Duration (Years)",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Duration (Bar Chart)</CardTitle>
        <CardDescription>Duration of each project.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="project"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              label={{ value: "Years", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              formatter={(value) => [
                formatYearMonth(value as number),
                "Duration",
              ]}
            />
            <Legend />
            <Bar
              dataKey="duration"
              fill="var(--color-duration)"
              radius={[4, 4, 0, 0]}
              width={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProjectDurationChart;
