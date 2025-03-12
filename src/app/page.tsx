"use client";

import React, { useState } from "react";
import FileUpload from "@/components/ui/file-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CVData } from "@/types/resume";
import CompanyDurationChart from "@/components/charts/CompanyDurationChart";

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

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-center text-2xl font-bold">Resume Extractor</h1>

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
              loading={isLoading}
            />

            {error && (
              <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {data.length > 0 && (
          <>
            {/*<Card>*/}
            {/*  <CardHeader>*/}
            {/*    <CardTitle>Data JSON</CardTitle>*/}
            {/*  </CardHeader>*/}
            {/*  <CardContent>*/}
            {/*    <pre>*/}
            {/*      <code className="language-json">*/}
            {/*        {JSON.stringify(data, null, 2)}*/}
            {/*      </code>*/}
            {/*    </pre>*/}
            {/*  </CardContent>*/}
            {/*</Card>*/}
            {data.map((item) => (
              <React.Fragment key={item.personal_details.name}>
                <CompanyDurationChart experience={item.experience} />
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
