export type SupportedFileExtension = "pdf" | "docx";

export interface IFileWithBuffer {
  originalName: string;
  buffer: Buffer;
  size?: number;
  mimetype?: string;
  encoding?: string;
  fieldName?: string;
  [key: string]: any; // For any additional properties
}
