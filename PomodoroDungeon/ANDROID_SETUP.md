# 📱 Android 手機使用指南

## 🎯 快速開始

是的！你可以在 Android 手機上使用這個應用程式。有兩種方式：

### 方法 1: 使用 USB 連接（推薦）

### 方法 2: 使用 Android 模擬器

---

## 📋 前置需求

### 1. 開發環境設置

#### Java 版本
- **需要**: JDK 17
- **檢查版本**:
  ```bash
  java -version
  ```
- **如果版本不對，安裝 JDK 17**:
  ```bash
  # macOS (使用 Homebrew)
  brew install openjdk@17
  
  # 設置 JAVA_HOME
  export JAVA_HOME=$(/usr/libexec/java_home -v 17)
  ```

#### Android Studio
- 下載並安裝 [Android Studio](https://developer.android.com/studio)
- 安裝 Android SDK (API Level 33 或更高)
- 設置環境變數:
  ```bash
  # 在 ~/.zshrc 或 ~/.bash_profile 中添加
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/tools/bin
  ```

---

## 🚀 在 Android 手機上運行

### 步驟 1: 準備 Android 手機

1. **啟用開發者選項**
   - 打開「設定」→「關於手機」
   - 連續點擊「版本號碼」7 次
   - 返回「設定」，找到「開發者選項」

2. **啟用 USB 偵錯**
   - 在「開發者選項」中啟用「USB 偵錯」
   - 啟用「USB 安裝」（可選，方便安裝 APK）

3. **連接手機到電腦**
   - 使用 USB 線連接手機和電腦
   - 手機上會出現「允許 USB 偵錯」提示，選擇「允許」

### 步驟 2: 檢查連接

```bash
cd PomodoroDungeon

# 檢查設備是否連接
adb devices
```

你應該看到類似這樣的輸出：
```
List of devices attached
ABC123XYZ    device
```

### 步驟 3: 修復構建問題

#### 問題 1: Java 版本不兼容

**錯誤**: `Unsupported class file major version 67`

**解決方案**:

1. **檢查當前 Java 版本**:
   ```bash
   java -version
   ```

2. **如果版本是 Java 23 或更高，需要切換到 Java 17**:
   ```bash
   # macOS
   brew install openjdk@17
   
   # 設置 JAVA_HOME
   export JAVA_HOME=$(/usr/libexec/java_home -v 17)
   
   # 驗證
   java -version  # 應該顯示 java version "17.x.x"
   ```

3. **永久設置（在 ~/.zshrc 中添加）**:
   ```bash
   export JAVA_HOME=$(/usr/libexec/java_home -v 17)
   ```

#### 問題 2: 專案路徑包含中文字符

**錯誤**: `Invalid character in header content`

**解決方案**:

這可能是因為專案路徑中包含中文字符（"軟工"）。有兩個選擇：

**選項 A: 移動專案到英文路徑**（推薦）
```bash
# 移動到英文路徑
mv /Users/lijunsheng/Documents/軟工/finalproject/PomodoroDungeon \
   ~/Documents/finalproject/PomodoroDungeon

cd ~/Documents/finalproject/PomodoroDungeon
```

**選項 B: 繼續使用當前路徑**（如果問題不嚴重）

### 步驟 4: 配置原生模組

編輯 `android/app/src/main/AndroidManifest.xml`，添加權限：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    
    <!-- 添加通知權限 -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
    
    <!-- 添加背景任務權限 -->
    <uses-permission android:name="android.permission.WAKE_LOCK"/>
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
    
    <application
        android:name=".MainApplication"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="false"
        android:theme="@style/AppTheme">
        
        <!-- ... 其他配置 ... -->
        
    </application>
</manifest>
```

### 步驟 5: 運行應用程式

```bash
cd PomodoroDungeon

# 1. 啟動 Metro Bundler（在一個終端）
npm start

# 2. 在另一個終端運行 Android 應用程式
npm run android
```

應用程式會自動安裝到你的手機上並啟動！

---

## 🔧 故障排除

### 問題 1: `adb devices` 顯示 "unauthorized"

**解決方案**:
1. 在手機上確認「允許 USB 偵錯」提示
2. 勾選「一律允許這部電腦」
3. 重新連接 USB 線

### 問題 2: Gradle 構建失敗

**解決方案**:
```bash
# 清理 Gradle 快取
cd android
./gradlew clean
cd ..

# 重新構建
npm run android
```

### 問題 3: Metro Bundler 無法連接

**解決方案**:
1. 確保手機和電腦在同一個 Wi-Fi 網路
2. 或者使用 USB 連接（推薦）

### 問題 4: 應用程式安裝失敗

**解決方案**:
1. 在手機上啟用「USB 安裝」選項
2. 或者手動安裝 APK:
   ```bash
   # 構建 APK
   cd android
   ./gradlew assembleDebug
   
   # APK 位置
   # android/app/build/outputs/apk/debug/app-debug.apk
   ```

---

## 📦 生成 APK 安裝檔

如果你想生成 APK 檔案直接安裝到手機：

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

在運行之前，確保：

- [ ] Java 17 已安裝並設置
- [ ] Android Studio 已安裝
- [ ] Android SDK 已安裝
- [ ] ANDROID_HOME 環境變數已設置
- [ ] 手機已啟用 USB 偵錯
- [ ] 手機已連接並被 `adb devices` 識別
- [ ] AndroidManifest.xml 已配置權限
- [ ] Metro Bundler 已啟動

---

## 🎉 成功運行後

當應用程式成功安裝並運行後，你應該看到：

1. **番茄鐘計時器** - 顯示當前時間和階段
2. **控制按鈕** - 開始、暫停、繼續、停止
3. **統計資料** - 今日完成、總計統計、連續天數、金幣

---

## 📝 注意事項

1. **首次運行較慢**: 第一次構建需要下載 Gradle 和編譯，可能需要 5-10 分鐘
2. **保持 USB 連接**: 開發時建議保持 USB 連接以獲得最佳性能
3. **熱重載**: 修改程式碼後，搖動手機打開開發選單，選擇「Reload」即可看到更改

---

**準備好了嗎？** 按照上述步驟操作，你的 Android 手機就可以運行這個應用程式了！🚀

