# 洪兴门户首屏预览说明

## 1) 安装依赖

在你的 React + Tailwind 项目中确保已安装：

```bash
npm install lucide-react
```

## 2) 放置页面文件

已提供页面组件文件：

- `src/HongxingPortalPage.jsx`

## 3) 在入口页面使用

示例（如 `src/App.jsx`）：

```jsx
import HongxingPortalPage from "./HongxingPortalPage";

export default function App() {
  return <HongxingPortalPage />;
}
```

## 4) Tailwind 说明

- 页面使用了 `line-clamp-2`；如果你的 Tailwind 版本或配置不支持，请启用 line-clamp 能力后再预览。
- 视觉主色为 `#007B7A`，页面底色为 `bg-slate-50`，卡片统一 `bg-white + rounded + shadow-sm`。
