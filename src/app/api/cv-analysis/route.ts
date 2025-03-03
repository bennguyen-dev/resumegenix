import { NextResponse } from "next/server";
import { fileService, IFileWithBuffer } from "@/services/file";
import { openRouterService } from "@/services/open-router";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json(
      {
        status: 422,
        message: "No file uploaded",
        data: null,
      },
      { status: 422 },
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileWithBuffer: IFileWithBuffer = {
    originalName: file.name,
    buffer: buffer,
    mimetype: file.type,
    size: file.size,
  };

  const res = await fileService.extractTextFromFile(fileWithBuffer);

  if (res.data === null) {
    return NextResponse.json(res, { status: res.status });
  }

  const analyzedText = await openRouterService.analyze({
    text: res.data as string,
  });

  return NextResponse.json(analyzedText, { status: 200 });
}
