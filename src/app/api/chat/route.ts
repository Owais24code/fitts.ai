import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this environment variable is set
});

// Model configurations
const MODELS = {
  "gpt-3.5-turbo": {
    temperature: 0.7,
    max_tokens: 500,
  },
  "gpt-4": {
    temperature: 0.7,
    max_tokens: 1000,
  },
  "gpt-4-turbo": {
    temperature: 0.7,
    max_tokens: 2000,
  },
} as const;

export const runtime = "edge"; // Use edge runtime for performance

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { messages, model = "gpt-3.5-turbo" } = await req.json();

    // Validate the model
    if (!Object.keys(MODELS).includes(model)) {
      return new Response(
        JSON.stringify({ error: "Invalid model selection" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // System message for role and guidelines
    const systemMessage = {
      role: "system",
      content: `You are a knowledgeable fashion advisor. Your expertise includes:
      - Current fashion trends
      - Brand recommendations
      - Style matching
      - Outfit coordination
      - Price ranges and budgeting

      When making recommendations:
      1. Always suggest specific brands and products
      2. Include price ranges
      3. Consider the user's style preferences
      4. Provide practical styling tips
      5. Focus on currently available items

      Keep responses concise but informative. Format prices in USD.`,
    };

    // Call OpenAI with streaming enabled
    const openaiResponse = await openai.chat.completions.create({
      model: model as keyof typeof MODELS,
      stream: true,
      messages: [systemMessage, ...messages],
      ...MODELS[model as keyof typeof MODELS],
    });

    // Create a readable stream
    const stream = new ReadableStream({
      async start(controller) {
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();

        for await (const chunk of openaiResponse) {
          const text = decoder.decode(
            new TextEncoder().encode(chunk.toString())
          );
          controller.enqueue(encoder.encode(text));
        }

        controller.close();
      },
      cancel() {
        console.log("Stream canceled");
      },
    });

    // Return the streaming response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in POST:", error);

    // Handle API or other errors
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
