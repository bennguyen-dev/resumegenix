"use client";

import { CVData } from "@/types/resume";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatYearMonth, generateColorFromString } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

type SkillCategoryChartProps = {
  category: string;
  projects: CVData["projects"];
};

const formatCategoryName = (category: string): string => {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const SkillCategoryChart: React.FC<SkillCategoryChartProps> = ({
  category,
  projects,
}) => {
  const { chartData, projectList } = useMemo(() => {
    const skillMap = new Map();
    const projectConfigs: any[] = [];

    projects.forEach((project) => {
      projectConfigs.push({
        name: project.name,
        color: generateColorFromString(project.name),
      });

      const skills =
        project.skills.technical[
          category as keyof typeof project.skills.technical
        ];

      if (Array.isArray(skills)) {
        skills.forEach((skill) => {
          if (!skillMap.has(skill)) {
            skillMap.set(skill, {
              name: skill,
              totalYears: 0,
              projects: [],
            });
          }

          const skillData = skillMap.get(skill);
          const years = project.duration_months
            ? project.duration_months / 12
            : 0;

          skillData.projects.push({
            project: project.name,
            years,
            description: project.description,
          });

          skillData.totalYears += years;
        });
      }
    });

    const skills = Array.from(skillMap.values()).sort(
      (a, b) => b.totalYears - a.totalYears,
    );

    const data = skills.map((skill) => {
      const item: any = { name: skill.name };

      skill.projects.forEach((proj: any) => {
        item[proj.project] = proj.years;
      });

      return item;
    });

    return {
      chartData: data,
      projectList: projectConfigs,
    };
  }, [category, projects]);

  const chartConfig = {} satisfies ChartConfig;

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{formatCategoryName(category)} (Bar Chart)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground text-sm">
              No data available for this category.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{formatCategoryName(category)} (Bar Chart)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              label={{
                value: "Years",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              formatter={(value, name) => [
                formatYearMonth(value as number),
                name,
              ]}
              labelFormatter={(label) => `Skill: ${label}`}
            />
            <Legend />

            {projectList.map((project, i) => (
              <Bar
                key={project.name}
                dataKey={project.name}
                name={project.name}
                stackId="a"
                fill={project.color || "#8884d8"}
                radius={i === 0 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SkillCategoryChart;
