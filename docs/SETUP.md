# 🛠️ 環境設置指南

本文件將引導你完成 Pomodoro Dungeon App 的開發環境設置。

## 系統需求

### 必要工具

#### 1. Node.js 和 npm
```bash
# 檢查版本
node --version  # 需要 v18 或更高
npm --version   # 需要 v9 或更高

# 安裝 Node.js (使用 nvm 推薦)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### 2. Watchman (可選,但推薦)
```bash
# macOS
brew install watchman

# Linux
# 請參考官方文件: https://facebook.github.io/watchman/docs/install
```

#### 3. Java Development Kit (JDK)
```bash
# 需要 JDK 17

# macOS (使用 Homebrew)
brew install openjdk@17

# Ubuntu/Debian
sudo apt-get install openjdk-17-jdk

# 檢查版本
java -version
```

### Android 開發環境

#### 1. 安裝 Android Studio
1. 下載 [Android Studio](https://developer.android.com/studio)
2. 安裝時確保勾選以下選項:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)

#### 2. 安裝 Android SDK
打開 Android Studio:
1. 點擊 "More Actions" → "SDK Manager"
2. 選擇 "SDK Platforms" 標籤
3. 勾選 "Show Package Details"
4. 安裝以下項目:
   - Android 13.0 (Tiramisu) - API Level 33
   - Android SDK Platform 33
   - Intel x86 Atom_64 System Image 或 Google APIs Intel x86 Atom System Image

5. 選擇 "SDK Tools" 標籤
6. 勾選 "Show Package Details"
7. 安裝以下項目:
   - Android SDK Build-Tools 33.0.0
   - Android Emulator
   - Android SDK Platform-Tools

#### 3. 設定環境變數

**macOS / Linux:**
```bash
# 在 ~/.bash_profile 或 ~/.zshrc 中加入
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# export ANDROID_HOME=$HOME/Android/Sdk       # Linux

export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin

# 重新載入配置
source ~/.bash_profile  # 或 source ~/.zshrc
```

**Windows:**
1. 打開「系統內容」→「進階系統設定」→「環境變數」
2. 新增使用者變數:
   - 變數名稱: `ANDROID_HOME`
   - 變數值: `C:\Users\你的使用者名稱\AppData\Local\Android\Sdk`
3. 編輯 `Path` 變數,新增:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\emulator`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`

#### 4. 驗證 Android 環境
```bash
# 檢查 adb 是否安裝成功
adb version

# 檢查 ANDROID_HOME 是否設定正確
echo $ANDROID_HOME  # macOS/Linux
echo %ANDROID_HOME% # Windows
```

## 專案設置

### 1. Clone 專案
```bash
git clone <repository-url>
cd pomodoro-dungeon-app
```

### 2. 安裝相依套件
```bash
npm install
```

### 3. iOS Pod 安裝 (僅限 macOS)
```bash
cd ios
pod install
cd ..
```

## 執行應用程式

### 1. 啟動 Metro Bundler
```bash
npm start
```

### 2. 執行 Android 應用程式

#### 方法 A: 使用模擬器
```bash
# 列出可用的 AVD
emulator -list-avds

# 啟動模擬器
emulator -avd <AVD_NAME>

# 在另一個終端機執行
npm run android
```

#### 方法 B: 使用實體裝置
1. 在 Android 裝置上啟用「開發人員選項」
2. 啟用「USB 偵錯」
3. 用 USB 連接裝置到電腦
4. 執行:
```bash
# 檢查裝置是否連接
adb devices

# 執行應用程式
npm run android
```

### 3. 執行 iOS 應用程式 (僅限 macOS)
```bash
npm run ios
```

## 開發工具設定

### 1. VS Code 擴充套件推薦
- **ES7+ React/Redux/React-Native snippets** - 程式碼片段
- **ESLint** - 程式碼檢查
- **Prettier** - 程式碼格式化
- **React Native Tools** - React Native 開發工具
- **TypeScript** - TypeScript 支援

### 2. VS Code 設定
在專案根目錄建立 `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### 3. Git Hooks 設定 (可選)
```bash
# 安裝 husky
npm install --save-dev husky

# 設定 pre-commit hook
npx husky install
npx husky add .husky/pre-commit "npm run lint"
```

## 常見問題排解

### 問題 1: Metro Bundler 啟動失敗
```bash
# 清除快取
npm start -- --reset-cache
```

### 問題 2: Android 建置失敗
```bash
# 清除 Gradle 快取
cd android
./gradlew clean
cd ..

# 重新建置
npm run android
```

### 問題 3: 模組找不到錯誤
```bash
# 刪除 node_modules 並重新安裝
rm -rf node_modules
npm install
```

### 問題 4: ADB 裝置未授權
```bash
# 重新啟動 ADB
adb kill-server
adb start-server

# 在裝置上重新授權
```

### 問題 5: Watchman 錯誤
```bash
# 重新啟動 Watchman
watchman watch-del-all
```

## 偵錯技巧

### 1. Chrome DevTools
- 在模擬器中搖晃裝置 (Cmd+D / Ctrl+M)
- 選擇 "Debug"
- 開啟 Chrome: `chrome://inspect`

### 2. React Native Debugger
```bash
# 安裝 React Native Debugger
brew install --cask react-native-debugger  # macOS

# 或下載: https://github.com/jhen0409/react-native-debugger/releases
```

### 3. Flipper (推薦)
1. 下載 [Flipper](https://fbflipper.com/)
2. 安裝並啟動
3. Flipper 會自動偵測執行中的應用程式

### 4. 查看日誌
```bash
# Android 日誌
adb logcat

# 只顯示 React Native 相關日誌
adb logcat *:S ReactNative:V ReactNativeJS:V

# iOS 日誌 (macOS)
xcrun simctl spawn booted log stream --predicate 'process == "PomodoroDungeon"'
```

## 效能分析

### 1. Android Performance Monitor
```bash
# 在模擬器中搖晃裝置
# 選擇 "Show Perf Monitor"
```

### 2. React DevTools Profiler
```bash
# 安裝 React DevTools
npm install -g react-devtools

# 啟動
react-devtools
```

## 建置發布版本

### Android Release Build
```bash
cd android
./gradlew assembleRelease
```

產生的 APK 位置:
```
android/app/build/outputs/apk/release/app-release.apk
```

### iOS Release Build (macOS)
```bash
# 在 Xcode 中
# Product → Archive
```

## 團隊協作建議

### 1. 程式碼風格
- 遵循 ESLint 和 Prettier 規則
- Commit 前執行 `npm run lint`
- 使用有意義的 commit 訊息

### 2. 分支策略
```bash
# 建立功能分支
git checkout -b feature/your-feature-name

# 完成後合併到 develop
git checkout develop
git merge feature/your-feature-name
```

### 3. 定期同步
```bash
# 每天開始工作前
git checkout develop
git pull origin develop
```

## 額外資源

### 官方文件
- [React Native 官方文件](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript 手冊](https://www.typescriptlang.org/docs/)

### 社群資源
- [React Native Community](https://github.com/react-native-community)
- [Stack Overflow - React Native](https://stackoverflow.com/questions/tagged/react-native)

### 學習資源
- [React Native Express](https://www.reactnative.express/)
- [Full Stack Open - React Native](https://fullstackopen.com/en/part10)

---

**需要協助?** 請聯繫技術團隊或在專案 Issues 中提問。

**文件版本:** 1.0  
**最後更新:** 2025-11-12