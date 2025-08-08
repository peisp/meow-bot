import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Conversation } from "@/types/conversation"
import { Plus, MessageSquare, MoreHorizontal, Trash2, Edit3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConversationSidebarProps {
  conversations: Conversation[]
  currentConversationId?: string
  onNewConversation: () => void
  onSelectConversation: (id: string) => void
  onDeleteConversation: (id: string) => void
  onRenameConversation: (id: string, newTitle: string) => void
}

export function ConversationSidebar({
  conversations,
  currentConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation
}: ConversationSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")

  const handleStartEdit = (conversation: Conversation) => {
    setEditingId(conversation.id)
    setEditTitle(conversation.title)
  }

  const handleSaveEdit = () => {
    if (editingId && editTitle.trim()) {
      onRenameConversation(editingId, editTitle.trim())
    }
    setEditingId(null)
    setEditTitle("")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditTitle("")
  }

  return (
    <div className="w-64 h-full bg-gray-50/80 backdrop-blur-xl border-r border-gray-200/60 flex flex-col" style={{"--wails-draggable": "drag"} as any}>
      {/* 顶部新对话按钮 */}
      <div className="pl-16 flex items-center text-lg font-semibold h-14">
          {/*Meow-Bot*/}
        {/*<Button*/}
        {/*  onClick={onNewConversation}*/}
        {/*  className="w-full justify-start bg-white/60 hover:bg-white/80 text-gray-700 border border-gray-200/60 shadow-sm transition-all duration-200"*/}
        {/*  variant="outline"*/}
        {/*>*/}
        {/*  <Plus className="w-4 h-4 mr-2" />*/}
        {/*  新对话*/}
        {/*</Button>*/}
      </div>

      {/* 对话列表 */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "group relative rounded-lg transition-all duration-200 cursor-pointer",
                currentConversationId === conversation.id
                  ? "bg-blue-100/60 border border-blue-200/60"
                  : "hover:bg-white/40 border border-transparent"
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex items-center p-3">
                <MessageSquare className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
                
                {editingId === conversation.id ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={handleSaveEdit}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit()
                      if (e.key === 'Escape') handleCancelEdit()
                    }}
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-gray-800"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {conversation.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {conversation.updatedAt.toLocaleDateString()}
                    </p>
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-gray-200/60"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleStartEdit(conversation)
                    }}
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-red-200/60"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteConversation(conversation.id)
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
