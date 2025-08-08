import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModelConfig } from "@/types/conversation"
import { ChevronDown, Settings, Cpu, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface TopToolbarProps {
  isSidebarCollapsed: boolean
  currentModel: ModelConfig
  availableModels: ModelConfig[]
  onModelChange: (model: ModelConfig) => void
  onOpenSettings: () => void
  conversationTitle?: string
}

export function TopToolbar({
  isSidebarCollapsed = false,
  currentModel,
  availableModels,
  onModelChange,
  onOpenSettings,
  conversationTitle = "新对话"
}: TopToolbarProps) {
  const [showModelMenu, setShowModelMenu] = useState(false)

  return (
    <div className={cn("h-14 bg-toolbar backdrop-blur-xl border-b border-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex items-center justify-between px-4 py-2 selection-boundary transition-all duration-300 ease-in-out", isSidebarCollapsed && "pl-24")} style={{"--wails-draggable": "drag"} as any}>
      {/* 左侧：对话标题 */}
      <div className={cn("flex items-center transition-all duration-300 ease-in-out", isSidebarCollapsed && "pl-20")}>
        <h1 className="text-lg font-semibold text-gray-800 truncate max-w-md">
          {conversationTitle}
        </h1>
      </div>

      {/* 中间：模型选择 */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Button
            variant="outline"
            className={cn(
              "bg-white/60 hover:bg-white/80 border-gray-200/60 text-gray-700 shadow-sm transition-all duration-300 ease-in-out",
              showModelMenu && "bg-white/80"
            )}
            onClick={() => setShowModelMenu(!showModelMenu)}
          >
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span className="font-medium">{currentModel.name}</span>
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform duration-200",
                showModelMenu && "rotate-180"
              )} />
            </div>
          </Button>

          {/* 模型选择下拉菜单 */}
          {showModelMenu && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
              <div className="p-2 space-y-1">
                {availableModels.map((model) => (
                  <div
                    key={model.id}
                    className={cn(
                      "p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out",
                      currentModel.id === model.id
                        ? "bg-blue-100/60 border border-blue-200/60"
                        : "hover:bg-gray-100/60"
                    )}
                    onClick={() => {
                      onModelChange(model)
                      setShowModelMenu(false)
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{model.name}</span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {model.provider}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {model.description}
                        </p>
                      </div>
                      {currentModel.id === model.id && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 右侧：设置按钮 */}
      <div className="flex items-center">
        <Button
          variant="outline"
          size="sm"
          className="bg-white/60 hover:bg-white/80 border-gray-200/60 text-gray-700 shadow-sm transition-all duration-300 ease-in-out"
          onClick={onOpenSettings}
        >
          <Settings className="w-4 h-4 mr-2" />
          参数设置
        </Button>
      </div>

      {/* 点击外部关闭菜单 */}
      {showModelMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowModelMenu(false)}
        />
      )}
    </div>
  )
}
