# 🚀 啟動應用程式 - 使用新設計

這份指南將幫助你啟動應用程式並查看新的遊戲化設計。

## 📋 前置需求

確保你已經安裝：
- ✅ Node.js 18 或更高版本
- ✅ npm 9 或更高版本
- ✅ Android Studio (Android 開發) 或 Xcode (iOS 開發)
- ✅ Java Development Kit (JDK) 17 (Android)

## 🎯 快速啟動步驟

### 方法一：Android 設備/模擬器（推薦）

#### 1. 安裝依賴套件
```bash
cd /Users/lijunsheng/Documents/軟工/finalproject
npm install
```

#### 2. 啟動 Metro Bundler
在終端機中執行：
```bash
npm start
```
或
```bash
npx react-native start
```

這會啟動 Metro bundler，你會看到類似這樣的輸出：
```
               ######                ######               
             ###     ####        ####     ###             
            ##          ###    ###          ##           
            ##             ####             ##           
            ##             ####             ##           
            ##           ##    ##           ##           
            ##         ###      ###         ##           
             ##  ########################  ##            
          ######    ###            ###    ######         
      ###     ##    ##              ##    ##     ###     
   ###         ## ###      ####      ### ##         ###  
  ##           ####      ########      ####           ##
 ##             ###     ##########     ###             ##
  ##           ####      ########      ####           ##
   ###         ## ###      ####      ### ##         ###  
      ###     ##    ##              ##    ##     ###     
          ######    ###            ###    ######         
             ##  ########################  ##            
            ##         ###      ###         ##           
            ##           ##    ##           ##           
            ##             ####             ##           
            ##             ####             ##           
            ##          ###    ###          ##           
             ###     ####        ####     ###             
               ######                ######               


                  Welcome to Metro!
              Fast - Scalable - Integrated


To reload the app press "r"
To open developer menu press "d"
```

#### 3. 在另一個終端機視窗中啟動 Android
```bash
npm run android
```
或
```bash
npx react-native run-android
```

### 方法二：iOS 設備/模擬器 (僅限 macOS)

⚠️ **注意**：iOS 開發需要額外的設置，如果遇到 Ruby gem 問題，建議先使用 Android 測試。

#### 1. 安裝依賴套件
```bash
cd /Users/lijunsheng/Documents/軟工/finalproject
npm install
```

#### 2. 安裝 CocoaPods（如果尚未安裝）

**方法 A：使用 Homebrew（推薦）**
```bash
# 安裝 Homebrew（如果尚未安裝）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安裝 Ruby
brew install ruby

# 安裝 CocoaPods
sudo gem install cocoapods
```

**方法 B：使用系統 Ruby（可能遇到兼容性問題）**
```bash
sudo gem install cocoapods
```

#### 3. 安裝 iOS 依賴 (CocoaPods)

**重要**：iOS 項目在 `PomodoroDungeon` 子目錄中

```bash
# 切換到 PomodoroDungeon 目錄
cd PomodoroDungeon/ios

# 安裝 pods
pod install

# 返回根目錄
cd ../..
```

#### 4. 啟動 Metro Bundler
```bash
npm start
```

#### 5. 在另一個終端機視窗中啟動 iOS

**注意**：需要在 `PomodoroDungeon` 目錄下運行，或使用完整路徑：

```bash
# 方法一：在根目錄運行（推薦）
cd /Users/lijunsheng/Documents/軟工/finalproject
npm run ios

# 方法二：在 PomodoroDungeon 目錄運行
cd PomodoroDungeon
npm run ios
```

## 🎨 新設計特色

啟動後，你將看到以下新設計元素：

### ✨ 視覺特色
- 🌑 **深紫色地牢主題背景** - 營造冒險氛圍
- 💜 **紫色邊框和光暈效果** - 半透明卡片設計
- 🎮 **遊戲化元素**：
  - 🐉 地牢怪物 (專注模式)
  - 🚶 英雄角色行走動畫
  - 🧘 休息模式角色

### 🎯 功能亮點
- **模式選擇器** - 專注模式 / 休息時間切換
- **動態計時器** - 大號數字顯示，階段顏色變化
- **進度條** - 視覺化進度追蹤
- **統計卡片** - 今日完成、專注時間、冒險等級
- **成就系統** - 總計成就展示

