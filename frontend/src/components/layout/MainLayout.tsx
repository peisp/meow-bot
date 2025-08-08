import { useEffect } from "react"
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

  return (
    <div className="h-screen w-screen flex overflow-hidden">
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
