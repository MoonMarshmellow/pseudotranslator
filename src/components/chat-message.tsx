import { Message } from 'ai'
import remarkGfm from 'remark-gfm'

import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { User } from 'firebase/auth'
import { FaUserCircle } from 'react-icons/fa'
import Image from 'next/image'
import logo from "../app/logo.png"

export interface ChatMessageProps {
  message: Message
  user: User | null | undefined
}

export function ChatMessage({ message, user, ...props }: ChatMessageProps) {

  return (
    <div
      className={cn('mb-4 flex items-start')}
      {...props}
    >
      {message.role == 'user' ?
      <div className=''>
        {user?.photoURL ? <img src={user.photoURL} className='rounded-full w-5 mt-3 mr-2'/> : (
          <FaUserCircle className="text-[20px] mt-3 mr-2" />
        )}
      </div>
      : 
      <div className=''>
        <Image src={logo} alt='logo' height={20} width={20} className='mt-3 mr-2'/>
      </div>
      
    }
      
      <div className="flex-1 px-1 ml-0 space-y-2 overflow-hidden">
    
        <MemoizedReactMarkdown
          className="prose pt-2 break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 border-t-[1px] border-lightgray"

          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, className, children, ...props }) {
              
              const match = /language-(\w+)/.exec(className || '')


              return match ? (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                    {children}
                  </code>
              )
            }
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        
      
      </div>
    </div>
  )
}