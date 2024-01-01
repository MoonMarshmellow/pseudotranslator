import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import isUserPremium from "./isUserPremium";

export default function usePremiumStatus(user: User | null | undefined){
    const [premiumStatus, setPremiumStatus] = useState(false)

    useEffect(() => {
        const checkPremiumStatus = async function () {
            setPremiumStatus(await isUserPremium())
        }
        checkPremiumStatus()
    }, [user])

    return premiumStatus
}