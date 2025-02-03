import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { message } = req.body;

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

        res.status(200).json({ result: response.choices[0]?.message?.content });
    } catch {
        res.status(500).json({ error: "Error fetching response from OpenAI" });
    }
}