### 🎨 顏色系統
- **專注模式**：紅色到橙色漸變 (#DC2626 → #EA580C)
- **休息模式**：綠色漸變 (#059669 → #10B981)
- **背景**：深紫色 (#0F172A)
- **卡片**：半透明深色背景 + 紫色邊框

## 🔧 疑難排解

### 問題 1: `npm install` 失敗
```bash
# 清除快取並重新安裝
rm -rf node_modules
rm package-lock.json
npm install
```

### 問題 2: Metro Bundler 無法啟動 - 端口被占用

**錯誤訊息**: `EADDRINUSE: address already in use :::8081`

這表示端口 8081 已被占用，通常是之前的 Metro bundler 還在運行。

#### 解決方法：

**方法一：關閉占用端口的進程（推薦）**
```bash
# 1. 查找占用端口的進程
lsof -ti:8081

# 2. 關閉該進程（將 PID 替換為上一步找到的數字）
kill -9 <PID>

# 或直接一行命令關閉
kill -9 $(lsof -ti:8081)
```

**方法二：使用不同端口**
```bash
# 使用 8082 端口啟動
npx react-native start --port 8082
```

**方法三：清除 Metro 快取並重啟**
```bash
# 清除 Metro 快取
npx react-native start --reset-cache
```

### 問題 3: iOS - Ruby Gem 安裝失敗

**錯誤訊息**: `Gem::Ext::BuildError: ERROR: Failed to build gem native extension`

這是因為系統 Ruby 版本與 Xcode SDK 不兼容。

#### 解決方法：

**方法一：使用 Homebrew Ruby（推薦）**
```bash
# 1. 安裝 Homebrew（如果尚未安裝）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. 安裝 Ruby
brew install ruby

# 3. 更新 PATH（將以下行添加到 ~/.zshrc 或 ~/.bash_profile）
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 4. 安裝 CocoaPods
gem install cocoapods

# 5. 安裝 iOS 依賴
cd PomodoroDungeon/ios
pod install
cd ../..
```

**方法二：跳過 gem 安裝，直接使用 pod**
```bash
# 如果 CocoaPods 已全局安裝
cd PomodoroDungeon/ios
pod install --repo-update
cd ../..
```

**方法三：使用 Android 測試（最簡單）**
如果 iOS 設置遇到困難，建議先使用 Android 測試新設計：
```bash
npm start
# 在另一個終端
npm run android
```

### 問題 4: Android 構建失敗
```bash
# 清理 Android 構建
cd android
./gradlew clean
cd ..
npm run android
```

### 問題 5: 找不到設備
- **Android**: 確保 Android 模擬器正在運行，或設備已連接並啟用 USB 調試
- **iOS**: 確保 Xcode 已安裝，並且 iOS 模擬器可用

### 問題 6: 依賴套件錯誤
```bash
# 更新所有依賴
npm update
# 或重新安裝
rm -rf node_modules
npm install
```

## 📱 開發者選單

在應用程式運行時，你可以使用開發者選單：

### Android
- 搖動設備，或
- 按 `Cmd + M` (Mac) 或 `Ctrl + M` (Windows/Linux)

### iOS
- 搖動設備，或
- 按 `Cmd + D` (Mac)

### 開發者選單選項
- **Reload** - 重新載入應用程式
- **Debug** - 開啟除錯模式
- **Show Inspector** - 顯示元素檢查器
- **Enable Hot Reloading** - 啟用熱重載

## 🎯 快速測試新設計

啟動應用程式後，你可以：

1. **查看主畫面**
   - 深紫色背景
   - 模式選擇器（專注/休息）
   - 計時器卡片

2. **測試計時器**
   - 點擊「開始」按鈕
   - 觀察英雄角色行走動畫
   - 查看進度條更新

3. **查看統計**
   - 滾動到統計區域
   - 查看今日專注時間卡片
   - 查看成就卡片

4. **切換模式**
   - 點擊「休息時間」按鈕
   - 觀察顏色變化（綠色主題）

## 📝 注意事項

- ⚠️ 首次啟動可能需要較長時間（構建和安裝）
- ⚠️ 確保設備/模擬器有足夠的儲存空間
- ⚠️ 如果遇到問題，查看終端機的錯誤訊息
- ⚠️ **iOS 開發較複雜，建議先使用 Android 測試**

## 🎉 完成！

如果一切正常，你應該能看到：
- ✅ 深紫色地牢主題背景
- ✅ 遊戲化的計時器介面
- ✅ 角色和怪物動畫
- ✅ 美觀的統計卡片

享受你的新設計！🎮✨

---

## 💡 推薦流程

**對於初次使用：**
1. ✅ 使用 **Android** 測試（最簡單）
2. ✅ 確認新設計正常顯示
3. ✅ 如需 iOS，再進行 iOS 環境設置

**Android 快速啟動：**
```bash
cd /Users/lijunsheng/Documents/軟工/finalproject
npm install
npm start
# 在另一個終端
npm run android
```

---

**需要幫助？** 查看：
- [Start_here.md](Start_here.md) - 專案總覽
- [docs/SETUP.md](docs/SETUP.md) - 詳細設置指南
- [RUN_STATUS.md](RUN_STATUS.md) - 運行狀態說明
