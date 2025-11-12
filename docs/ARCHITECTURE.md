# 🏗️ 架構設計文件

## 系統架構概述

Pomodoro Dungeon App 採用 **React Native** 開發,結合 **Context API** 進行狀態管理,並使用 **TypeScript** 確保類型安全。

## 技術架構圖

```
┌─────────────────────────────────────────────────┐
│                   UI Layer                      │
│  ┌─────────────┐  ┌──────────────┐            │
│  │  Screens    │  │  Components  │            │
│  │  - Pomodoro │  │  - Timer     │            │
│  │  - Reward   │  │  - Controls  │            │
│  │  - Ranking  │  │  - Stats     │            │
│  └─────────────┘  └──────────────┘            │
└─────────────────────────────────────────────────┘
                      ↓ ↑
┌─────────────────────────────────────────────────┐
│              State Management                   │
│  ┌─────────────────────────────────────────┐   │
│  │      PomodoroContext (React Context)    │   │
│  │  - useReducer for state management      │   │
│  │  - Custom hooks (usePomodoro)           │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                      ↓ ↑
┌─────────────────────────────────────────────────┐
│               Business Logic                    │
│  ┌──────────────┐  ┌──────────────────────┐   │
│  │   Services   │  │      Utilities       │   │
│  │  - Timer     │  │  - Time Formatting   │   │
│  │  - Notif.    │  │  - Progress Calc     │   │
│  │  - Storage   │  │  - ID Generation     │   │
│  └──────────────┘  └──────────────────────┘   │
└─────────────────────────────────────────────────┘
                      ↓ ↑
┌─────────────────────────────────────────────────┐
│              Native Modules                     │
│  ┌─────────────────┐  ┌─────────────────────┐ │
│  │  AsyncStorage   │  │  BackgroundTimer    │ │
│  │  (Local Storage)│  │  (Background Task)  │ │
│  └─────────────────┘  └─────────────────────┘ │
│  ┌─────────────────────────────────────────┐   │
│  │     PushNotification (Local Notif.)     │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

## 目錄結構設計

### 核心目錄

```
src/
├── components/          # 可重用元件
│   ├── common/          # 通用元件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   └── pomodoro/        # 番茄鐘專屬元件
│       ├── PomodoroTimer.tsx      # 計時器顯示
│       ├── PomodoroControls.tsx   # 控制按鈕
│       └── PomodoroStats.tsx      # 統計資料
│
├── screens/             # 畫面/頁面
│   ├── PomodoroScreen/  # 番茄鐘主畫面
│   ├── RewardScreen/    # 獎勵商城
│   └── RankingScreen/   # 排行榜
│
├── services/            # 業務邏輯服務
│   ├── timer/
│   │   └── TimerService.ts        # 計時器服務
│   ├── notification/
│   │   └── NotificationService.ts # 通知服務
│   └── storage/
│       └── StorageService.ts      # 本地儲存服務
│
├── contexts/            # React Context
│   └── PomodoroContext.tsx        # 番茄鐘狀態管理
│
├── hooks/               # 自定義 Hooks
│   └── usePomodoro.ts              # (封裝在 Context 中)
│
├── types/               # TypeScript 型別定義
│   └── pomodoro.types.ts          # 番茄鐘型別
│
├── utils/               # 工具函數
│   └── timeUtils.ts                # 時間處理工具
│
├── constants/           # 常數定義
│   └── pomodoro.constants.ts      # 番茄鐘常數
│
└── App.tsx              # 應用程式入口
```

## 核心模組設計

### 1. 狀態管理 (State Management)

使用 **React Context + useReducer** 模式:

```typescript
PomodoroContext
├── State (PomodoroState)
│   ├── status: PomodoroStatus
│   ├── phase: PomodoroPhase
│   ├── timeRemaining: number
│   ├── totalTime: number
│   ├── completedPomodoros: number
│   └── config: PomodoroConfig
│
└── Actions (PomodoroAction)
    ├── START
    ├── PAUSE
    ├── RESUME
    ├── STOP
    ├── TICK
    ├── COMPLETE
    ├── SKIP_BREAK
    ├── UPDATE_CONFIG
    └── RESET
