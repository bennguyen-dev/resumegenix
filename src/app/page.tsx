"use client";

import React, { useState } from "react";
import FileUpload from "@/components/ui/file-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";

export default function ExtractTextPage() {
  const [extractedTexts, setExtractedTexts] = useState<
    { fileName: string; text: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesUploaded = async (files: File[]) => {
    if (files.length === 0) return;

    setIsLoading(true);
    setError(null);
    setExtractedTexts([]);

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

          return {
            fileName: file.name,
            text: data.text || "No text extracted",
          };
        }),
      );

      setExtractedTexts(results);
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
              maxFiles={5}
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

        {extractedTexts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Extracted Text</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {extractedTexts.map((item, index) => (
                  <div key={index} className="rounded-md border">
                    <div className="border-b bg-gray-50 p-3 font-medium">
                      {item.fileName}
                    </div>
                    <div className="max-h-80 overflow-y-auto p-4 text-sm whitespace-pre-wrap">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
