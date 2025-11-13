# Pomodoro Dungeon App - 完整設計系統

## 1. 設計系統 (Design System)

### 1.1 色彩系統

#### 主色調 - 地牢深紫 (專注時段)
```
Primary Purple: #8B5CF6 (紫-500)
Primary Dark: #7C3AED (紫-600)
Primary Light: #A78BFA (紫-400)
Primary Glow: rgba(139, 92, 246, 0.3) - 用於光暈效果
```

#### 次要色調 - 神秘粉 (強調/獎勵)
```
Secondary Pink: #EC4899 (粉-500)
Secondary Dark: #DB2777 (粉-600)
Secondary Light: #F472B6 (粉-400)
```

#### 專注模式色 - 火焰橙紅
```
Focus Primary: #DC2626 (紅-600)
Focus Secondary: #EA580C (橙-600)
Focus Gradient: linear-gradient(135deg, #DC2626, #EA580C)
```

#### 休息模式色 - 恢復綠
```
Break Primary: #059669 (綠-600)
Break Secondary: #10B981 (綠-500)
Break Gradient: linear-gradient(135deg, #059669, #10B981)
```

#### 獎勵/金幣色 - 寶藏金
```
Gold Primary: #F59E0B (琥珀-500)
Gold Dark: #D97706 (琥珀-600)
Gold Light: #FCD34D (琥珀-300)
Gold Glow: rgba(245, 158, 11, 0.5)
```

#### 背景色系 - 地牢深邃
```
Background Primary: #0F172A (石板-900)
Background Secondary: #1E293B (石板-800)
Background Card: rgba(15, 23, 42, 0.5) + backdrop-blur
Border: rgba(139, 92, 246, 0.3)
```

#### 文字色系
```
Text Primary: #FFFFFF (白色) - 主標題
Text Secondary: #CBD5E1 (石板-300) - 正文
Text Tertiary: #94A3B8 (石板-400) - 次要資訊
Text Muted: #64748B (石板-500) - 禁用狀態
```

#### 語義色彩
```
Success: #10B981 (綠-500) - 完成、成功
Warning: #F59E0B (琥珀-500) - 警告
Error: #EF4444 (紅-500) - 錯誤、危險
Info: #3B82F6 (藍-500) - 資訊提示
```

### 1.2 字體系統

#### 字體家族
```
Primary Font: system-ui, -apple-system, "Segoe UI"
Number Font: "SF Mono", Monaco, monospace (計時器數字)
Display Font: Inter, system-ui (標題)
```

#### 字體大小階層
```
Display XL: 48px / 3rem (大標題、計時器)
Display L: 36px / 2.25rem (頁面標題)
Display M: 30px / 1.875rem
Heading 1: 24px / 1.5rem (卡片標題)
Heading 2: 20px / 1.25rem (區塊標題)
Heading 3: 18px / 1.125rem
Body Large: 16px / 1rem (正文加大)
Body: 14px / 0.875rem (標準正文)
Caption: 12px / 0.75rem (說明文字)
Small: 10px / 0.625rem (極小註記)
```

#### 字重
```
Regular: 400 (正文)
Medium: 500 (強調)
Semibold: 600 (次標題)
Bold: 700 (主標題)
```

#### 行高
```
Tight: 1.2 (大標題)
Normal: 1.5 (正文)
Relaxed: 1.75 (說明文字)
```

### 1.3 間距系統 (8pt Grid)

```
xs: 4px / 0.25rem
sm: 8px / 0.5rem
md: 16px / 1rem
lg: 24px / 1.5rem
xl: 32px / 2rem
2xl: 48px / 3rem
3xl: 64px / 4rem
```

#### 常用間距場景
- 元素內邊距: md (16px)
- 卡片間距: lg (24px)
- 區塊間距: xl (32px)
- 頁面邊距: md (16px) 手機 / lg (24px) 平板

### 1.4 圓角系統

```
none: 0px
sm: 4px (標籤、小徽章)
md: 8px (輸入框、小按鈕)
lg: 12px (卡片、大按鈕)
xl: 16px (模態框)
2xl: 24px (大型卡片)
full: 9999px (圓形)
```

### 1.5 陰影系統 (地牢深度感)

