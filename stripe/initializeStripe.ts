import {Stripe, loadStripe} from "@stripe/stripe-js"

let stripePromise: Stripe | null

const initializeStripe = async () => {
    if (!stripePromise){
        stripePromise = await loadStripe(
            "pk_test_51OTQfAACldyUprsCkVaypNVDqH3ZL9StKwgH0EGAGnPLGwEmMWvfTera3oH05yLutECtBlSehk7cAZHW22Shme1300KY81unI8"
        )
    }
    return stripePromise
}

export default initializeStripe