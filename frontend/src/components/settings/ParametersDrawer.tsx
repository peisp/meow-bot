import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChatParameters } from "@/types/conversation"
import { X, RotateCcw, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface ParametersDrawerProps {
  isOpen: boolean
  onClose: () => void
  parameters: ChatParameters
  onParametersChange: (parameters: ChatParameters) => void
}

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  description?: string
}

function Slider({ label, value, min, max, step, onChange, description }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {description && (
            <div className="group relative">
              <Info className="w-3 h-3 text-gray-400 cursor-help" />
              <div className="absolute left-0 top-full mt-1 w-64 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                {description}
              </div>
            </div>
          )}
        </div>
        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {value}
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-200"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

export function ParametersDrawer({
  isOpen,
  onClose,
  parameters,
  onParametersChange
}: ParametersDrawerProps) {
  const [localParams, setLocalParams] = useState(parameters)

  const handleParameterChange = (key: keyof ChatParameters, value: number) => {
    const newParams = { ...localParams, [key]: value }
    setLocalParams(newParams)
    onParametersChange(newParams)
  }

  const resetToDefaults = () => {
    const defaults: ChatParameters = {
      temperature: 0.7,
      maxTokens: 2048,
      topP: 1.0,
      frequencyPenalty: 0.0,
      presencePenalty: 0.0
    }
    setLocalParams(defaults)
    onParametersChange(defaults)
  }

  return (
    <>
      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* 抽屉 */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-80 bg-white/90 backdrop-blur-xl border-l border-gray-200/60 shadow-xl z-50 transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* 头部 */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200/60">
          <h2 className="text-lg font-semibold text-gray-800">对话参数</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-200/60"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* 内容 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <Slider
            label="Temperature"
            value={localParams.temperature}
            min={0}
            max={2}
            step={0.1}
            onChange={(value) => handleParameterChange('temperature', value)}
            description="控制输出的随机性。较低的值使输出更确定，较高的值使输出更随机和创造性。"
          />

          <Slider
            label="Max Tokens"
            value={localParams.maxTokens}
            min={1}
            max={4096}
            step={1}
            onChange={(value) => handleParameterChange('maxTokens', value)}
            description="控制生成的最大令牌数。更高的值允许更长的回复。"
          />

          <Slider
            label="Top P"
            value={localParams.topP}
            min={0}
            max={1}
            step={0.1}
            onChange={(value) => handleParameterChange('topP', value)}
            description="使用核采样，只考虑累积概率为top_p的最可能的令牌。"
          />

          <Slider
            label="Frequency Penalty"
            value={localParams.frequencyPenalty}
            min={-2}
            max={2}
            step={0.1}
            onChange={(value) => handleParameterChange('frequencyPenalty', value)}
            description="降低重复相同词汇的可能性。正值会减少重复。"
          />

          <Slider
            label="Presence Penalty"
            value={localParams.presencePenalty}
            min={-2}
            max={2}
            step={0.1}
            onChange={(value) => handleParameterChange('presencePenalty', value)}
            description="鼓励谈论新话题。正值会增加讨论新主题的可能性。"
          />

          {/* 重置按钮 */}
          <div className="pt-4 border-t border-gray-200/60">
            <Button
              variant="outline"
              onClick={resetToDefaults}
              className="w-full bg-white/60 hover:bg-white/80 border-gray-200/60 text-gray-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重置为默认值
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
