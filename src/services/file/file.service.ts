import * as pdfParse from "pdf-parse";
import { IFileWithBuffer, SupportedFileExtension } from "@/services/file";
import { extractRawText } from "mammoth";
import { IResponse } from "@/types/global";

class FileService {
  constructor() {}

  async extractTextFromFile(
    file: IFileWithBuffer,
  ): Promise<IResponse<string | null>> {
    try {
      if (!file || !file.originalName || !file.buffer) {
        return {
          status: 422,
          message: "Invalid file format",
          data: null,
        };
      }

      // Get file extension and validate it
      const extension = file.originalName
        .split(".")
        .pop()
        ?.toLowerCase() as SupportedFileExtension;

      switch (extension) {
        case "pdf":
          try {
            const pdfData = await pdfParse(file.buffer);
            return {
              status: 200,
              message: "PDF parsed successfully",
              data: pdfData.text,
            };
          } catch (error) {
            return {
              status: 500,
              message:
                error instanceof Error ? error.message : "Error parsing PDF",
              data: null,
            };
          }

        case "docx":
          try {
            const docxResult = await extractRawText({ buffer: file.buffer });
            return {
              status: 200,
              message: "Word document parsed successfully",
              data: docxResult.value,
            };
          } catch (error) {
            return {
              status: 500,
              message:
                error instanceof Error
                  ? error.message
                  : "Error parsing Word document",
              data: null,
            };
          }

        default:
          return {
            status: 422,
            message: "Unsupported file format",
            data: null,
          };
      }
    } catch (error) {
      return {
        status: 500,
        message: error instanceof Error ? error.message : "Error parsing file",
        data: null,
      };
    }
  }
}

export const fileService = new FileService();
