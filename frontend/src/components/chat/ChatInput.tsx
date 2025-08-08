import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading?: boolean
  placeholder?: string
}

export function ChatInput({ 
  onSendMessage, 
  isLoading = false, 
  placeholder = "输入你的消息... (按 Enter 发送，Shift+Enter 换行)" 
}: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="border-t border-gray-200/60 bg-input-area backdrop-blur-xl p-4 selection-boundary relative">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full bg-white/80 border-gray-200/60 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg shadow-sm transition-all duration-200"
          />
        </div>
        <Button 
          type="submit" 
          size="icon"
          disabled={!message.trim() || isLoading}
          className={cn(
            "shrink-0 h-10 w-10 bg-blue-500 hover:bg-blue-600 border-0 rounded-lg shadow-sm transition-all duration-200",
            !message.trim() && "opacity-40",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
