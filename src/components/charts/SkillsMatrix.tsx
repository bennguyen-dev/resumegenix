import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the type for the data
import { Experience } from "@/types/resume";

interface SkillsMatrixProps {
  experienceData: Experience[] | undefined;
}

const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ experienceData }) => {
  if (!experienceData) {
    return <p>No experience data available.</p>;
  }

  // 1. Extract Unique Skills
  const allSkills = new Set<string>();
  experienceData.forEach((exp) => {
    if (exp.technologies_used) {
      exp.technologies_used.forEach((skill) => allSkills.add(skill));
    }
  });
  const skillsArray = Array.from(allSkills);

  return (
    <div>
      <h3>Skills Matrix</h3>
      <div className="w-full">
        <Table>
          <TableCaption>
            A comprehensive overview of the skills used across different
            experiences.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Company / Position</TableHead>
              {skillsArray.map((skill) => (
                <TableHead key={skill} className="text-right">
                  {skill}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {experienceData.map((exp) => (
              <TableRow key={exp.company}>
                <TableCell font-medium>
                  {exp.company} - {exp.position}
                </TableCell>
                {skillsArray.map((skill) => (
                  <TableCell
                    key={`${exp.company}-${skill}`}
                    className="text-right"
                  >
                    {exp.technologies_used &&
                    exp.technologies_used.includes(skill)
                      ? "Yes"
                      : "No"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SkillsMatrix;
