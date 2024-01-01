import { firestore } from "@/firebase/firebase"
import getStripe from "./initializeStripe"
import { doc, onSnapshot, setDoc } from "firebase/firestore"
import {v4 as uuidv4} from "uuid"

export async function createCheckoutSession(uid: string) {
    const checkoutSessionRef = doc(firestore, `users/${uid}/checkout_sessions/`, uuidv4() )
    await setDoc(checkoutSessionRef, {
        price: "price_1OTRd1ACldyUprsCh1BWNa0X",
        success_url: window.location.origin,
        cancel_url: window.location.origin
    })

    onSnapshot(checkoutSessionRef, async doc => {
        const data = doc.data()
        const sessionId = data?.sessionId
        if(sessionId){
            const stripe = await getStripe()
            stripe?.redirectToCheckout({sessionId})
        }
    })
}
