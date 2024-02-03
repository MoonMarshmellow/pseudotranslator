import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai"
import { prompt } from "./prompt1";
import { Run } from "openai/resources/beta/threads/index.mjs";
import { Auth, User, getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { TempUser } from "@/types/tempuser";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from 'uuid';
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { requestAllowed } from "@/lib/requestAllowed";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'


export async function POST(request: NextRequest) {

    const message = await request.json()

    const user = message.user




    const ip = request.headers.get('X-Forwarded-For')
    const deviceId = message.deviceId
    const allowed = await requestAllowed(user, ip as string, auth, request.cookies.get('uuid'), deviceId)



    if (typeof allowed == 'string') {
        // const response = NextResponse.json("Allowed")
        const response = await openai.chat.completions.create({
            messages:[{'role': 'system', 'content': prompt},
            {'role': 'user', 'content': `Translate the following ${message.languageFrom} code into ${message.languageTo}. Do not include anything except the code in your response: ${message.code}`}],
            model: 'gpt-3.5-turbo',
        });
        const res = NextResponse.json(response.choices[0].message.content)
        res.cookies.set({name: 'uuid', value: allowed as string, expires: 20825436070000})
        return res
    } else if(allowed == true){
        const response = await openai.chat.completions.create({
            messages:[{'role': 'system', 'content': prompt},
            {'role': 'user', 'content': `Translate the following ${message.languageFrom} code into ${message.languageTo}. Do not include anything except the code in your response: ${message.code}`}],
            model: 'gpt-3.5-turbo',
        });
        const res = NextResponse.json(response.choices[0].message.content)
        return res
    } else if( allowed == false){
        return NextResponse.json('Not Allowed')
    }

    
    
    
}