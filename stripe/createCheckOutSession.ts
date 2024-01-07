import { firestore } from "@/firebase/firebase"
import getStripe from "./initializeStripe"
import { doc, onSnapshot, setDoc } from "firebase/firestore"
import {v4 as uuidv4} from "uuid"
import { Auth } from "firebase/auth"
import {Functions, getFunctions, httpsCallable} from "firebase/functions"

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
export const getPortalUrl = async (auth: Auth, functions: Functions): Promise<string> => {
    const user = auth.currentUser;
  
    let dataWithUrl: any;
    try {
      const functionRef = httpsCallable(
        functions,
        "ext-firestore-stripe-payments-createPortalLink"
      );
      const { data } = await functionRef({
        customerId: user?.uid,
        returnUrl: window.location.origin,
      });
  
      // Add a type to the data
      dataWithUrl = data as { url: string };
      console.log("Reroute to Stripe portal: ", dataWithUrl.url);
    } catch (error) {
      console.error(error);
    }
  
    return new Promise<string>((resolve, reject) => {
      if (dataWithUrl.url) {
        resolve(dataWithUrl.url);
      } else {
        reject(new Error("No url returned"));
      }
    });
  };