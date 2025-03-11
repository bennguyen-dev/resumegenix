"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useDropzone, FileWithPath, Accept } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, FileText, Check, File, Loader } from "lucide-react";

// Extend FileWithPath to include preview URL
interface FileWithPreview extends FileWithPath {
  preview: string;
}

interface FileUploadProps {
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedFileTypes?: Accept;
  onFilesUploaded?: (files: File[]) => void;
  loading?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  maxFiles = 1, // Default to 1 file
  maxSize,
  acceptedFileTypes = {
    "application/pdf": [".pdf"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  },
  onFilesUploaded,
  loading,
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  // Clean up object URLs on component unmount
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Release existing preview URLs to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));

      // When maxFiles is 1, replace existing files instead of adding
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ) as FileWithPreview[];

      // If maxFiles is 1, replace files; otherwise add to existing files
      if (maxFiles === 1) {
        setFiles(newFiles.slice(0, 1)); // Only take the first file
        if (newFiles[0]?.type === "application/pdf") {
          setPreviewOpen(true); // Auto-open preview only for PDFs
        }
      } else {
        setFiles((prev) => [...prev, ...newFiles].slice(0, maxFiles));
      }
    },
    [files, maxFiles],
  );

  const removeFile = (fileToRemove: FileWithPreview): void => {
    setFiles(files.filter((file) => file !== fileToRemove));
    // Release object URL to avoid memory leaks
    URL.revokeObjectURL(fileToRemove.preview);
    setPreviewOpen(false);
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

  // Helper function to get appropriate icon and label based on file type
  const getFileTypeInfo = (file: File) => {
    const type = file.type;

    if (type === "application/pdf") {
      return {
        icon: <FileText className="h-5 w-5 text-red-500" />,
        label: "PDF Document",
      };
    }

    if (
      type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return {
        icon: <FileText className="h-5 w-5 text-blue-600" />,
        label: "Word Document",
      };
    }

    return {
      icon: <File className="h-5 w-5 text-gray-500" />,
      label: "Document",
    };
  };

  // Function to render file preview based on type
  const renderFilePreview = (file: FileWithPreview) => {
    const type = file.type;

    if (type === "application/pdf") {
      return (
        <div className="h-96 w-full bg-gray-100">
          <iframe
            src={file.preview}
            className="h-full w-full"
            title={file.name}
          >
            This browser does not support PDFs. Please download the PDF to view
            it.
          </iframe>
        </div>
      );
    }

    // For DOCX files, we can't preview directly in the browser
    return (
      <div className="flex w-full flex-col items-center justify-center bg-gray-100 p-8">
        <FileText className="mb-2 h-16 w-16 text-blue-600" />
        <p className="mt-4 text-sm font-medium">Word Document</p>
        <p className="text-xs text-gray-500">
          Preview not available for Word documents
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => window.open(file.preview, "_blank")}
        >
          Download to View
        </Button>
      </div>
    );
  };

  // Get file extension from name
  const getFileExtension = (filename: string) => {
    return filename
      .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
      .toLowerCase();
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {files.length === 0 && (
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div
              {...getRootProps()}
              className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              } ${isDragReject ? "border-red-500 bg-red-50" : ""} `}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-10 w-10 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? "Drop document here"
                    : `Drag and drop a document here, or click to select`}
                </p>
                <p className="text-xs text-gray-500">
                  Accepted file types: PDF, DOCX
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Select Document
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {files.length > 0 && (
        <div className="space-y-4">
          {/* File Preview */}
          {previewOpen &&
            files.map((file, index) => (
              <Card key={`preview-${index}`} className="overflow-hidden">
                <div className="relative">
                  {renderFilePreview(file)}
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-white opacity-80 hover:opacity-100"
                    onClick={() => setPreviewOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}

          {/* File Info */}
          {files.map((file, index) => {
            const { icon } = getFileTypeInfo(file);
            const extension = getFileExtension(file.name);

            return (
              <div
                key={`info-${index}`}
                className="overflow-hidden rounded-md border"
              >
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-2">
                    {icon}
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600 uppercase">
                          {extension}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {file.type === "application/pdf" && !previewOpen && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewOpen(true)}
                      >
                        Preview
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Upload Button */}
          <div className="mt-4 flex justify-end">
            <Button className="flex items-center gap-2" onClick={handleUpload}>
              {loading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              Upload Document
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
