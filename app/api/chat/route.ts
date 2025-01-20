import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    data: { model },
  } = await req.json();

  const result = await streamText({
    model: openai(model || "gpt-3.5-turbo"),
    messages,
  });

  return result.toDataStreamResponse(); //클라이언트에서 데이터를 받아오는 실시간 객체 변환 응답
}