```
Shadow SM: 0 2px 8px rgba(0, 0, 0, 0.3)
Shadow MD: 0 4px 16px rgba(0, 0, 0, 0.4)
Shadow LG: 0 8px 32px rgba(0, 0, 0, 0.5)
Shadow XL: 0 16px 48px rgba(0, 0, 0, 0.6)

Glow Purple: 0 0 20px rgba(139, 92, 246, 0.5)
Glow Gold: 0 0 24px rgba(245, 158, 11, 0.6)
Glow Pink: 0 0 20px rgba(236, 72, 153, 0.5)
```

### 1.6 圖標系統

#### 圖標庫: Lucide React
#### 圖標大小:
```
xs: 16px
sm: 20px
md: 24px
lg: 32px
xl: 48px
```

#### 地牢主題 Emoji 圖標集
```
角色: 🚶 🧙 ⚔️ 🛡️
怪物: 🐉 👹 👾 💀
寶物: 💰 💎 👑 🏆
物品: ⚗️ 📜 🗝️ 🎁
狀態: 🔥 ⚡ 💫 ✨
場景: 🏰 🗿 🌙 🕯️
```

### 1.7 動畫系統

#### 時長
```
Fast: 150ms (hover, focus)
Normal: 300ms (modal, drawer)
Slow: 500ms (page transition)
```

#### 緩動函數
```
Ease Out: cubic-bezier(0, 0, 0.2, 1) - 入場
Ease In: cubic-bezier(0.4, 0, 1, 1) - 出場
Ease In Out: cubic-bezier(0.4, 0, 0.2, 1) - 雙向
Spring: 彈性動畫用於慶祝效果
```

#### 關鍵動畫
- 按鈕點擊: scale(0.95) 150ms
- 卡片懸停: translateY(-4px) + shadow 300ms
- 獎勵出現: scale(0 → 1) + rotate + bounce 500ms
- 計時完成: 煙火/光暈擴散動畫 1000ms
- 頁面切換: fade + slide 300ms

### 1.8 組件規範

#### 按鈕
```
Primary Button:
- 高度: 48px (大) / 40px (中) / 32px (小)
- 圓角: lg (12px)
- 背景: Purple-Pink 漸變
- 文字: 白色 Bold
- Hover: 亮度 +10%, scale(1.02)
- Active: scale(0.98)

Secondary Button:
- 邊框: 1px Purple-500/30
- 背景: 透明
- 文字: Purple-300
- Hover: 背景 Purple-500/20

Danger Button:
- 背景: Red-600
- 用於刪除、登出
```

#### 卡片
```
Standard Card:
- 背景: Slate-900/50 + backdrop-blur
- 邊框: 1px Purple-500/30
- 圓角: 2xl (24px)
- 內邊距: xl (32px)
- 陰影: Shadow MD
```

#### 輸入框
```
Input Field:
- 高度: 48px
- 圓角: lg (12px)
- 背景: Slate-800
- 邊框: 1px Purple-500/30
- Focus: 邊框 Purple-500, glow
- Placeholder: Slate-500
```

### 1.9 佈局網格

#### 行動端
- 容器寬度: 100% - 32px margin
- 欄位: 4 columns
- Gap: 16px

#### 平板
- 容器寬度: 768px
- 欄位: 8 columns
- Gap: 24px

#### 響應式斷點
```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px (Web 預覽)
```

---

## 2. 地牢風格視覺語言

### 2.1 核心視覺隱喻

#### 學習 = 冒險
- 每次番茄鐘 = 一場戰鬥
- 專注時間 = 擊敗怪物
- 分心 = 怪物反擊
- 完成 = 勝利獲得戰利品

#### 進度 = 闖關
- 等級系統 = 勇者成長
- 經驗值 = 累積學習時間
- 關卡 = 每日/每週目標
- Boss 戰 = 考試/重要任務

### 2.2 角色系統視覺

#### 勇者形象
- 初期: 🚶 簡單行走者
- 5級: ⚔️ 見習劍士
- 10級: 🛡️ 精英戰士
- 20級: 👑 傳奇勇者

#### 角色狀態指示
- 行走動畫: 專注進行中
- 休息姿態: 🧘 冥想恢復
- 勝利姿態: 🎉 完成慶祝
- 受傷: 分心/中斷

### 2.3 環境氛圍營造

#### 背景層次
1. **最遠層**: 漸變背景 (深紫到黑)
2. **中景**: 半透明卡片 (玻璃擬態)
3. **前景**: 角色、按鈕 (高亮清晰)

