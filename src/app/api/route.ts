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
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'


export async function POST(request: NextRequest) {

    // const test  = await getDocs(collection(firestore, 'users'))

    // test.forEach(doc => {
    //     console.log(doc.id)
    // })

    const requestAllowed = async (user: User | null | undefined, ip: string, auth: Auth, uuid: RequestCookie| undefined, deviceId: string ) => {

        if (user){
            try{
                const subscriptionsRef = collection(firestore, 'users', user.uid, 'subscriptions')
                const q = query(subscriptionsRef, where('status', '==', 'active'))
                const docs = await getDocs(q)
                if(docs.docs.length > 0){
                    console.log('subscribed')
                    return true
                }else{
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
            }
            catch(e) {
                console.log("user",e)
            }

        }
        else if(!user){
            try{
                const value = uuid ? uuid.value : deviceId
                console.log('Checked cookie or device id')
                console.log('Value', value)
                if (value){
                    const tempRef = doc(firestore, "temps", value)
                    const tempDoc = await getDoc(tempRef)
                    const data = tempDoc.data()
                    if(!tempDoc.exists()){
                        const data: TempUser = {
                            uuid: value,
                            ip: ip,
                            uses: 19
                        }
                        await setDoc(tempRef, JSON.parse(JSON.stringify(data)))
                        console.log("Current device not found in db so created")
                        return (value)
                    }
                    if (data?.uses == 0) {
                        console.log('No more uses left')
                        return false
                    }
                    if (data?.uses > 0) {
                        const res = await updateDoc(tempRef, {uses: data?.uses - 1})
                        console.log('updated uses')
                        if(uuid){
                            return(true)
                        }
                        return(value)
                    }
                }     
                
            }catch(e) {
                console.log("nouser", e)
            }
        }
    }

    const message = await request.json()

    const user = message.user




    const ip = request.headers.get('X-Forwarded-For')
    const deviceId = message.deviceId
    const allowed = await requestAllowed(user, ip as string, auth, request.cookies.get('uuid'), deviceId)



    if (typeof allowed == 'string') {
        const response = NextResponse.json("Allowed")
        response.cookies.set({name: 'uuid', value: allowed as string, expires: 20825436070000})
        return response
    } else if(allowed == true){
        return NextResponse.json('Allowed')
    } else if( allowed == false){
        return NextResponse.json('Not Allowed')
    }

    
    
    // const response = await openai.chat.completions.create({
    //     messages:[{'role': 'system', 'content': prompt},
    //     {'role': 'user', 'content': `Translate the following ${message.languageFrom} code into ${message.languageTo}. Do not include anything except the code in your response: ${message.code}`}],
    //     model: 'gpt-3.5-turbo',
    // });
    // console.log(response.usage)
    // return Response.json(response.choices[0].message.content)
    
}