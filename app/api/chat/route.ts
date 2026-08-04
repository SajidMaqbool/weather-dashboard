import { streamText } from "ai";
import { DEFAULT_MODEL, WEATHER_ASSISTANT_SYSTEM_PROMPT } from "@/lib/ai-config";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: DEFAULT_MODEL,
      system: WEATHER_ASSISTANT_SYSTEM_PROMPT,
      messages,
    });

    return (result as any).toDataStreamResponse 
      ? (result as any).toDataStreamResponse()
      : new Response((result as any).textStream, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}