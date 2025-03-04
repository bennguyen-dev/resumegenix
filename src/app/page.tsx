"use client";

import React, { useState } from "react";
import FileUpload from "@/components/ui/file-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { CVData } from "@/types/resume";
import SkillTimeline from "@/components/charts/SkillTimeline";
import SkillsMatrix from "@/components/charts/SkillsMatrix";
import ProjectBreakdown from "@/components/charts/ProjectBreakdown";
import SkillRadarChart from "@/components/charts/SkillRadarChart";
import TechnologyPieChart from "@/components/charts/TechnologyPieChart";
import { ExperienceTimeline } from "@/components/charts/grok/ExperienceTimeline";
import { SkillsDistribution } from "@/components/charts/grok/SkillsDistribution";
import { TechnicalSkillsBreakdown } from "@/components/charts/grok/TechnicalSkillsBreakdown";
import { TechnologyUsage } from "@/components/charts/grok/TechnologyUsage";
import { LanguageProficiency } from "@/components/charts/grok/LanguageProficiency";
import { SkillTypeRadar } from "@/components/charts/grok/SkillTypeRadar";

export default function ExtractTextPage() {
  const [data, setData] = useState<CVData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesUploaded = async (files: File[]) => {
    if (files.length === 0) return;

    setIsLoading(true);
    setError(null);
    setData([]);

    try {
      // Process each file
      const results = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/cv-analysis", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              `Failed to extract text from ${file.name}: ${data.error}`,
            );
          }

          console.log("data 😋", { data }, "");

          return await data;
        }),
      );

      setData(results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      console.error("Error extracting text:", err);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("data 😋", { data }, "");

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-center text-2xl font-bold">
        PDF and DOCX Text Extractor
      </h1>

      <div className="mx-auto max-w-3xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              acceptedFileTypes={{
                "application/pdf": [".pdf"],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                  [".docx"],
              }}
              onFilesUploaded={handleFilesUploaded}
            />

            {isLoading && (
              <div className="mt-4 flex items-center justify-center">
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                <span>Extracting text...</span>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {data.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Extracted Text</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.map((item, index) => {
                  const types = Object.keys(item.skills.technical).concat([
                    "soft",
                  ]);
                  return (
                    <div key={index}>
                      <h1>CV Review Charts</h1>
                      <ExperienceTimeline data={item.experience} />
                      <SkillsDistribution data={item} />
                      <TechnicalSkillsBreakdown data={item} />
                      <TechnologyUsage data={item} />
                      <LanguageProficiency data={item.languages} />
                      {/* Skill Timeline */}
                      <SkillTimeline
                        data={item.technology_timeline.frameworks}
                        title="Framework Usage Timeline"
                        dataKey="total_months"
                      />

                      <div className="space-y-4">
                        {types.map((type) => (
                          <SkillTypeRadar key={type} type={type} data={item} />
                        ))}
                      </div>

                      {/* Skills Matrix */}
                      <SkillsMatrix experienceData={item.experience} />

                      {/* Project Breakdown */}
                      <ProjectBreakdown projectData={item.projects} />

                      {/* Skill Radar Chart */}
                      <SkillRadarChart
                        data={item.skills.technical}
                        title="Skill Distribution"
                      />

                      {/* Technology Pie Chart */}
                      <TechnologyPieChart
                        data={item.skills.technical}
                        title="Technology Category Breakdown"
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
