import { Button } from "@/components/ui/button"
import { Plus, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import {cn} from "@/lib/utils";

interface SidebarButtonsProps {
  isCollapsed?: boolean
  onToggleSidebar?: () => void
  onNewConversation?: () => void
}

export function SidebarButtons({
  isCollapsed = false,
  onToggleSidebar,
  onNewConversation
}: SidebarButtonsProps) {
  return (
    <div className={cn("fixed top-0 left-0 z-50 flex items-center h-12 py-1 px-3 pl-24", isCollapsed && "bg-toolbar")} style={{"--wails-draggable": "drag"} as any}>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-gray-100/60"
        onClick={onToggleSidebar}
        title={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
      >
        {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-blue-100/60 hover:text-blue-600 ml-auto"
        onClick={onNewConversation}
        title="新建对话"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  )
}
