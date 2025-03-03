import { NextRequest, NextResponse } from "next/server";
import { FileWithBuffer } from "@/services/file";

export async function POST(request: NextRequest) {
  try {
    // Since we're using the newer App Router, we need to handle the multipart form data
    const formData = await request.formData();

    // Get the file from the form data
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert the File to Buffer and create the structure expected by extractTextFromFile
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileWithBuffer: FileWithBuffer = {
      originalname: file.name,
      buffer: buffer,
      mimetype: file.type,
      size: file.size,
    };

    console.log("fileWithBuffer 😋", { fileWithBuffer }, "");

    // if (extractedText === null) {
    //   return NextResponse.json(
    //     { error: "Failed to extract text or unsupported file type" },
    //     { status: 422 },
    //   );
    // }

    // Return the extracted text
    // return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Server error processing file" },
      { status: 500 },
    );
  }
}

// Optional: Configure request size limits (adjust as needed)
export const config = {
  api: {
    // 10MB limit
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
