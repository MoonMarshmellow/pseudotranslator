'use client'
import {useChat} from 'ai/react'
import { FaArrowUp } from "react-icons/fa";
import { ChatMessage } from './chat-message';
import ScrollToBottom, {useScrollToBottom} from 'react-scroll-to-bottom';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import useFingerprint from '@/fingerprint/useFingerprint';
import NoUsesModalHandler from './nousesmodalhandler';
import NoMessages from './nomessages';

export type message = {
    id: string
    content: string,
    role: string,
}

export default function ChatApp() {
    const [test, setTest] = useState<message[]>([{id: 'gay', role: 'user', content: 'cock'}])
    const [user] = useAuthState(auth)
    const [noUses, setNoUses] = useState(false);
    const fingerprint = useFingerprint()
    const {messages, input, handleInputChange, handleSubmit, data} = useChat({body: {user: user, deviceId: fingerprint} })
    const bottomEl = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {     
        bottomEl?.current?.scrollIntoView();
    };

    useEffect(()=> {
        scrollToBottom()
    }, [messages])

    useEffect(()=> {
        if (messages[messages.length-1]?.content == '"Not Allowed"'){
            setNoUses(true)
        }
    }, [messages])
    return(
        
        <div className="text-white font-sans border-green-400 border-0">
            {(messages.length !== 0) ? <div className='flex flex-col items-center'>
                {messages.map(m => (
                <div key={m.id} className="text-white whitespace-pre-wrap w-3/4">
                    {/* <ChatMessage message={m}/>  */}
                    <ChatMessage user={user} message={m}/>
                </div>
                ))}
                <div className='h-[80px]' ref={bottomEl}></div>
            </div> :
            <NoMessages/>
            }
         
            <div className='flex justify-center'>
                <div className='fixed bottom-0 bg-gradient-to-t from-bg w-full h-[110px] '></div>
                <div className="bg-lightgray text-center rounded-t-md fixed bottom-0 p-1 lg:w-2/4 md:w-2/4 sm:w-2/4 w-full ">
                    <form onSubmit={handleSubmit} className="flex flex-row">
                    <input onChange={handleInputChange} value={input} placeholder="Send a message" className="mr-2 h-10 transition-all shadow appearance-none  bg-lightgray border border-gray-400 rounded-md py-1 px-2 text-sm text-white leading-tight hover:bg-[#363636] focus:outline-none focus:border-white focus:shadow-outline w-full"></input>
                    <button type="submit" className="p-1 rounded-md hover:bg-accent/70 bg-accent w-10 flex items-center justify-center">
                        <FaArrowUp/>
                    </button>
                    </form>
                    <p className="text-xs mt-1 text-gray-300">Chat is currently in beta. Accurate responses are not guaranteed.</p>
                {/* <button className='bg-white' onClick={logFP}>Ass</button> */}
                </div>
            </div>
            <NoUsesModalHandler open={noUses} setOpen={setNoUses} />
        </div>
    )
}

