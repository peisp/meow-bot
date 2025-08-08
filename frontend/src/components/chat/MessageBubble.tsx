import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Message } from "@/types/conversation"
import { Bot, User } from "lucide-react"

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={cn("flex gap-3 p-6 selection-boundary relative", isUser ? "flex-row-reverse" : "flex-row")}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className={cn(
          "text-xs border-2",
          isUser 
            ? "bg-blue-500 text-white border-blue-300" 
            : "bg-gray-100 text-gray-600 border-gray-300"
        )}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "max-w-[75%] rounded-2xl px-4 py-3 break-words",
        isUser 
          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25" 
          : "bg-white/80 backdrop-blur-sm text-gray-800 border border-gray-200/60 shadow-lg shadow-gray-900/5"
      )}>
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-normal selectable">
          {message.content}
        </p>
        <span className={cn(
          "text-xs mt-2 block font-medium",
          isUser ? "text-blue-100/80" : "text-gray-500"
        )}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  )
}
