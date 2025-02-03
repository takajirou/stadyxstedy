import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "あなたは目標の具体性を判定するアシスタントです。ユーザーの入力が具体的な目標なら「はい」、そうでないなら「いいえ」とだけ答えてください。",
                },
                { role: "user", content: message },
            ],
            max_tokens: 2,
            temperature: 0,
        });

        return NextResponse.json({
            result: response.choices[0]?.message?.content || "",
        });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            {
                error: "OpenAI API Error",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
