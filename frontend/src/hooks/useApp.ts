import { useState, useCallback } from "react"
import { Conversation, ModelConfig, ChatParameters, Message } from "@/types/conversation"

// 默认模型配置
const defaultModels: ModelConfig[] = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description: "最新的 GPT-4 模型，具有更好的性能和更长的上下文窗口"
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    description: "快速且经济的模型，适合大多数对话任务"
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    provider: "Anthropic",
    description: "平衡性能和速度的 Claude 3 模型"
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    description: "快速响应的轻量级 Claude 3 模型"
  }
]

// 默认参数
const defaultParameters: ChatParameters = {
  temperature: 0.7,
  maxTokens: 2048,
  topP: 1.0,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0
}

export function useApp() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [currentModel, setCurrentModel] = useState<ModelConfig>(defaultModels[0])
  const [parameters, setParameters] = useState<ChatParameters>(defaultParameters)
  const [isParametersOpen, setIsParametersOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // 获取当前对话
  const currentConversation = conversations.find(c => c.id === currentConversationId)

  // 创建新对话
  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: "新对话",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setConversations(prev => [newConversation, ...prev])
    setCurrentConversationId(newConversation.id)
  }, [])

  // 选择对话
  const selectConversation = useCallback((id: string) => {
    setCurrentConversationId(id)
  }, [])

  // 删除对话
  const deleteConversation = useCallback((id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    if (currentConversationId === id) {
      const remaining = conversations.filter(c => c.id !== id)
      setCurrentConversationId(remaining.length > 0 ? remaining[0].id : null)
    }
  }, [currentConversationId, conversations])

  // 重命名对话
  const renameConversation = useCallback((id: string, newTitle: string) => {
    setConversations(prev => prev.map(c => 
      c.id === id ? { ...c, title: newTitle, updatedAt: new Date() } : c
    ))
  }, [])

  // 发送消息
  const sendMessage = useCallback(async (content: string) => {
    if (!currentConversationId) {
      createNewConversation()
      // 需要等待状态更新，这里简化处理
      return
    }

    // 添加用户消息
    const userMessage: Message = {
      id: generateId(),
      content,
      role: 'user',
      timestamp: new Date()
    }

    setConversations(prev => prev.map(c => 
      c.id === currentConversationId 
        ? { 
            ...c, 
            messages: [...c.messages, userMessage],
            updatedAt: new Date(),
            title: c.messages.length === 0 ? content.slice(0, 30) + (content.length > 30 ? '...' : '') : c.title
          }
        : c
    ))

    setIsLoading(true)

    try {
      // TODO: 这里将来会调用真实的API
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      const responses = [
        "这是一个很好的问题！让我来帮助你解答。",
        "我理解你的意思，这确实是一个值得讨论的话题。",
        "根据你的描述，我建议可以尝试以下几种方法...",
        "这个问题比较复杂，需要从多个角度来分析。",
        "感谢你的提问，我很乐意为你提供帮助。",
        "让我为你详细解释一下这个概念。",
        "基于我的理解，我认为最佳的解决方案是...",
        "这确实是一个有趣的观点，让我们深入讨论一下。"
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const assistantMessage: Message = {
        id: generateId(),
        content: `${randomResponse}\n\n你刚才问的是："${content}"`,
        role: 'assistant',
        timestamp: new Date()
      }

      setConversations(prev => prev.map(c => 
        c.id === currentConversationId 
          ? { 
              ...c, 
              messages: [...c.messages, assistantMessage],
              updatedAt: new Date()
            }
          : c
      ))

    } catch (error) {
      console.error('发送消息时出错:', error)
      
      const errorMessage: Message = {
        id: generateId(),
        content: '抱歉，发生了一个错误。请稍后再试。',
        role: 'assistant',
        timestamp: new Date()
      }

      setConversations(prev => prev.map(c => 
        c.id === currentConversationId 
          ? { 
              ...c, 
              messages: [...c.messages, errorMessage],
              updatedAt: new Date()
            }
          : c
      ))
    } finally {
      setIsLoading(false)
    }
  }, [currentConversationId, createNewConversation])

  // 初始化时创建一个对话
  const initializeApp = useCallback(() => {
    if (conversations.length === 0) {
      createNewConversation()
    }
  }, [conversations.length, createNewConversation])

  return {
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
    availableModels: defaultModels,
    setCurrentModel,
    
    // 参数相关
    parameters,
    setParameters,
    isParametersOpen,
    setIsParametersOpen,
    
    // 初始化
    initializeApp
  }
}
