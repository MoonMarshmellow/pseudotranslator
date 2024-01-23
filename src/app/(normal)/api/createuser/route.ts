import { firestore } from "@/firebase/firebase";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export const runtime = 'edge'

export async function POST(request: NextRequest){
    const message = await request.json()

    const userMsg = message
    
    const ip = request.headers.get('X-Forwarded-For')

    const user = {
        ...userMsg,
        uses: 19,
        ip: ip
    }


    const addUser= async (user: User | null | undefined) => {
        try {
            if(user){
                const userRef = doc(firestore, "users", user.uid)
                await setDoc(userRef, JSON.parse(JSON.stringify(user)))
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    if (await addUser(user)) {
        return Response.json('Added User to DB')
    }else{
        return Response.json('Failed to add user to DB')
    }

}