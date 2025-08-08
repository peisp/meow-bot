import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "./MessageBubble"
import { Message } from "@/types/conversation"
import { Loader2, MessageSquare } from "lucide-react"

interface ChatMessagesProps {
  messages: Message[]
  isLoading?: boolean
}

export function ChatMessages({ messages, isLoading = false }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  return (
    <ScrollArea className="flex-1 h-full selection-boundary" ref={scrollAreaRef}>
      <div className="min-h-full">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-600">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-200/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-2xl font-medium mb-3 text-gray-800">开始新对话</h3>
              <p className="text-base text-gray-600 max-w-md">选择模型并输入你的问题，AI 助手将为你提供帮助。你可以在右侧调整对话参数以获得更好的体验。</p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3 p-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 max-w-[70%] shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      AI 正在思考中
                    </span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}
