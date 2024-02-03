import 'server-only'
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { customInitApp } from "../../../../firebase/firebaseAdmin";
import { auth, firestore } from '@/firebase/firebase';
import { prompt } from './chatprompt';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { TempUser } from '@/types/tempuser';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
// export const runtime = 'edge';


export async function POST(req: NextRequest) {
  // var admin = require("firebase-admin");
  
  // var serviceAccount = require("../../../../firebase/pseudotranslator-47755-firebase-adminsdk-2vhqy-beb1eb6575.json");
  
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount)
  // });
  const request = await req.json();
  const messages = request.messages
  const user = request.user
  const ip = req.headers.get('X-Forwarded-For')
  const deviceId = request.deviceId
  const uuid = req.cookies.get('uuid')
  var allowed = true
 
  // if (user){
  //   allowed = true
  // }
  // else if(!user){
  //     try{
  //         const value = uuid ? uuid.value : deviceId
  //         console.log('Checked cookie or device id')
  //         console.log('Value', value)
  //         if (value){
  //             const tempRef = doc(firestore, "temps", value)
  //             const tempDoc = await getDoc(tempRef)
  //             const data = tempDoc.data()
  //             if(!tempDoc.exists()){
  //                 const data: TempUser = {
  //                     uuid: value,
  //                     ip: ip,
  //                     uses: 4
  //                 }
  //                 await setDoc(tempRef, JSON.parse(JSON.stringify(data)))
  //                 console.log("Current device not found in db so created")
  //                 allowed = value
  //             }
  //             if (data?.uses == 0) {
  //                 console.log('No more uses left')
  //                 allowed = false
  //             }
  //             if (data?.uses > 0) {
  //                 const res = await updateDoc(tempRef, {uses: data?.uses - 1})
  //                 console.log('updated uses')
  //                 if(uuid){
  //                     allowed = true
  //                 }
  //                 console.log(value)
  //                 allowed = value
  //             }
  //         }     
          
  //     }catch(e) {
  //         console.log("nouser", e)
  //     }
  // }
  
  
  
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
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream)
  } else if( allowed == false){
    return NextResponse.json('Not Allowed')
  }
 

  
}