# 🍅 Pomodoro Dungeon App

一個結合遊戲化學習的番茄鐘應用程式，專為學生設計。

## 📋 專案概述

**Pomodoro Dungeon App** 是一個使用 React Native + TypeScript 開發的番茄鐘應用程式，結合遊戲化元素來提升學習動機。

### 核心功能

- ✅ 25分鐘專注計時器
- ✅ 5分鐘短休息 / 15分鐘長休息
- ✅ 開始/暫停/繼續/停止控制
- ✅ 背景計時支援
- ✅ 視覺化進度顯示
- ✅ 完成時推播通知
- ✅ 本地儲存歷史記錄
- ✅ 統計資料追蹤
- ✅ 金幣獎勵系統

## 🚀 快速開始

### 前置需求

- Node.js 18+
- npm 9+
- Android Studio (Android 開發)
- JDK 17
- Xcode (iOS 開發，僅 macOS)

### 安裝步驟

1. **安裝依賴**
   ```bash
   npm install
   ```

2. **iOS Pod 安裝 (僅 macOS)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **啟動 Metro Bundler**
   ```bash
   npm start
   ```

4. **運行應用程式**
   ```bash
   # Android
   npm run android

   # iOS (僅 macOS)
   npm run ios
   ```

詳細安裝指南請參考 [docs/SETUP.md](docs/SETUP.md)

## 📂 專案結構

```
pomodoro-dungeon-app/
├── src/                    # 原始碼目錄
│   ├── components/         # React 元件
│   ├── screens/            # 畫面
│   ├── services/           # 業務邏輯服務
│   ├── contexts/           # 狀態管理
│   ├── types/              # TypeScript 型別
│   ├── utils/              # 工具函數
│   └── constants/          # 常數定義
│
├── docs/                   # 完整專案文件
│   ├── ARCHITECTURE.md     # 架構設計文件
│   ├── SETUP.md            # 環境設置指南
│   ├── API.md              # API 規格文件
│   └── DEVELOPMENT.md      # 開發指南
│
├── package.json            # 相依套件配置
├── tsconfig.json           # TypeScript 配置
├── babel.config.js         # Babel 配置
└── app.json                # React Native App 設定
```

## 🔧 技術棧

### 前端框架
- **React Native**: 0.73.0
- **React**: 18.2.0
- **TypeScript**: 5.3.3

### 狀態管理
- **Context API**: React 原生
- **useReducer**: 狀態邏輯管理

### 儲存方案
- **AsyncStorage**: 本地資料持久化

### 背景任務
- **BackgroundTimer**: 背景計時支援

### 推播通知
- **react-native-push-notification**: 本地通知

### 開發工具
- **ESLint**: 程式碼檢查
- **Prettier**: 程式碼格式化
- **TypeScript**: 型別安全

## 📚 文件導覽

### 開始使用
1. 📖 [quickstart.md](quickstart.md) - 快速開始指南
2. 🛠️ [docs/SETUP.md](docs/SETUP.md) - 完整環境設置

### 開發者文件
3. 🏗️ [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - 系統架構設計
4. 💻 [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) - 開發規範與最佳實踐
5. 📡 [docs/API.md](docs/API.md) - 未來後端 API 設計

### 專案管理
6. 📋 [Project_delivery.md](Project_delivery.md) - 專案交付文件
7. 📊 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - 專案結構總覽
8. 🚀 [RUN_STATUS.md](RUN_STATUS.md) - 運行狀態檢查

## 🎯 開發指令

```bash
# 啟動 Metro Bundler
npm start

# 運行 Android 應用程式
npm run android

# 運行 iOS 應用程式
npm run ios

# 執行測試
npm test

# 程式碼檢查
npm run lint
```

## 📊 程式碼統計

```
總檔案數: 12 個主要程式檔案
總行數: ~1,500 行程式碼
文件行數: ~2,500 行
TypeScript 覆蓋率: 100%
```

## ⚠️ 重要提醒

### 專案狀態

**✅ 已完成**:
- 所有程式碼檔案結構完整
- 所有配置文件已創建
- 所有元件已創建
- TypeScript 編譯通過
- 依賴已安裝

**⚠️ 需要完成**:
- React Native 原生專案結構（android/ 和 ios/ 目錄）
- 原生模組配置（通知、背景任務權限）
- 權限配置（AndroidManifest.xml 和 Info.plist）

### 運行前準備

此專案目前只包含原始碼，需要完整的 React Native 專案結構才能運行。

**選項 1: 使用 React Native CLI 初始化專案**
```bash
npx react-native init PomodoroDungeon --version 0.73.0
# 然後將 src/ 目錄和配置文件複製到新專案
```

**選項 2: 使用 Expo (推薦新手)**
```bash
npx create-expo-app PomodoroDungeon
# 然後配置原生模組
```

詳細說明請參考 [RUN_STATUS.md](RUN_STATUS.md)

## 📄 授權

MIT License

## 👥 貢獻

歡迎提交 Issue 和 Pull Request！

---

**專案版本**: v0.1.0-MVP  
**最後更新**: 2025-11-12  
**狀態**: ✅ 程式碼完整，⚠️ 需要原生專案結構

