import { streamText } from "ai";
import { DEFAULT_MODEL, WEATHER_ASSISTANT_SYSTEM_PROMPT } from "@/lib/ai-config";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: DEFAULT_MODEL,
    system: WEATHER_ASSISTANT_SYSTEM_PROMPT,
    messages,
  });

  // Safely return data stream without TypeScript type mismatch
  return (result as any).toDataStreamResponse 
    ? (result as any).toDataStreamResponse()
    : new Response(result.textStream, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
}