```

**優點:**
- 集中管理狀態
- 易於測試
- 避免 prop drilling
- 支援 TypeScript 類型檢查

### 2. 服務層 (Services Layer)

#### TimerService
- 使用 `BackgroundTimer` 確保背景運行
- 提供 start, stop, pause, resume 方法
- 單例模式設計

#### NotificationService
- 使用 `react-native-push-notification`
- 支援本地推播通知
- 自動請求通知權限

#### StorageService
- 使用 `AsyncStorage`
- 封裝所有本地儲存操作
- 提供統計資料持久化

### 3. 資料流 (Data Flow)

```
User Action (UI)
    ↓
Dispatch Action
    ↓
Reducer (State Update)
    ↓
Side Effect (useEffect)
    ↓
Service Layer (Timer/Notification/Storage)
    ↓
Native Module
    ↓
Callback
    ↓
Dispatch Action (TICK/COMPLETE)
    ↓
UI Update
```

## 關鍵技術決策

### 1. 為什麼選擇 React Native?

✅ **優點:**
- 跨平台開發 (iOS/Android)
- 豐富的生態系統
- Hot Reload 加速開發
- 團隊熟悉 React
- 社群支援度高

❌ **缺點:**
- 原生功能整合較複雜
- 效能略遜原生開發
- 需要橋接層

### 2. 為什麼使用 Context API 而非 Redux?

✅ **理由:**
- 專案規模適中,不需要 Redux 複雜度
- Context API 已能滿足狀態管理需求
- 減少依賴套件
- 學習曲線較低
- 整合 TypeScript 更簡單

### 3. 為什麼用 BackgroundTimer?

✅ **理由:**
- 支援背景計時
- iOS/Android 雙平台支援
- API 簡單易用
- 社群維護活躍

### 4. 本地儲存選擇 AsyncStorage

✅ **理由:**
- React Native 官方推薦
- 跨平台一致性
- 簡單的 key-value 儲存
- 足夠處理目前資料量

## 效能優化策略

### 1. 減少不必要的重新渲染
- 使用 `React.memo` 包裝元件
- 使用 `useCallback` 和 `useMemo`
- 避免在 render 中建立新物件

### 2. 背景任務優化
- 使用 BackgroundTimer 而非 setInterval
- 計時器精準度維持在秒級

### 3. 儲存優化
- 批次寫入減少 I/O
- 僅在必要時讀寫儲存
- 使用 in-memory cache

## 安全性考量

### 1. 資料隱私
- 所有資料儲存在本地
- 不收集個人敏感資訊
- EDU Email 驗證(未來功能)僅用於學校識別

### 2. 通知權限
- 明確請求使用者授權
- 提供關閉通知選項
- 不濫用通知功能

## 可擴展性設計

### 1. 模組化架構
- 功能模組獨立
- 低耦合高內聚
- 易於新增功能

### 2. 類型安全
- TypeScript 確保型別正確
- 減少執行時期錯誤
- 提供更好的 IDE 支援

### 3. 服務抽象
- Service 層封裝實作細節
- 易於替換底層實作
- 支援 Mock 測試

## 測試策略

### 1. 單元測試
- 測試 Reducer 邏輯
- 測試 Utility 函數
- 測試 Service 層

### 2. 整合測試
- 測試 Context + Component
- 測試完整使用者流程

### 3. E2E 測試
- 測試關鍵使用場景
- 使用 Detox 或 Appium

## 未來擴展方向

### Phase 2 - 遊戲化增強
- 地牢風格 UI 設計
- 角色成長系統
- 裝備與道具系統

### Phase 3 - 社群功能
- 後端 API 整合
- 即時排行榜
- 公會系統
- 好友功能

### Phase 4 - 進階功能
- 自訂主題
- 統計圖表視覺化
- 匯出資料
- 雲端同步

## 技術債務管理

### 目前已知限制
1. 尚未實作音效系統
2. 缺少錯誤邊界處理
3. 統計資料計算可優化
4. 需要更完整的 TypeScript 覆蓋

### 改善計畫
- Sprint 2: 加入音效系統
- Sprint 3: 實作錯誤處理
- Sprint 4: 優化效能
- Sprint 5: 完善測試覆蓋率

---

**文件版本:** 1.0  
**最後更新:** 2025-11-12  
**負責人:** 技術架構組