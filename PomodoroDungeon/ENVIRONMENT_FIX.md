# 🔧 環境設置問題修復指南

## 📋 問題清單

根據 `npx react-native doctor` 檢查結果，需要修復以下問題：

1. ❌ **Java 版本錯誤** - 當前 Java 23，需要 Java 17-20
2. ❌ **Android SDK 未安裝**
3. ❌ **ANDROID_HOME 環境變數未設置**
4. ❌ **adb 命令不可用**
5. ❌ **CocoaPods 未安裝**（iOS）

---

## 🚀 快速修復（自動化腳本）

### 方法 1: 使用自動化腳本（推薦）

```bash
cd PomodoroDungeon
./FIX_ENVIRONMENT.sh
```

這個腳本會自動：
- ✅ 安裝 Java 17
- ✅ 設置 JAVA_HOME
- ✅ 檢查 Android Studio 和 Android SDK
- ✅ 設置 ANDROID_HOME 環境變數
- ✅ 驗證 adb 命令
- ✅ 安裝 CocoaPods（如果需要）

---

## 📝 手動修復步驟

### 步驟 1: 安裝 Java 17

```bash
# 安裝 Java 17
brew install openjdk@17

# 設置 JAVA_HOME（臨時）
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# 驗證版本
java -version
# 應該顯示: openjdk version "17.x.x"
```

**永久設置**（添加到 `~/.zshrc`）:
```bash
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
source ~/.zshrc
```

---

### 步驟 2: 安裝 Android Studio 和 Android SDK

#### 2.1 下載並安裝 Android Studio

1. 訪問: https://developer.android.com/studio
2. 下載 macOS 版本
3. 安裝應用程式

#### 2.2 安裝 Android SDK

1. **打開 Android Studio**
   - 首次啟動會自動下載一些組件
   - 選擇 "Standard" 安裝

2. **打開 SDK Manager**
   - Android Studio → "More Actions" → "SDK Manager"
   - 或: Preferences → Appearance & Behavior → System Settings → Android SDK

3. **安裝 SDK Platforms**
   - 切換到 "SDK Platforms" 標籤
   - 勾選 "Show Package Details"
   - 選擇:
     - ✅ Android 13.0 (Tiramisu) - API Level 33
     - ✅ Android SDK Platform 33

4. **安裝 SDK Tools**
   - 切換到 "SDK Tools" 標籤
   - 勾選 "Show Package Details"
   - 選擇:
     - ✅ Android SDK Build-Tools 33.0.0
     - ✅ Android SDK Platform-Tools (**重要**: 包含 adb)
     - ✅ Android Emulator
     - ✅ Android SDK Command-line Tools (latest)

5. **安裝**
   - 點擊 "Apply"
   - 等待下載和安裝完成（可能需要 10-30 分鐘）

---

### 步驟 3: 設置環境變數

編輯 `~/.zshrc`:

```bash
nano ~/.zshrc
```

添加以下內容：

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

保存並退出（Ctrl+X, Y, Enter），然後重新載入：

```bash
source ~/.zshrc
```

---

### 步驟 4: 驗證安裝

```bash
# 檢查 Java 版本
java -version
# 應該顯示: openjdk version "17.x.x"

# 檢查 JAVA_HOME
echo $JAVA_HOME
# 應該指向 Java 17 的路徑

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

### 步驟 5: 安裝 CocoaPods（如果需要 iOS 開發）

```bash
# 安裝 CocoaPods
sudo gem install cocoapods

# 驗證安裝
pod --version
# 應該顯示版本號

# 如果遇到權限問題，使用 Homebrew 安裝 Ruby
brew install ruby
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
sudo gem install cocoapods
```

---

## ✅ 驗證環境

運行 React Native Doctor 檢查：

```bash
cd PomodoroDungeon
npx react-native doctor
```

應該看到：

```
Common
 ✓ Node.js
 ✓ npm
 ✓ Watchman
 ✓ Metro

Android
 ✓ Adb
 ✓ JDK (版本應該是 17.x.x)
 ✓ Android Studio
 ✓ ANDROID_HOME
 ✓ Android SDK

iOS
 ✓ Xcode
 ✓ Ruby
 ✓ CocoaPods
 ✓ .xcode.env
```

---

## 🔧 故障排除

### 問題 1: Java 版本仍然是 23

**解決方案**:
```bash
# 檢查所有 Java 版本
/usr/libexec/java_home -V

# 強制設置 Java 17
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
java -version

# 如果還是不行，檢查 PATH
echo $PATH
# 確保 /usr/libexec 在 PATH 中
```

### 問題 2: ANDROID_HOME 未設置

**解決方案**:
```bash
# 檢查 Android SDK 是否存在
ls ~/Library/Android/sdk

# 如果不存在，檢查其他可能的位置
ls ~/Android/Sdk
ls /Users/$(whoami)/Library/Android/sdk

# 設置正確的路徑
export ANDROID_HOME=$HOME/Library/Android/sdk
# 或
export ANDROID_HOME=$HOME/Android/Sdk
```

### 問題 3: adb 命令不可用

**解決方案**:
```bash
# 檢查 platform-tools 是否存在
ls $ANDROID_HOME/platform-tools

# 如果不存在，在 Android Studio 中安裝 Android SDK Platform-Tools
# 然後重新設置 PATH
export PATH=$PATH:$ANDROID_HOME/platform-tools

# 驗證
adb version
```

### 問題 4: CocoaPods 安裝失敗

**解決方案**:
```bash
# 使用 Homebrew 安裝 Ruby
brew install ruby

# 設置 PATH
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"

# 安裝 CocoaPods
gem install cocoapods

# 如果還是不行，使用 rbenv
brew install rbenv
rbenv install 3.2.0
rbenv global 3.2.0
gem install cocoapods
```

---

## 📝 檢查清單

完成後，確認以下項目：

- [ ] Java 17 已安裝
- [ ] Java 17 已設置為預設版本
- [ ] JAVA_HOME 環境變數已設置
- [ ] Android Studio 已安裝
- [ ] Android SDK 已安裝（API Level 33）
- [ ] Android SDK Platform-Tools 已安裝（包含 adb）
- [ ] ANDROID_HOME 環境變數已設置
- [ ] PATH 已包含 Android SDK 路徑
- [ ] adb 命令可用
- [ ] CocoaPods 已安裝（如果需要 iOS 開發）

---

## 🎉 完成後

環境設置完成後，可以運行：

```bash
cd PomodoroDungeon

# 檢查環境
npx react-native doctor

# 運行 Android 應用程式
npm run android
```

---

**修復時間**: 約 30-60 分鐘（取決於網路速度）  
**難度**: ⭐⭐⭐ 中等

