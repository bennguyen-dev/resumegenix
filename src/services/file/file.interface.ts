// Define supported file types
export type SupportedFileExtension = "pdf" | "docx";

// Define the file interface matching Express.Multer.File structure
export interface FileWithBuffer {
  originalname: string;
  buffer: Buffer;
  size?: number;
  mimetype?: string;
  encoding?: string;
  fieldname?: string;
  [key: string]: any; // For any additional properties
}
