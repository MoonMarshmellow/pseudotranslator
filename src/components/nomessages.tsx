import Image from "next/image";
import wave from "../app/hand-wave.png"
import { FaArrowDown } from "react-icons/fa";

export default function NoMessages() {
    return (
        <>
        <div className="w-full mt-5 font-sans flex flex-col h-[200px] justify-center items-center">
            <div className="w-1/3 flex flex-col justify-center items-center text-center">
            <div className="flex items-center mb-2">
                <Image alt="Hand wave emoji" width={30} height={30} src={wave}/>
                <p className="text-2xl ml-2 font-semibold [text-shadow:0px_10px_50px_#ffffff]">Welcome to Chat!</p>
            </div>
            <div className="text-gray-300 mb-2">
                <p>Chat understands the syntax of IB Pseudocode to help with your assignments!</p>
            </div>
            <div className="mb-3">
                Send a message to begin!
            </div>
            <FaArrowDown className="text-[#a560ff] text-xl animate-bounce"/>
            </div>
        </div>
        </>
    )
}