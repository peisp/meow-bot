import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Conversation } from "@/types/conversation"
import { Plus, MessageSquare, MoreHorizontal, Trash2, Edit3, Settings, Sun, Moon, Monitor, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConversationSidebarProps {
  conversations: Conversation[]
  currentConversationId?: string
  isCollapsed?: boolean
  onNewConversation: () => void
  onSelectConversation: (id: string) => void
  onDeleteConversation: (id: string) => void
  onRenameConversation: (id: string, newTitle: string) => void
  onOpenSettings?: () => void
  onToggleSidebar?: () => void
}

export function ConversationSidebar({
  conversations,
  currentConversationId,
  isCollapsed = false,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  onOpenSettings,
  onToggleSidebar
}: ConversationSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [themeMode, setThemeMode] = useState<'system' | 'light' | 'dark'>('system')

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

  const handleThemeToggle = () => {
    const themes: ('system' | 'light' | 'dark')[] = ['system', 'light', 'dark']
    const currentIndex = themes.indexOf(themeMode)
    const nextIndex = (currentIndex + 1) % themes.length
    setThemeMode(themes[nextIndex])
    // TODO: 实现主题切换逻辑
  }

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light':
        return <Sun className="w-4 h-4" />
      case 'dark':
        return <Moon className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  return (
    <div className="w-64 h-full bg-sidebar backdrop-blur-xl border-r border-gray-300 shadow-[2px_0_8px_rgba(0,0,0,0.1)] flex flex-col selection-boundary">
      {/* 对话列表 */}
      <ScrollArea className="flex-1 mt-10">
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
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-gray-800 selectable"
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

      {/* 底部按钮区域 */}
      <div className="p-3 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-100/60"
          onClick={onOpenSettings}
          title="设置"
        >
          <Settings className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-100/60"
          onClick={handleThemeToggle}
          title={`当前主题: ${themeMode === 'system' ? '系统' : themeMode === 'light' ? '亮色' : '暗色'}`}
        >
          {getThemeIcon()}
        </Button>
      </div>
    </div>
  )
}
