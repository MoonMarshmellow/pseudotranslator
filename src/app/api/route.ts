import { NextResponse } from "next/server";
import OpenAI from "openai"
import { prompt } from "./prompt1";
import { Run } from "openai/resources/beta/threads/index.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

// const thread = await openai.beta.threads.create();

export async function POST(request: Request) {
    const message = await request.json()
    const response = await openai.chat.completions.create({
        messages:[{'role': 'system', 'content': prompt},
        {'role': 'user', 'content': `Translate the following ${message.languageFrom} code into ${message.languageTo}. Do not include anything except the code in your response: ${message.code}`}],
        model: 'gpt-3.5-turbo',
    });
    
    return Response.json(response.choices[0].message.content)


    // const messageAPI = await openai.beta.threads.messages.create(
    //     thread.id,
    //     {
    //       role: "user",
    //       content: `Translate the following ${message.languageFrom} code into ${message.languageTo}. Do not include anything except the code in your response: ${message.code}`
    //     }
    // );

    // const run = await openai.beta.threads.runs.create(
    //     thread.id,
    //     { 
    //       assistant_id: "asst_60wUz9QWUEOdJNlebXL3cKTC",

    //     }
    // );

    // const checkStatusAndPrintMessages = async (threadId: string, runId: string) => {
    //     let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    //     if(runStatus.status === "completed"){
    //         let messages = await openai.beta.threads.messages.list(threadId);
    //         const response = messages.data[0].content[0].text.value
    //         console.log(response)
    //         return Response.json(response)
    //     } else {
    //         console.log("Run is not completed yet.");
    //     }  
    // };

    // setTimeout(() => {
    //     checkStatusAndPrintMessages(thread.id, run.id)
    // }, 3000 );
    


    
    // const messages = await openai.beta.threads.messages.list(
    //     thread.id
    // );

    // console.log(messages)
    
    // return Response.json(messages)
}