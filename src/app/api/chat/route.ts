import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODELS = {
  "gpt-3.5-turbo-0125": {
    temperature: 0.7,
    max_tokens: 1024,
  },
  "gpt-3.5-turbo-16k": {
    temperature: 0.7,
    max_tokens: 2048,
  },
} as const;

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, model = "gpt-3.5-turbo-0125" } = await req.json();

    if (!Object.keys(MODELS).includes(model)) {
      return new Response(
        JSON.stringify({ error: "Invalid model selection" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await openai.chat.completions.create({
            model: model,
            messages: [
              {
                role: "system",
                content: `You are a knowledgeable fashion advisor. Your expertise includes:
                  - Current fashion trends
                  - Brand recommendations
                  - Style matching
                  - Outfit coordination
                  - Price ranges and budgeting`,
              },
              ...messages,
            ],
            ...MODELS[model as keyof typeof MODELS],
            stream: true,
          });

          const encoder = new TextEncoder();

          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content || "";
            controller.enqueue(encoder.encode(text));
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in POST:", error);
    return new Response(
      JSON.stringify({
        error: (error as Error).message || "An error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
