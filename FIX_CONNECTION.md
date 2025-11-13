# 🔧 修復「無法連接到開發服務器」錯誤

## 問題描述

當你看到 "Could not connect to development server" 錯誤時，通常是因為 Metro bundler 沒有運行或無法連接。

## ✅ 快速解決方案

### 步驟 1: 啟動 Metro Bundler

在終端中執行：

```bash
cd /Users/lijunsheng/Documents/軟工/finalproject/PomodoroDungeon
npx react-native start
```

或

```bash
npm start
```

**重要**：保持這個終端窗口打開，不要關閉！

### 步驟 2: 設置端口轉發（Android 模擬器）

在**另一個終端窗口**中執行：

```bash
cd /Users/lijunsheng/Documents/軟工/finalproject/PomodoroDungeon
adb reverse tcp:8081 tcp:8081
```

### 步驟 3: 重新加載應用

在 Android 模擬器中：
1. 搖動設備（或按 `Cmd + M`）
2. 選擇 **"Reload"** 或按 `R, R`

或者直接重新運行應用：

```bash
cd /Users/lijunsheng/Documents/軟工/finalproject/PomodoroDungeon
npx react-native run-android
```

## 🔍 詳細故障排除

### 檢查 1: Metro Bundler 是否運行

```bash
# 檢查端口 8081 是否被占用
lsof -ti:8081

# 如果沒有輸出，說明 Metro 沒有運行
```

### 檢查 2: Android 設備連接

```bash
# 檢查設備是否連接
adb devices

# 應該看到類似：
# List of devices attached
# emulator-5554    device
```

### 檢查 3: 端口轉發

```bash
# 設置端口轉發（Android 模擬器）
adb reverse tcp:8081 tcp:8081

# 驗證轉發
adb reverse --list
```

### 檢查 4: 清除緩存並重啟

如果問題持續存在：

```bash
# 1. 停止所有 Metro bundler
kill -9 $(lsof -ti:8081)

# 2. 清除 Metro 緩存
cd /Users/lijunsheng/Documents/軟工/finalproject/PomodoroDungeon
npx react-native start --reset-cache

# 3. 在另一個終端重新運行應用
npx react-native run-android
```

## 🎯 完整啟動流程

### 方法一：分步啟動（推薦）

**終端 1 - Metro Bundler：**
```bash
cd /Users/lijunsheng/Documents/軟工/finalproject/PomodoroDungeon
npm start
```

**終端 2 - 設置端口轉發：**
```bash
cd /Users/lijunsheng/Documents/軟工/finalproject/PomodoroDungeon
adb reverse tcp:8081 tcp:8081
```

**終端 3 - 運行應用：**
```bash
cd /Users/lijunsheng/Documents/軟工/finalproject/PomodoroDungeon
npm run android
```

### 方法二：一鍵啟動

```bash
cd /Users/lijunsheng/Documents/軟工/finalproject/PomodoroDungeon

# 啟動 Metro（背景運行）
npx react-native start &

# 設置端口轉發
adb reverse tcp:8081 tcp:8081

# 運行應用
npm run android
```

## ⚠️ 常見問題

### Q: Metro bundler 啟動後立即關閉
**A:** 檢查是否有語法錯誤或依賴問題：
```bash
cd /Users/lijunsheng/Documents/軟工/finalproject/PomodoroDungeon
npm install
npx react-native start --reset-cache
```

### Q: 端口已被占用
**A:** 關閉占用端口的進程：
```bash
kill -9 $(lsof -ti:8081)
```

### Q: 應用顯示空白屏幕
**A:** 檢查 Metro bundler 終端的錯誤訊息，通常是代碼錯誤。

### Q: 物理設備無法連接
**A:** 
1. 確保 USB 調試已啟用
2. 運行 `adb devices` 確認設備被識別
3. 如果是同一 Wi-Fi 網絡，在開發者設置中設置服務器地址

## 📱 開發者菜單快捷鍵

- **Android 模擬器**: `Cmd + M` (Mac) 或 `Ctrl + M` (Windows/Linux)
- **Android 物理設備**: 搖動設備
- **iOS 模擬器**: `Cmd + D` (Mac)
- **iOS 物理設備**: 搖動設備

## 🎉 成功標誌

當一切正常時，你應該看到：

1. ✅ Metro bundler 終端顯示 "Metro waiting on..."
2. ✅ 應用正常啟動，沒有錯誤屏幕
3. ✅ 可以看到新的遊戲化設計界面

---

**如果問題仍然存在**，請檢查：
- Metro bundler 終端的完整錯誤訊息
- Android Studio 的 Logcat 輸出
- 網絡連接是否正常

