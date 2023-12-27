import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai"
import { prompt } from "./prompt1";
import { Run } from "openai/resources/beta/threads/index.mjs";
import { Auth, User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { TempUser } from "@/types/tempuser";
import { useAuthState } from "react-firebase-hooks/auth";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'


export async function POST(request: NextRequest) {


    const requestAllowed = async (user: User | null | undefined, ip: string, auth: Auth ) => {
        if (user){
            try{
                const docRef = doc(firestore, "users", user.uid)
                const userDoc = await getDoc(docRef)
                const data = userDoc.data()
                if (data?.uses == 0) {
                    return false
                }
                if (data?.uses > 0) {
                    const res = await updateDoc(docRef, {uses: data?.uses - 1})
                    return true
                }
            }
            catch(e) {
                console.log("user",e)
            }

        }
        else if(!user){
            try{
                const ipRef = doc(firestore, "temps", ip)
                const ipDoc = await getDoc(ipRef)
                if(ipDoc.exists()){
                    const data = ipDoc.data()
                    console.log(data.uses)
                    if (data?.uses == 0) {
                        return false
                    }
                    if (data?.uses > 0) {
                        const res = await updateDoc(ipRef, {uses: data?.uses - 1})
                        return true
                    }
                }
                else {
                    const data: TempUser = {
                        ip: ip,
                        uses: 19
                    }
                    
                    console.log(ip)
                    const newIpRef= doc(firestore, "temps", ip)
                    await setDoc(newIpRef, JSON.parse(JSON.stringify(data)))
                    console.log("not gay")
                    // const gayRef = doc(firestore, "gay", "cock");
                    // await setDoc(gayRef, JSON.parse(JSON.stringify({ ass: "nice" })));
                    return true
                }
                    
                
            }
            catch(e) {
                console.log("nouser", e)
            }
        }
    }
    const message = await request.json()

    const user = message.user

    const ip = request.headers.get('X-Forwarded-For')
    const allowed = await requestAllowed(user, ip as string, auth)

    

    if (allowed) {
        return Response.json('Allowed')
    } else {
        return Response.json('Not Allowed')
    }
    
    
    // const response = await openai.chat.completions.create({
    //     messages:[{'role': 'system', 'content': prompt},
    //     {'role': 'user', 'content': `Translate the following ${message.languageFrom} code into ${message.languageTo}. Do not include anything except the code in your response: ${message.code}`}],
    //     model: 'gpt-3.5-turbo',
    // });
    // console.log(response.usage)
    // return Response.json(response.choices[0].message.content)
    
}