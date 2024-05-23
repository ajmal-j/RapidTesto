import { GenerateUsecase } from "@/server/usecase";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await GenerateUsecase.generateWords.execute({
    prompt: body.prompt,
    words: body.words,
  });
  return Response.json(response);
}
