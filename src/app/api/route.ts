import { NextResponse } from "next/server";
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

export async function POST(request: Request) {
    const message = await request.json()
    const response = await openai.chat.completions.create({
        messages:[{'role': 'system', 'content': 'You are a helpful assistant.'}, {'role': 'user', 'content': message}],
        model: 'gpt-3.5-turbo',
    });

    return Response.json(response.choices[0].message.content)

}