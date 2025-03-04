import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CVData } from "@/types/resume";

const getRadarData = (type: string, data: CVData) => {
  const skillList =
    type === "soft"
      ? data.skills.soft
      : data.skills?.technical?.[type as keyof typeof data.skills.technical];
  const timelineKey = type === "soft" ? "soft_skills" : type;
  const timelineEntries =
    data.technology_timeline[
      timelineKey as keyof typeof data.technology_timeline
    ];

  const skillMonthsMap: any = {};
  timelineEntries?.forEach((entry: any) => {
    skillMonthsMap[entry.name] =
      entry.total_months || entry.duration_months || 0;
  });

  return skillList.map((skill: string) => ({
    subject: skill,
    value: skillMonthsMap[skill as string] || 0,
  }));
};

export function SkillTypeRadar({ type, data }: { type: string; data: any }) {
  const radarData = getRadarData(type, data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, " ")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" textAnchor="end" />
            <PolarRadiusAxis />
            <Radar
              name="Experience (months)"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
