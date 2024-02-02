
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/firebase/firebase';
import { prompt } from './chatprompt';
import { Auth, User } from 'firebase/auth';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { TempUser } from '@/types/tempuser';
import { initializeAdmin } from '@/firebase/firebaseAdmin';
import { getFirestore } from 'firebase-admin/firestore';
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';


 
export async function POST(req: NextRequest) {
  interface FirebaseAdminAppParams {
    projectId: string;
    clientEmail: string;
    storageBucket: string;
    privateKey: string;
  }
   
  async function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, "\n");
  }
   
  async function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
    const privateKey = await formatPrivateKey(params.privateKey);
   
    if (admin.apps.length > 0) {
      return admin.app();
    }
   
    const cert = admin.credential.cert({
      projectId: params.projectId,
      clientEmail: params.clientEmail,
      privateKey,
    });
   
    return initializeApp({
      credential: cert,
      projectId: params.projectId,
      storageBucket: params.storageBucket,
    });
  }
   
  async function initAdmin() {
    const params = {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
      privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
    };
   
    return await createFirebaseAdminApp(params);
  }
  initAdmin()
  const db = getFirestore()

  const request = await req.json();
  const messages = request.messages
  const user = request.user
  const ip = req.headers.get('X-Forwarded-For')
  const deviceId = request.deviceId
 
  const requestAllowed = async (user: User | null | undefined, ip: string, auth: Auth, uuid: RequestCookie| undefined, deviceId: string, db: any ) => {
    if (user){
        return true
    }
    else if(!user){
        try{
            const value = uuid ? uuid.value : deviceId
            console.log('Checked cookie or device id')
            console.log('Value', value)
            if (value){
                const tempRef = db.collection('temps').doc(value)
                const tempDoc = await tempRef.get()
                const data = tempDoc.data()
                if(!tempDoc.exists){
                    const data: TempUser = {
                        uuid: value,
                        ip: ip,
                        uses: 4
                    }
                    await tempRef.set(JSON.parse(JSON.stringify(data)))
                    console.log("Current device not found in db so created")
                    return (value)
                }
                if (data?.uses == 0) {
                    console.log('No more uses left')
                    return false
                }
                if (data?.uses > 0) {
                    await tempRef.update({uses: data?.uses - 1})
                    console.log('updated uses')
                    if(uuid){
                        return(true)
                    }
                    console.log(value)
                    return(value)
                }
            }     
            
        }catch(e) {
            console.log("nouser", e)
        }
    }
}
  const allowed = await requestAllowed(user, ip as string, auth, req.cookies.get('uuid'), deviceId, db)
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