#### 光影效果
- 金幣/寶箱: 金色光暈脈動
- 等級提升: 紫色光芒爆發
- 專注計時: 火焰微光閃爍
- 完成任務: 星光粒子效果

---

## 3. 遊戲化元素設計

### 3.1 等級系統

#### 等級計算
- 1級 = 0分鐘
- 每級所需 = level × 500 分鐘
- 最高等級 = 50級

#### 視覺呈現
```
[等級徽章] Lv.5
[經驗值條] ▓▓▓▓▓░░░░░ 250/500 XP
[下一級獎勵] 🎁 5級達成解鎖「專注大師」稱號
```

### 3.2 成就系統

#### 成就類別
1. **里程碑成就**: 累積時數、完成次數
2. **連勝成就**: 連續天數、連續週數
3. **挑戰成就**: 單次長時間、深夜專注
4. **社交成就**: 公會貢獻、排行榜名次

#### 視覺設計
- 未解鎖: 灰色剪影 + 鎖頭 🔒
- 已解鎖: 彩色圖標 + 光暈
- 稀有度: 銅🥉 銀🥈 金🥇 鑽💎

### 3.3 金幣系統

#### 獲得方式
- 完成25分鐘 = 10 金幣 💰
- 連續3次不中斷 = 額外5 金幣
- 每日首次 = 額外10 金幣
- 排行榜獎勵 = 50-200 金幣

#### 視覺反饋
- 獲得時: 金幣從怪物飛向角色
- 數量變化: 數字彈跳放大動畫
- 不足時: 紅色閃爍提示

---

## 4. 可用性與無障礙設計

### 4.1 單手操作友善

#### 拇指熱區 (Thumb Zone)
```
[綠區 - 易觸及]
  └─ 底部導航列
  └─ 主要 CTA 按鈕

[黃區 - 可觸及]  
  └─ 中間區域內容

[紅區 - 難觸及]
  └─ 頂部次要功能
```

#### 關鍵按鈕位置
- 開始/暫停: 中下方, 大尺寸 (80×80)
- 底部導航: 固定底部
- 次要功能: 右上角 (設定)

### 4.2 視覺層次

#### 對比度標準
- 主文字: WCAG AA 4.5:1
- 大文字: WCAG AA 3:1
- UI 元素: WCAG AA 3:1

#### 資訊優先級
1. **主要**: 計時器數字、當前狀態
2. **次要**: 統計數據、進度條
3. **輔助**: 說明文字、提示

### 4.3 錯誤處理

#### 空狀態設計
```
[圖示] 🏺 空寶箱
[標題] 還沒有完成任何任務
[說明] 開始你的第一次專注吧！
[按鈕] 開始冒險
```

#### 網路錯誤
```
[圖示] 📡
[標題] 連線中斷
[說明] 請檢查網路連線
[按鈕] 重試
```

#### 載入狀態
- Skeleton Screen: 卡片/列表
- Spinner: 按鈕內載入
- 進度條: 資料同步

---

## 5. 動態反饋系統

### 5.1 微互動 (Micro-interactions)

#### 按鈕反饋
- 點擊: 縮小 → 回彈
- 成功: 綠色勾號滑入
- 失敗: 紅色震動

#### 計時器狀態
- 倒數中: 數字緩慢縮放脈動
- 最後1分鐘: 紅色閃爍加速
- 完成: 爆炸動畫 + 音效提示

#### 金幣獲得
1. 金幣從怪物掉落
2. 飛向畫面頂部金幣數字
3. 數字放大 + 彈跳
4. 金幣 +10 浮動顯示

### 5.2 慶祝動畫

#### 完成番茄鐘
```
1. 勇者勝利動作 (0.5s)
2. 金幣掉落動畫 (0.5s)
3. 經驗值增加動畫 (0.5s)
4. Toast 通知: "勝利！獲得 10 金幣"
```

#### 升級動畫
```
1. 全螢幕金色光芒擴散
2. "LEVEL UP!" 文字放大
3. 新等級數字旋轉出現
4. 解鎖獎勵卡片彈出
```

### 5.3 音效反饋 (可選)

- 開始計時: 劍出鞘音效
- 完成: 勝利號角
- 獲得金幣: 叮噹聲
- 升級: 史詩音樂
- 按鈕點擊: 輕微咔噠聲

---

這份設計系統將作為所有頁面設計的基礎規範,確保整個 App 的視覺一致性與使用體驗。
