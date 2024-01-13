'use client'
import {useChat} from 'ai/react'
import { FaArrowUp } from "react-icons/fa";
import { ChatMessage } from './chat-message';
import ScrollToBottom from 'react-scroll-to-bottom';

export type message = {
    content: string,
    role: string,
}

export default function ChatApp() {

    const {messages, input, handleInputChange, handleSubmit} = useChat()
    return(
        <>
        <ScrollToBottom className="text-white font-sans border-green-400 border-0">
        {messages.map(m => (
        <ScrollToBottom key={m.id} className="text-white whitespace-pre-wrap">
          <ChatMessage message={m}/> 
        </ScrollToBottom>
      ))}
        <div className='flex justify-center'>
            <div className="bg-lightgray text-center rounded-t-md fixed bottom-0 p-1 lg:w-2/4 md:w-2/4 w-full ">
                <form onSubmit={handleSubmit} className="flex flex-row">
                <input onChange={handleInputChange} value={input} placeholder="Send a message" className="mr-2 h-10 transition-all shadow appearance-none  bg-lightgray border border-gray-400 rounded-md py-1 px-2 text-sm text-white leading-tight hover:bg-[#363636] focus:outline-none focus:border-white focus:shadow-outline w-full"></input>
                <button type="submit" className="p-1 rounded-md hover:bg-accent/70 bg-accent w-10 flex items-center justify-center">
                    <FaArrowUp/>
                </button>
                </form>
                <p className="text-xs mt-1 text-gray-300">Chat is currently in beta. Accurate responses are not guaranteed.</p>
            </div>
        </div>
        </ScrollToBottom>
        </>
    )
}