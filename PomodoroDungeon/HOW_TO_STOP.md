# 🛑 如何關閉 Android 相關程序

## 📱 常見關閉場景

### 1. 關閉 Android 應用程式（手機上）

#### 方法 1: 在手機上關閉
- 打開最近使用的應用程式（多任務視圖）
- 滑動關閉應用程式

#### 方法 2: 使用 adb 關閉
```bash
# 列出所有運行的應用程式
adb shell dumpsys window windows | grep -E 'mCurrentFocus|mFocusedApp'

# 關閉特定應用程式
adb shell am force-stop com.pomodoroDungeon
```

---

### 2. 關閉 Android 模擬器

#### 方法 1: 在模擬器視窗關閉
- 點擊模擬器視窗右上角的 ❌ 按鈕
- 或選擇 File → Exit

#### 方法 2: 使用 adb 關閉
```bash
# 列出所有連接的設備
adb devices

# 關閉所有模擬器（需要手動關閉模擬器視窗）
```

#### 方法 3: 使用命令關閉
```bash
# 關閉所有 Android 模擬器進程
killall qemu-system-x86_64
# 或
killall emulator
```

---

### 3. 關閉 Metro Bundler（React Native 開發伺服器）

#### 方法 1: 在終端中關閉
- 在運行 Metro Bundler 的終端視窗中按 `Ctrl + C`
- 或按 `Ctrl + C` 兩次強制關閉

#### 方法 2: 關閉所有 Node 進程
```bash
# 查找 Metro Bundler 進程
lsof -ti:8081

# 關閉 Metro Bundler
kill -9 $(lsof -ti:8081)

# 或關閉所有 Node 進程
killall node
```

#### 方法 3: 使用端口關閉
```bash
# 關閉占用 8081 端口的進程
lsof -ti:8081 | xargs kill -9
```

---

### 4. 關閉 Android Studio

#### 方法 1: 在 Android Studio 中關閉
- 選擇 Android Studio → Quit Android Studio
- 或按 `Cmd + Q` (macOS)

#### 方法 2: 使用命令關閉
```bash
# 關閉 Android Studio
killall "Android Studio"

# 或關閉所有 Java 進程（謹慎使用）
killall java
```

---

### 5. 關閉 Gradle 構建進程

#### 方法 1: 在終端中關閉
- 在運行 Gradle 的終端視窗中按 `Ctrl + C`

#### 方法 2: 關閉 Gradle Daemon
```bash
cd android
./gradlew --stop
```

#### 方法 3: 關閉所有 Gradle 進程
```bash
# 查找 Gradle 進程
ps aux | grep gradle

# 關閉 Gradle Daemon
killall java
# 注意：這會關閉所有 Java 進程，包括其他應用程式
```

---

### 6. 關閉所有 React Native 相關進程

#### 一鍵關閉所有相關進程
```bash
# 關閉 Metro Bundler
killall node

# 關閉 Android 模擬器
killall qemu-system-x86_64

# 關閉 Gradle Daemon
cd android && ./gradlew --stop

# 關閉 adb 伺服器（可選）
adb kill-server
```

---

## 🚀 快速關閉腳本

創建一個腳本來快速關閉所有相關進程：

```bash
#!/bin/bash

echo "🛑 正在關閉 React Native 相關進程..."

# 關閉 Metro Bundler
echo "關閉 Metro Bundler..."
killall node 2>/dev/null || echo "Metro Bundler 未運行"

# 關閉 Android 模擬器
echo "關閉 Android 模擬器..."
killall qemu-system-x86_64 2>/dev/null || echo "模擬器未運行"
killall emulator 2>/dev/null || echo "模擬器未運行"

# 關閉 Gradle Daemon
echo "關閉 Gradle Daemon..."
cd android && ./gradlew --stop 2>/dev/null || echo "Gradle 未運行"

# 關閉 adb 伺服器（可選）
# echo "關閉 adb 伺服器..."
# adb kill-server 2>/dev/null || echo "adb 伺服器未運行"

echo "✅ 完成！"
```

---

## 📝 常用命令

### 檢查運行中的進程

```bash
# 檢查 Metro Bundler
lsof -ti:8081

# 檢查 Android 模擬器
ps aux | grep emulator

# 檢查 Gradle 進程
ps aux | grep gradle

# 檢查 Node 進程
ps aux | grep node

# 檢查所有相關進程
ps aux | grep -E "node|gradle|emulator|metro"
```

### 強制關閉進程

```bash
# 關閉特定進程（使用 PID）
kill -9 <PID>

# 關閉所有 Node 進程
killall node

# 關閉所有 Java 進程（謹慎使用）
killall java
```

---

## ⚠️ 注意事項

1. **強制關閉**: 使用 `kill -9` 或 `killall` 會強制關閉進程，可能會導致數據丟失
2. **Java 進程**: 關閉所有 Java 進程會影響其他使用 Java 的應用程式
3. **保存工作**: 關閉前請確保已保存所有工作
4. **adb 伺服器**: 通常不需要關閉 adb 伺服器，除非遇到連接問題

---

## 🔍 故障排除

### 問題 1: 端口被占用

```bash
# 檢查端口占用
lsof -ti:8081

# 關閉占用端口的進程
kill -9 $(lsof -ti:8081)
```

### 問題 2: 進程無法關閉

```bash
# 強制關閉
kill -9 <PID>

# 如果還是不行，重啟電腦
sudo reboot
```

### 問題 3: adb 連接問題

```bash
# 重啟 adb 伺服器
adb kill-server
adb start-server
```

---

## 📚 相關文件

- [ENVIRONMENT_FIXED.md](ENVIRONMENT_FIXED.md) - 環境設置指南
- [QUICK_START_ANDROID.md](QUICK_START_ANDROID.md) - Android 快速開始
- [README.md](README.md) - 專案說明

---

**最後更新**: 2025-11-12

