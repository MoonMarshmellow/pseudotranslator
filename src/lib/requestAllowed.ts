import { firestore } from "@/firebase/firebase"
import { TempUser } from "@/types/tempuser"
import { Auth, User } from "firebase/auth"
import { collection, query, where, getDocs, doc, getDoc, updateDoc, setDoc } from "firebase/firestore"


import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

export const requestAllowed = async (user: User | null | undefined, ip: string | null, uuid: RequestCookie| undefined, deviceId: string ) => {
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
        // try{
        //     const value = uuid ? uuid.value : deviceId
        //     console.log('Checked cookie or device id')
        //     console.log('Value', value)
        //     if (value){
        //         const tempRef = doc(firestore, "temps", value)
        //         const tempDoc = await getDoc(tempRef)
        //         const data = tempDoc.data()
        //         if(!tempDoc.exists()){
        //             const data: TempUser = {
        //                 uuid: value,
        //                 ip: ip,
        //                 uses: 4
        //             }
        //             await setDoc(tempRef, JSON.parse(JSON.stringify(data)))
        //             console.log("Current device not found in db so created")
        //             return (value)
        //         }
        //         if (data?.uses == 0) {
        //             console.log('No more uses left')
        //             return false
        //         }
        //         if (data?.uses > 0) {
        //             const res = await updateDoc(tempRef, {uses: data?.uses - 1})
        //             console.log('updated uses')
        //             if(uuid){
        //                 return(true)
        //             }
        //             console.log(value)
        //             return(value)
        //         }
        //     }     
            
        // }catch(e) {
        //     console.log("nouser", e)
        // }
        return true
    }
}