import { useAuthState } from "react-firebase-hooks/auth"
import { requestClientAllowed } from "./requestClientAllowed"
import { auth } from "@/firebase/firebase"
import useFingerprint from "@/fingerprint/useFingerprint"
import { useState } from "react"

export default function useClientRequest() {
    const [user] = useAuthState(auth)
    const fingerprint = useFingerprint()
    const checkAllowed = async function (){
        const value = await requestClientAllowed(user, auth, fingerprint)
        return value
    }
    return {checkAllowed}
}