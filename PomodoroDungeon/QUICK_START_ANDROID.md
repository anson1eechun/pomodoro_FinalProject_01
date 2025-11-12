# 📱 Android 手機快速使用指南

## ✅ 是的，可以在 Android 手機上使用！

這個應用程式完全支援 Android 手機。以下是詳細的使用步驟。

---

## 🚀 快速開始（3 步驟）

### 步驟 1: 準備你的 Android 手機

1. **啟用開發者選項**
   - 打開手機「設定」
   - 找到「關於手機」或「關於裝置」
   - 連續點擊「版本號碼」7 次
   - 會看到「您已成為開發人員」的提示

2. **啟用 USB 偵錯**
   - 返回「設定」
   - 找到「開發者選項」（通常在「系統」或「進階」下）
   - 啟用「USB 偵錯」
   - 啟用「USB 安裝」（可選，方便安裝）

3. **連接手機到電腦**
   - 使用 USB 線連接手機和電腦
   - 手機上會出現「允許 USB 偵錯」提示
   - 勾選「一律允許這部電腦」
   - 點擊「允許」

### 步驟 2: 修復 Java 版本問題

**問題**: 你目前使用的是 Java 23，但 React Native 需要 Java 17

**解決方案**:

```bash
# 1. 安裝 Java 17
brew install openjdk@17

# 2. 設置 JAVA_HOME（臨時）
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# 3. 驗證版本
java -version  # 應該顯示 java version "17.x.x"
```

**永久設置**（在 `~/.zshrc` 或 `~/.bash_profile` 中添加）:
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

然後重新載入：
```bash
source ~/.zshrc
```

### 步驟 3: 運行應用程式

```bash
cd PomodoroDungeon

# 1. 啟動 Metro Bundler（在一個終端視窗）
npm start

# 2. 在另一個終端視窗運行 Android 應用程式
npm run android
```

應用程式會自動：
- 編譯並構建 APK
- 安裝到你的手機
- 自動啟動

---

## 🔧 如果遇到問題

### 問題 1: `adb devices` 找不到設備

**解決方案**:
```bash
# 檢查設備連接
adb devices

# 如果顯示 "unauthorized"，在手機上確認 USB 偵錯授權
# 如果沒有設備，檢查 USB 連接和驅動程式
```

### 問題 2: Java 版本錯誤

**錯誤訊息**: `Unsupported class file major version 67`

**解決方案**:
```bash
# 確保使用 Java 17
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
java -version  # 確認是 17.x.x

# 清理 Gradle 快取
cd android
./gradlew clean
cd ..
```

### 問題 3: 構建失敗

**解決方案**:
```bash
# 清理並重新構建
cd android
./gradlew clean
./gradlew assembleDebug
cd ..
```

---

## 📦 生成 APK 檔案（可選）

如果你想生成 APK 檔案直接安裝：

```bash
cd android

# 生成 Debug APK
./gradlew assembleDebug

# APK 位置
# android/app/build/outputs/apk/debug/app-debug.apk
```

然後將 APK 傳輸到手機並安裝。

---

## ✅ 驗證清單

運行前請確認：

- [ ] Java 17 已安裝（不是 Java 23）
- [ ] JAVA_HOME 已設置為 Java 17
- [ ] Android 手機已啟用 USB 偵錯
- [ ] 手機已連接並被 `adb devices` 識別
- [ ] Metro Bundler 已啟動（`npm start`）

---

## 🎉 成功運行後

當應用程式成功安裝並運行後，你會看到：

1. **🍅 番茄鐘計時器**
   - 顯示當前時間（25:00、5:00、15:00）
   - 顯示當前階段（專注時段、短休息、長休息）
   - 顯示進度條

2. **🎮 控制按鈕**
   - ▶ 開始
   - ⏸ 暫停
   - ▶ 繼續
   - ⏹ 停止
   - ⏭ 跳過休息

3. **📊 統計資料**
   - 今日完成番茄數
   - 今日專注時間
   - 總完成番茄數
   - 總專注時間
   - 連續天數
   - 總獲得金幣

---

## 💡 使用提示

1. **首次運行較慢**: 第一次構建需要下載依賴和編譯，可能需要 5-10 分鐘
2. **保持 USB 連接**: 開發時建議保持 USB 連接
3. **熱重載**: 修改程式碼後，搖動手機打開開發選單，選擇「Reload」
4. **通知功能**: 完成番茄鐘時會收到通知（需要授予通知權限）

---

## 📝 詳細說明

更多詳細資訊請參考：
- `ANDROID_SETUP.md` - 完整的 Android 設置指南
- `INTEGRATION_COMPLETE.md` - 專案整合說明

---

**準備好了嗎？** 按照上述步驟，你的 Android 手機就可以運行這個應用程式了！🚀

