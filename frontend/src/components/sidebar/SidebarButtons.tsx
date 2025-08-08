import { Button } from "@/components/ui/button"
import { SidebarRightIcon, BubblePencilIcon } from "@/components/icon/CustomIcons"

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
    <div className="fixed top-0 left-0 z-50 flex items-center h-14 px-3 pl-24 bg-transparent">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-gray-100/60 transition-all duration-200 mr-2"
        onClick={onToggleSidebar}
        title={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
      >
        <div className="transition-transform duration-300 ease-in-out">
            <SidebarRightIcon />
        </div>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-blue-100/60 hover:text-blue-600 ml-auto transition-all duration-200"
        onClick={onNewConversation}
        title="新建对话"
      >
        <BubblePencilIcon />
      </Button>
    </div>
  )
}
