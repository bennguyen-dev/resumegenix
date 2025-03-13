"use client";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CVData } from "@/types/resume";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { formatYearMonth } from "@/lib/utils";

interface CompanyDurationChartProps {
  experience: CVData["experience"];
}

const CompanyDurationChart: React.FC<CompanyDurationChartProps> = ({
  experience,
}) => {
  const data = useMemo(() => {
    return experience.map((exp) => ({
      company: exp.company,
      duration: exp.duration_months ? exp.duration_months / 12 : 0,
      startDate: exp.start_date,
      endDate: exp.end_date,
    }));
  }, [experience]);

  const chartConfig = {
    duration: {
      label: "Duration (Years)",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Duration (Bar Chart)</CardTitle>
        <CardDescription>Experience at each company.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="company"
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

export default CompanyDurationChart;
