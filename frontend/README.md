# Meow Bot Frontend

基于 React + TypeScript + Tailwind CSS + shadcn/ui 构建的现代化大模型对话界面。

## 功能特性

- 🍎 **macOS 原生设计**：完全按照 macOS 12+ 系统原生样式设计
- 📋 **对话历史管理**：左侧边栏显示所有对话历史，支持新建、重命名、删除
- 🤖 **多模型支持**：顶部工具栏可切换不同的 AI 模型（GPT-4、Claude 3 等）
- ⚙️ **参数调整**：右侧抽屉可实时调整对话参数（Temperature、Max Tokens 等）
- 💬 **流畅的对话体验**：支持实时消息滚动和打字动画
- 🎨 **毛玻璃效果**：现代化的半透明背景和模糊效果
- ⌨️ **快捷键支持**：Enter 发送消息，Shift+Enter 换行
- 🔄 **智能状态管理**：自动保存对话历史和参数设置

## 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm (推荐)
pnpm install

# 或使用 yarn
yarn install
```

## 开发运行

```bash
# 使用 npm
npm run dev

# 或使用 pnpm
pnpm dev

# 或使用 yarn
yarn dev
```

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── ui/             # shadcn/ui 基础组件
│   ├── layout/         # 布局组件
│   ├── sidebar/        # 边栏组件
│   ├── header/         # 头部组件
│   ├── chat/           # 聊天相关组件
│   └── settings/       # 设置相关组件
├── hooks/              # 自定义 Hook
├── lib/                # 工具函数
├── types/              # TypeScript 类型定义
└── assets/             # 静态资源
```

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **shadcn/ui** - 组件库
- **Lucide React** - 图标库
- **Vite** - 构建工具

## 下一步开发

- [ ] 集成后端 API 调用
- [ ] 添加消息历史持久化
- [ ] 支持 Markdown 渲染
- [ ] 添加更多个性化设置
- [ ] 实现文件上传功能
