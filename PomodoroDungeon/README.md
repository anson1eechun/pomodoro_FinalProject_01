# 🍅 Pomodoro Dungeon App

一個結合遊戲化學習的番茄鐘應用程式，專為學生設計。

## 📱 可以在 Android 手機上使用！

是的，這個應用程式完全支援 Android 手機。請按照以下步驟操作。

---

## ⚠️ 重要：安裝必要的工具

在運行應用程式之前，你需要安裝以下工具：

1. **Java 17** - 目前缺少（你使用的是 Java 23）
2. **Android Studio** - 目前缺少
3. **Android SDK** - 目前缺少
4. **環境變數設置** - 目前缺少

**詳細安裝指南**: 請參考 [INSTALL_GUIDE.md](INSTALL_GUIDE.md) 或 [SETUP_SUMMARY.md](SETUP_SUMMARY.md)

---

## 🚀 快速開始（Android 手機）

### ⚠️ 重要：先安裝必要的工具

你目前缺少以下項目：

**快速修復**:
```bash
# 1. 安裝 Java 17
brew install openjdk@17

# 2. 設置 JAVA_HOME
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# 3. 驗證
java -version  # 應該顯示 java version "17.x.x"
```

**永久設置**（添加到 `~/.zshrc`）:
```bash
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
source ~/.zshrc
```

詳細說明請參考: [FIX_JAVA.md](FIX_JAVA.md)

---

### 步驟 1: 準備 Android 手機

1. **啟用開發者選項**
   - 設定 → 關於手機 → 連續點擊「版本號碼」7 次

2. **啟用 USB 偵錯**
   - 設定 → 開發者選項 → 啟用「USB 偵錯」

3. **連接手機**
   - 用 USB 線連接手機和電腦
   - 手機上點擊「允許 USB 偵錯」

### 步驟 2: 檢查連接

```bash
cd PomodoroDungeon
adb devices
```

應該看到你的設備列表。

### 步驟 3: 運行應用程式

```bash
# 終端 1: 啟動 Metro Bundler
npm start

# 終端 2: 運行 Android 應用程式
npm run android
```

應用程式會自動安裝到手機並啟動！

---

## 📚 詳細文件

- 📱 [QUICK_START_ANDROID.md](QUICK_START_ANDROID.md) - Android 快速開始指南
- 🔧 [FIX_JAVA.md](FIX_JAVA.md) - 修復 Java 版本問題
- 📋 [ANDROID_SETUP.md](ANDROID_SETUP.md) - 完整 Android 設置指南
- ✅ [INTEGRATION_COMPLETE.md](INTEGRATION_COMPLETE.md) - 專案整合說明

---

## 🎯 核心功能

- ✅ 25分鐘專注計時器
- ✅ 5分鐘短休息 / 15分鐘長休息
- ✅ 開始/暫停/繼續/停止控制
- ✅ 背景計時支援
- ✅ 視覺化進度顯示
- ✅ 完成時推播通知
- ✅ 本地儲存歷史記錄
- ✅ 統計資料追蹤
- ✅ 金幣獎勵系統

---

## 🔧 技術棧

- React Native 0.73.0
- React 18.2.0
- TypeScript 5.0.4
- Context API (狀態管理)
- AsyncStorage (本地儲存)
- BackgroundTimer (背景計時)
- Push Notification (本地通知)

---

## ⚠️ 常見問題

### Java 版本錯誤
**錯誤**: `Unsupported class file major version 67`  
**解決**: 安裝並切換到 Java 17，參考 [FIX_JAVA.md](FIX_JAVA.md)

### 設備未找到
**錯誤**: `adb devices` 顯示空列表  
**解決**: 檢查 USB 連接，確認已啟用 USB 偵錯

### 構建失敗
**解決**: 
```bash
cd android
./gradlew clean
cd ..
npm run android
```

---

## 📝 開發指令

```bash
# 啟動 Metro Bundler
npm start

# 運行 Android
npm run android

# 運行 iOS (僅 macOS)
npm run ios

# 程式碼檢查
npm run lint
```

---

## 🎉 開始使用

1. ✅ 修復 Java 版本（參考 [FIX_JAVA.md](FIX_JAVA.md)）
2. ✅ 準備 Android 手機（啟用 USB 偵錯）
3. ✅ 運行 `npm run android`

詳細步驟請參考 [QUICK_START_ANDROID.md](QUICK_START_ANDROID.md)

---

**專案版本**: v0.1.0-MVP  
**狀態**: ✅ 可以運行，需要 Java 17
