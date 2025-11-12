# ⚡ 快速修復環境問題

## 🚀 一鍵修復（推薦）

```bash
cd PomodoroDungeon
./FIX_ENVIRONMENT.sh
```

---

## 📋 手動修復（5 步驟）

### 1. 安裝 Java 17

```bash
brew install openjdk@17
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
```

### 2. 安裝 Android Studio

1. 下載: https://developer.android.com/studio
2. 安裝應用程式
3. 打開 Android Studio → SDK Manager
4. 安裝:
   - Android SDK Platform 33
   - Android SDK Build-Tools 33.0.0
   - Android SDK Platform-Tools (包含 adb)
   - Android Emulator

### 3. 設置環境變數

```bash
nano ~/.zshrc
```

添加：
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

保存並載入：
```bash
source ~/.zshrc
```

### 4. 驗證

```bash
java -version    # 應該是 17.x.x
echo $ANDROID_HOME  # 應該有路徑
adb version      # 應該顯示版本
```

### 5. 安裝 CocoaPods（可選）

```bash
sudo gem install cocoapods
```

---

## ✅ 完成後

```bash
cd PomodoroDungeon
npx react-native doctor
npm run android
```

詳細說明請參考: [ENVIRONMENT_FIX.md](ENVIRONMENT_FIX.md)
