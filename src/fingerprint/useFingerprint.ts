import { useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default function useFingerprint() {
    const [fingerprint, setFingerprint] = useState('')
    const checkFingerprint = async function () {       
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const { canvas, fonts, ...components } = result.components;
        const visitorId = FingerprintJS.hashComponents(components);
        setFingerprint(visitorId)
    }
    checkFingerprint()
    return fingerprint   
}