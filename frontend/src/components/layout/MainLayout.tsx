import { useEffect, useCallback } from "react"
import { ConversationSidebar } from "@/components/sidebar/ConversationSidebar"
import { TopToolbar } from "@/components/header/TopToolbar"
import { ChatMessages } from "@/components/chat/ChatMessages"
import { ChatInput } from "@/components/chat/ChatInput"
import { ParametersDrawer } from "@/components/settings/ParametersDrawer"
import { useApp } from "@/hooks/useApp"

export function MainLayout() {
  const {
    // 对话相关
    conversations,
    currentConversation,
    currentConversationId,
    createNewConversation,
    selectConversation,
    deleteConversation,
    renameConversation,
    sendMessage,
    isLoading,
    
    // 模型相关
    currentModel,
    availableModels,
    setCurrentModel,
    
    // 参数相关
    parameters,
    setParameters,
    isParametersOpen,
    setIsParametersOpen,
    
    // 初始化
    initializeApp
  } = useApp()

  // 初始化应用
  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  // 防止跨组件选中的动态CSS控制
  useEffect(() => {
    let activeSelectionBoundary: Element | null = null
    let isSelecting = false

    const getAllSelectionBoundaries = () => {
      return Array.from(document.querySelectorAll('.selection-boundary'))
    }

    const enableOnlyActiveBoundary = (activeBoundary: Element) => {
      const allBoundaries = getAllSelectionBoundaries()
      
      allBoundaries.forEach(boundary => {
        if (boundary === activeBoundary) {
          boundary.classList.add('selection-active')
          boundary.classList.remove('selection-disabled')
        } else {
          boundary.classList.add('selection-disabled')
          boundary.classList.remove('selection-active')
        }
      })
    }

    const resetAllBoundaries = () => {
      const allBoundaries = getAllSelectionBoundaries()
      allBoundaries.forEach(boundary => {
        boundary.classList.remove('selection-active', 'selection-disabled')
      })
    }

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const selectableElement = target.closest('.selectable')
      
      if (selectableElement) {
        const boundary = selectableElement.closest('.selection-boundary')
        if (boundary) {
          activeSelectionBoundary = boundary
          isSelecting = true
          enableOnlyActiveBoundary(boundary)
        }
      }
    }

    const handleMouseUp = () => {
      if (isSelecting) {
        // 延迟重置，让选中操作完成
        setTimeout(() => {
          resetAllBoundaries()
          activeSelectionBoundary = null
          isSelecting = false
        }, 50)
      }
    }

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement
      const selectableElement = target.closest('.selectable')
      
      if (!selectableElement) {
        e.preventDefault()
        return false
      }
      
      const boundary = selectableElement.closest('.selection-boundary')
      if (boundary && activeSelectionBoundary && boundary !== activeSelectionBoundary) {
        e.preventDefault()
        return false
      }
    }

    // 监听全局点击来重置状态
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.selectable')) {
        resetAllBoundaries()
        activeSelectionBoundary = null
        isSelecting = false
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('click', handleClick)
      resetAllBoundaries()
    }
  }, [])

  return (
    <div className="h-screen w-screen flex overflow-hidden fixed inset-0">
      {/* 左侧边栏 */}
      <ConversationSidebar
        conversations={conversations}
        currentConversationId={currentConversationId ?? undefined}
        onNewConversation={createNewConversation}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
        onRenameConversation={renameConversation}
      />

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶部工具栏 */}
        <TopToolbar
          currentModel={currentModel}
          availableModels={availableModels}
          onModelChange={setCurrentModel}
          onOpenSettings={() => setIsParametersOpen(true)}
          conversationTitle={currentConversation?.title}
        />

        {/* 聊天区域 */}
        <div className="flex-1 flex flex-col min-h-0 backdrop-blur-sm m-4 mt-0 rounded-lg border border-white/40 shadow-xl shadow-gray-900/5 overflow-hidden">
          {/* 消息列表 */}
          <ChatMessages
            messages={currentConversation?.messages || []}
            isLoading={isLoading}
          />

          {/* 输入框 */}
          <ChatInput
            onSendMessage={sendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* 参数设置抽屉 */}
      <ParametersDrawer
        isOpen={isParametersOpen}
        onClose={() => setIsParametersOpen(false)}
        parameters={parameters}
        onParametersChange={setParameters}
      />
    </div>
  )
}
