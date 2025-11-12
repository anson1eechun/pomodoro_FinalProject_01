# 🚀 快速開始指南

歡迎來到 Pomodoro Dungeon App 專案!這份文件將幫助你快速上手。

## 📋 目錄

1. [專案簡介](#專案簡介)
2. [快速安裝](#快速安裝)
3. [目錄結構](#目錄結構)
4. [核心功能](#核心功能)
5. [開發指令](#開發指令)
6. [團隊資訊](#團隊資訊)
7. [相關文件](#相關文件)

## 專案簡介

**Pomodoro Dungeon App** 是一款結合遊戲化的番茄鐘學習應用,專為學生設計。

### 核心特色
- 🍅 **番茄鐘計時器** - 25分鐘專注 + 5分鐘休息
- 🎮 **地牢風格介面** - 遊戲化體驗
- 💰 **虛擬貨幣系統** - 完成任務獲得金幣
- 🏆 **學校排行榜** - 與同學競爭
- 📧 **EDU 認證** - 學校身份驗證

### 技術棧
- React Native 0.73
- TypeScript 5.0
- Context API (狀態管理)
- AsyncStorage (本地儲存)
- BackgroundTimer (背景計時)
- Push Notification (本地通知)

## 快速安裝

### 前置需求
- Node.js 18+
- npm 9+
- Android Studio (Android 開發)
- JDK 17

### 安裝步驟

```bash
# 1. Clone 專案
git clone <repository-url>
cd pomodoro-dungeon-app

# 2. 安裝相依套件
npm install

# 3. 啟動 Metro Bundler
npm start

# 4. 執行應用程式
npm run android  # Android
npm run ios      # iOS (僅 macOS)
```

詳細安裝指南請參考 [docs/SETUP.md](docs/SETUP.md)

## 目錄結構

```
pomodoro-dungeon-app/
├── src/                          # 原始碼
│   ├── components/               # React 元件
│   │   ├── common/               # 通用元件
│   │   └── pomodoro/             # 番茄鐘元件
│   │       ├── PomodoroTimer.tsx      # 計時器顯示 ✅
│   │       ├── PomodoroControls.tsx   # 控制按鈕 ✅
│   │       └── PomodoroStats.tsx      # 統計資料 ✅
│   │
│   ├── screens/                  # 畫面
│   │   └── PomodoroScreen/       # 番茄鐘主畫面 ✅
│   │
│   ├── services/                 # 業務邏輯服務
│   │   ├── timer/                # 計時器服務 ✅
│   │   ├── notification/         # 通知服務 ✅
│   │   └── storage/              # 儲存服務 ✅
│   │
│   ├── contexts/                 # React Context
│   │   └── PomodoroContext.tsx   # 番茄鐘狀態管理 ✅
│   │
│   ├── types/                    # TypeScript 型別 ✅
│   ├── utils/                    # 工具函數 ✅
│   ├── constants/                # 常數定義 ✅
│   └── App.tsx                   # 應用程式入口 ✅
│
├── docs/                         # 專案文件
│   ├── ARCHITECTURE.md           # 架構設計文件 ✅
│   ├── SETUP.md                  # 環境設置指南 ✅
│   ├── API.md                    # API 規格文件 ✅
│   └── DEVELOPMENT.md            # 開發指南 ✅
│
├── package.json                  # 套件配置 ✅
├── tsconfig.json                 # TypeScript 配置 ✅
└── README.md                     # 專案說明 ✅
```

## 核心功能

### ✅ 已完成 (MVP Phase 1)

#### 1. 番茄鐘計時器
- [x] 基本計時功能 (25分鐘專注 / 5分鐘休息)
- [x] 開始、暫停、繼續、停止控制
- [x] 背景計時支援
- [x] 視覺化進度顯示
- [x] 階段切換 (專注 → 短休息 → 長休息)

#### 2. 通知系統
- [x] 完成時推播通知
- [x] 自訂通知訊息
- [x] 通知權限請求

#### 3. 本地儲存
- [x] 番茄鐘配置儲存
- [x] 歷史記錄儲存
- [x] 統計資料持久化

#### 4. 統計功能
- [x] 今日完成次數
- [x] 總完成次數
- [x] 累計專注時間
- [x] 連續天數計算
- [x] 金幣累計

#### 5. 獎勵系統
- [x] 完成番茄鐘獲得金幣
- [x] 連續完成獎勵加成
- [x] 未中斷額外獎勵

### 🚧 進行中 (Phase 2)
- [ ] 地牢風格 UI 設計
- [ ] 角色系統
- [ ] 音效系統
- [ ] 獎勵商城

### 📅 計畫中 (Phase 3)
- [ ] EDU Email 認證
- [ ] 學校公會系統
- [ ] 即時排行榜
- [ ] 後端 API 整合

## 開發指令

```bash
# 開發
npm start                # 啟動 Metro Bundler
npm run android          # 執行 Android App
npm run ios              # 執行 iOS App

# 測試
npm test                 # 執行單元測試
npm test -- --coverage   # 測試覆蓋率報告

# 程式碼品質
npm run lint             # ESLint 檢查
npm run format           # Prettier 格式化
npm run type-check       # TypeScript 型別檢查

# 建置
cd android && ./gradlew assembleRelease  # Android Release Build
```

## 團隊資訊

### 團隊分工

| 團隊 | 成員數 | 負責範圍 | 狀態 |
|------|--------|----------|------|
| **Team 1 - 使用者系統組** | 2人 | EDU認證、使用者管理 | 待開發 |
| **Team 2 - 番茄鐘核心組** | 2人 | 計時器、通知、背景服務 | ✅ MVP完成 |
| **Team 3 - 遊戲化系統組** | 2人 | 虛擬貨幣、獎勵商城 | 規劃中 |
| **Team 4 - 社群功能組** | 2人 | 公會、排行榜 | 規劃中 |

### 開發里程碑

- **Week 1-2**: ✅ 專案建置、番茄鐘核心功能
- **Week 3-4**: 🚧 UI 設計、遊戲化元素
- **Week 5-6**: 獎勵系統、使用者系統
- **Week 7-8**: 社群功能、排行榜
- **Week 9-10**: 測試、優化、上線準備

## 相關文件

### 📚 技術文件
- [架構設計文件](docs/ARCHITECTURE.md) - 系統架構、技術決策
- [環境設置指南](docs/SETUP.md) - 開發環境建置
- [開發指南](docs/DEVELOPMENT.md) - 程式碼規範、最佳實踐
- [API 規格文件](docs/API.md) - 未來後端 API 設計

### 🎯 使用案例文件
- UML 使用案例圖 (已完成)
- UML 類別圖 (已完成)

## 常見問題

### Q: 如何開始貢獻程式碼?
A: 請先閱讀 [DEVELOPMENT.md](docs/DEVELOPMENT.md) 了解開發規範,然後:
1. Fork 專案
2. 建立 feature 分支
3. 開發並測試
4. 提交 Pull Request

### Q: 遇到建置錯誤怎麼辦?
A: 請參考 [SETUP.md](docs/SETUP.md) 的「常見問題排解」章節。

### Q: 如何測試背景計時功能?
A: 使用實體裝置測試,模擬器的背景功能可能不完整。

### Q: 通知不顯示?
A: 確認:
1. 已授予通知權限
2. Android 13+ 需要額外的通知權限
3. 檢查系統通知設定

## 聯絡方式

- **專案管理者**: [待填寫]
- **技術負責人**: [待填寫]
- **Issues**: [GitHub Issues]
- **Discord**: [團隊 Discord 頻道]

## 授權

MIT License

---

**專案狀態**: 🚧 MVP 開發中  
**最後更新**: 2025-11-12  
**版本**: 0.1.0

---

## 🎉 開始開發吧!

如果你已經完成環境設置,現在可以:

1. 執行 `npm start` 啟動開發伺服器
2. 執行 `npm run android` 看看番茄鐘 App
3. 閱讀 [ARCHITECTURE.md](docs/ARCHITECTURE.md) 了解系統設計
4. 選擇一個 Issue 開始貢獻!

**祝你 coding 愉快! 🚀**