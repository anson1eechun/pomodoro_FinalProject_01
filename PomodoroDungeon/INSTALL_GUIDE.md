# 📦 完整安裝指南

## 🎯 目標

安裝所有必要的工具，讓你可以Android手機上運行 Pomodoro Dungeon App。

---

## 📋 需要安裝的項目

1. ✅ **Java 17** - React Native 需要
2. ✅ **Android Studio** - Android 開發工具
3. ✅ **Android SDK** - Android 開發套件
4. ✅ **環境變數設置** - ANDROID_HOME, PATH

---

## 🔧 步驟 1: 安裝 Java 17

### 使用 Homebrew 安裝

```bash
# 1. 安裝 Java 17
brew install openjdk@17

# 2. 設置 JAVA_HOME（臨時）
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# 3. 驗證安裝
java -version
# 應該顯示: openjdk version "17.x.x"
```

### 永久設置

```bash
# 編輯配置文件
nano ~/.zshrc

# 添加這一行
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# 保存並退出 (Ctrl+X, Y, Enter)

# 重新載入
source ~/.zshrc
```

---

## 📱 步驟 2: 安裝 Android Studio

### 下載並安裝

1. **下載 Android Studio**
   - 訪問: https://developer.android.com/studio
   - 下載 macOS 版本
   - 安裝應用程式

2. **首次啟動設置**
   - 打開 Android Studio
   - 選擇 "Standard" 安裝
   - 等待下載完成

### 安裝 Android SDK

1. **打開 SDK Manager**
   - Android Studio → "More Actions" → "SDK Manager"
   - 或: Preferences → Appearance & Behavior → System Settings → Android SDK

2. **安裝 SDK Platforms**
   - 切換到 "SDK Platforms" 標籤
   - 勾選 "Show Package Details"
   - 選擇:
     - ✅ Android 13.0 (Tiramisu) - API Level 33
     - ✅ Android SDK Platform 33

3. **安裝 SDK Tools**
   - 切換到 "SDK Tools" 標籤
   - 勾選 "Show Package Details"
   - 選擇:
     - ✅ Android SDK Build-Tools 33.0.0
     - ✅ Android Emulator
     - ✅ Android SDK Platform-Tools (**重要**: 包含 adb)
     - ✅ Android SDK Command-line Tools (latest)
     - ✅ Intel x86 Emulator Accelerator (HAXM installer) - 如果使用 Intel Mac

4. **安裝**
   - 點擊 "Apply"
   - 等待下載和安裝完成

---

## 🔐 步驟 3: 設置環境變數

### 編輯配置文件

```bash
# 打開配置文件
nano ~/.zshrc
```

### 添加以下內容

```bash
# Java 17
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# Android SDK
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

### 保存並載入

```bash
# 保存並退出 (Ctrl+X, Y, Enter)

# 重新載入配置
source ~/.zshrc
```

---

## ✅ 步驟 4: 驗證安裝

### 檢查 Java

```bash
java -version
# 應該顯示: openjdk version "17.x.x"
```

### 檢查 Android SDK

```bash
# 檢查 ANDROID_HOME
echo $ANDROID_HOME
# 應該顯示: /Users/你的用戶名/Library/Android/sdk

# 檢查 SDK 目錄
ls $ANDROID_HOME
# 應該看到: platforms, platform-tools, tools, build-tools 等

# 檢查 adb
adb version
# 應該顯示: Android Debug Bridge version x.x.x
```

### 檢查 React Native 環境

```bash
cd PomodoroDungeon
npx react-native doctor
```

這個命令會檢查所有必要的環境設置。

---

## 📱 步驟 5: 準備 Android 手機

### 啟用開發者選項

1. 打開手機「設定」
2. 找到「關於手機」或「關於裝置」
3. 連續點擊「版本號碼」7 次
4. 會看到「您已成為開發人員」的提示

### 啟用 USB 偵錯

1. 返回「設定」
2. 找到「開發者選項」（通常在「系統」或「進階」下）
3. 啟用「USB 偵錯」
4. 啟用「USB 安裝」（可選）

### 連接手機

1. 使用 USB 線連接手機和電腦
2. 手機上會出現「允許 USB 偵錯」提示
3. 勾選「一律允許這部電腦」
4. 點擊「允許」

### 檢查連接

```bash
adb devices
```

應該看到你的設備：
```
List of devices attached
ABC123XYZ    device
```

---

## 🚀 步驟 6: 運行應用程式

```bash
cd PomodoroDungeon

# 終端 1: 啟動 Metro Bundler
npm start

# 終端 2: 運行 Android 應用程式
npm run android
```

應用程式會自動：
- 編譯並構建 APK
- 安裝到你的手機
- 自動啟動

---

## 🔧 故障排除

### 問題 1: `adb: command not found`

**原因**: Android SDK 未安裝或 PATH 未設置

**解決方案**:
```bash
# 檢查 ANDROID_HOME
echo $ANDROID_HOME

# 如果為空，設置環境變數（參考步驟 3）
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools

# 驗證
adb version
```

### 問題 2: Java 版本錯誤

**錯誤**: `Unsupported class file major version 67`

**解決方案**:
```bash
# 確保使用 Java 17
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
java -version

# 清理 Gradle 快取
cd android
./gradlew clean
cd ..
```

### 問題 3: Android SDK 未找到

**解決方案**:
1. 確認 Android Studio 已安裝
2. 確認 SDK 已下載（在 SDK Manager 中檢查）
3. 確認 ANDROID_HOME 環境變數正確

### 問題 4: 設備未找到

**解決方案**:
```bash
# 檢查設備
adb devices

# 如果顯示 "unauthorized"
# 1. 在手機上確認 USB 偵錯授權
# 2. 重新連接 USB 線
# 3. 檢查 USB 線是否支援資料傳輸
```

---

## 📝 檢查清單

安裝完成後，確認：

- [ ] Java 17 已安裝
- [ ] Java 17 已設置為預設版本
- [ ] Android Studio 已安裝
- [ ] Android SDK 已安裝（API Level 33）
- [ ] Android SDK Platform-Tools 已安裝（包含 adb）
- [ ] ANDROID_HOME 環境變數已設置
- [ ] PATH 已包含 Android SDK 路徑
- [ ] adb 命令可用
- [ ] Android 手機已連接
- [ ] USB 偵錯已啟用
- [ ] `adb devices` 可以找到設備

---

## 🎉 完成！

安裝完成後，你就可以在 Android 手機上運行應用程式了！

**下一步**: 參考 [QUICK_START_ANDROID.md](QUICK_START_ANDROID.md) 開始使用

---

**安裝時間**: 約 30-60 分鐘（取決於網路速度）  
**難度**: ⭐⭐⭐ 中等

