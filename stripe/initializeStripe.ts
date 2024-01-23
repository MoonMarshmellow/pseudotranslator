import {Stripe, loadStripe} from "@stripe/stripe-js"

let stripePromise: Stripe | null

const initializeStripe = async () => {
    if (!stripePromise){
        stripePromise = await loadStripe(
            "pk_live_51OTQfAACldyUprsCDgDwZ5KCbDTKaIHypyy851AL1wXJHTQZRM1bEpksEYNMTil5RnRuHgzGU26rH1ulVL8rqWT300vDLFfqR2"
        )
    }
    return stripePromise
}

export default initializeStripe