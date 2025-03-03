"use client";

import React, { useCallback, useState } from "react";
import { useDropzone, FileWithPath, Accept } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, FileText, Check } from "lucide-react";

// Extend FileWithPath to include preview URL
interface FileWithPreview extends FileWithPath {
  preview: string;
}

interface FileUploadProps {
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedFileTypes?: Accept;
  onFilesUploaded?: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  maxFiles,
  maxSize,
  acceptedFileTypes,
  onFilesUploaded,
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    // Add new files with preview URLs
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    ) as FileWithPreview[];

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const removeFile = (fileToRemove: FileWithPreview): void => {
    setFiles(files.filter((file) => file !== fileToRemove));
    // Release object URL to avoid memory leaks
    URL.revokeObjectURL(fileToRemove.preview);
  };

  const handleUpload = (): void => {
    if (onFilesUploaded) {
      onFilesUploaded(files);
    }
    console.log("Uploading files:", files);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      maxFiles,
      maxSize,
      accept: acceptedFileTypes,
    });

  return (
    <div className="mx-auto w-full max-w-md">
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"} ${isDragReject ? "border-red-500 bg-red-50" : ""} `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="h-10 w-10 text-gray-400" />
              <p className="text-sm text-gray-600">
                {isDragActive
                  ? "Drop files here"
                  : "Drag and drop files here, or click to select files"}
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Select Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Selected Files</h3>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(file)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            <Button className="flex items-center gap-2" onClick={handleUpload}>
              <Check className="h-4 w-4" />
              Upload Files
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
