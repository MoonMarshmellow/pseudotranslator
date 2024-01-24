import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { requestAllowed } from '@/lib/requestAllowed';
import { auth } from '@/firebase/firebase';
import { prompt } from './chatprompt';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
// export const runtime = 'edge';
 
export async function POST(req: NextRequest) {
  const request = await req.json();
  const messages = request.messages
  const user = request.user
  const ip = req.headers.get('X-Forwarded-For')
  const deviceId = request.deviceId
  const allowed = await requestAllowed(user, ip as string, auth, req.cookies.get('uuid'), deviceId)
  console.log(prompt)
  if (typeof allowed == 'string') {

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',     
      stream: true,
      messages,
    });  
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream, {headers: {'Set-Cookie': `uuid=${allowed}; Expires=Tue, 1 Jan 2036 00:00:01 GMT`}});
  } else if(allowed == true){
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',     
      stream: true,
      messages: [{"role": "system", "content": prompt}, ...messages]
    });
    console.log(messages)
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream)
  } else if( allowed == false){
    return NextResponse.json('Not Allowed')
  }
 

  
}