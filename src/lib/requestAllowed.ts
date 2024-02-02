import "server-only"
import { TempUser } from "@/types/tempuser"
import { Auth, User } from "firebase/auth"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"


export const requestAllowed = async (user: User | null | undefined, ip: string, auth: Auth, uuid: RequestCookie| undefined, deviceId: string, db: any ) => {
    if (user){
        return true
        // try{
        //     console.log('User Found, Checking Subscription')
        //     const subscriptionsRef = collection(firestore, 'users', user.uid, 'subscriptions')
        //     console.log('Got Ref')
        //     const q = query(subscriptionsRef, where('status', '==', 'active'))
            
        //     const docs = await getDocs(q)
        //     console.log('Got Sub Docs')
        //     if(docs.docs.length > 0){
        //         console.log('subscribed')
        //         return true
        //     }else{
        //         const docRef = doc(firestore, "users", user.uid)
        //         const userDoc = await getDoc(docRef)
        //         const data = userDoc.data()
        //         if (data?.uses == 0) {
        //             return false
        //         }
        //         if (data?.uses > 0) {
        //             const res = await updateDoc(docRef, {uses: data?.uses - 1})
        //             return true
        //         }
    
        //     }


        // }
        // catch(e) {
        //     console.log("user",e)
        // }

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