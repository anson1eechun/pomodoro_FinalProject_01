# ✅ 環境檢查清單

## 🔍 當前狀態檢查

### ❌ 缺少的項目

1. **Java 17** ❌
   - 當前版本: Java 23
   - 需要版本: Java 17
   - 狀態: 未安裝

2. **Android SDK** ❌
   - 狀態: 未安裝
   - 位置: ~/Library/Android/sdk 不存在

3. **adb (Android Debug Bridge)** ❌
   - 狀態: 找不到命令
   - 原因: Android SDK 未安裝

4. **ANDROID_HOME 環境變數** ❌
   - 狀態: 未設置

---

## 📋 完整安裝步驟

### 步驟 1: 安裝 Java 17

```bash
# 安裝 Java 17
brew install openjdk@17

# 設置 JAVA_HOME（臨時）
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# 驗證
java -version
# 應該顯示: java version "17.x.x"
```

**永久設置**（添加到 `~/.zshrc`）:
```bash
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
source ~/.zshrc
```

---

### 步驟 2: 安裝 Android Studio

1. **下載 Android Studio**
   - 訪問: https://developer.android.com/studio
   - 下載並安裝

2. **安裝 Android SDK**
   - 打開 Android Studio
   - 選擇 "More Actions" → "SDK Manager"
   - 在 "SDK Platforms" 標籤:
     - ✅ Android 13.0 (Tiramisu) - API Level 33
     - ✅ Android SDK Platform 33
   - 在 "SDK Tools" 標籤:
     - ✅ Android SDK Build-Tools 33.0.0
     - ✅ Android Emulator
     - ✅ Android SDK Platform-Tools (包含 adb)
     - ✅ Android SDK Command-line Tools
   - 點擊 "Apply" 安裝

---

### 步驟 3: 設置環境變數

編輯 `~/.zshrc` (或 `~/.bash_profile`):

```bash
# 打開配置文件
nano ~/.zshrc

# 添加以下內容
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin

# 保存並退出 (Ctrl+X, Y, Enter)

# 重新載入配置
source ~/.zshrc
```

---

### 步驟 4: 驗證安裝

```bash
# 檢查 Java 版本
java -version
# 應該顯示: java version "17.x.x"

# 檢查 ANDROID_HOME
echo $ANDROID_HOME
# 應該顯示: /Users/你的用戶名/Library/Android/sdk

# 檢查 adb
adb version
# 應該顯示: Android Debug Bridge version x.x.x

# 檢查 Android SDK
ls $ANDROID_HOME
# 應該看到: platforms, platform-tools, tools 等目錄
```

---

## ✅ 驗證清單

運行應用程式前，確認以下項目：

- [ ] Java 17 已安裝並設置
- [ ] Android Studio 已安裝
- [ ] Android SDK 已安裝
- [ ] ANDROID_HOME 環境變數已設置
- [ ] adb 命令可用
- [ ] Android 手機已連接（或模擬器已啟動）
- [ ] USB 偵錯已啟用（手機）

---

## 🚀 安裝完成後

```bash
cd PomodoroDungeon

# 檢查環境
npx react-native doctor

# 運行應用程式
npm run android
```

---

## 📝 詳細說明

- **Java 17 安裝**: 參考 [FIX_JAVA.md](FIX_JAVA.md)
- **Android 設置**: 參考 [ANDROID_SETUP.md](ANDROID_SETUP.md)
- **快速開始**: 參考 [QUICK_START_ANDROID.md](QUICK_START_ANDROID.md)

---

**當前狀態**: ⚠️ 需要安裝 Java 17 和 Android SDK

