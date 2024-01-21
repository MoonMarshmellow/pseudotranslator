'use client'

import Confetti from 'react-confetti';
import success_emoji from "../../success_emoji.png"
import Image from "next/image";
import Link from 'next/link';

export default function Success() {

    return(
        <>
        <Confetti className="relative z-50" recycle={false} numberOfPieces={500} tweenDuration={7000} width={window.innerWidth} height={window.innerHeight}/>
        <div className="w-full mt-5 font-sans flex flex-col h-[200px] justify-center items-center">
            <div className="w-2/5 flex flex-col justify-center items-center text-center text-white">
            <div className="flex items-center mb-2">
                <Image alt="Hand wave emoji" width={30} height={30} src={success_emoji}/>
                <p className="text-2xl bg-gradient-to-r from-[#6adeff] to-[#d619fc] bg-clip-text text-transparent ml-2 mr-2 font-bold [text-shadow:0px_10px_50px_#a560ff]">Thank you for subscribing!</p>
                <Image alt="Hand wave emoji" width={30} height={30} src={success_emoji}/>
            </div>
            <div className="text-gray-300 mb-2">
                <p>Your subscription has been processed and you now have unlimited access to ibpseudo.com</p>
            </div>
            <div className="mb-3">
                Your contribution means a lot!
            </div>
            <Link href="/" className="transition-all flex flex-row items-center bg-gradient-to-r from-[#a560ff] to-[#e008fc] text-md pt-1 pb-1 pl-2 pr-2 hover:scale-105 text-white rounded-md font-semibold hover:shadow-custom">Return Home</Link>
            </div>
        </div>
        </>

    )
}