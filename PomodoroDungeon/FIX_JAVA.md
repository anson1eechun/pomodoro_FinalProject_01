# 🔧 修復 Java 版本問題

## 問題說明

你目前使用的是 **Java 23**，但 React Native 0.73 需要 **Java 17**。

**錯誤訊息**: `Unsupported class file major version 67`

---

## ✅ 解決方案

### 方法 1: 安裝並切換到 Java 17（推薦）

```bash
# 1. 安裝 Java 17
brew install openjdk@17

# 2. 設置 JAVA_HOME（臨時，僅當前終端有效）
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# 3. 驗證版本
java -version
# 應該顯示: java version "17.x.x"
```

**永久設置**（在 `~/.zshrc` 中添加）:
```bash
# 打開配置文件
nano ~/.zshrc

# 添加這一行
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# 保存並退出 (Ctrl+X, Y, Enter)

# 重新載入配置
source ~/.zshrc
```

### 方法 2: 使用 Homebrew 的 Java 17

如果方法 1 不起作用，使用 Homebrew 安裝的 Java：

```bash
# 安裝
brew install openjdk@17

# 設置 JAVA_HOME
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home

# 驗證
java -version
```

### 方法 3: 在 gradle.properties 中指定 Java 路徑

編輯 `android/gradle.properties`，取消註解並設置正確路徑：

```properties
# 如果使用系統 Java 17
org.gradle.java.home=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home

# 或使用 Homebrew 的 Java 17
org.gradle.java.home=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
```

---

## 🚀 修復後運行

```bash
cd PomodoroDungeon

# 清理 Gradle 快取
cd android
./gradlew clean
cd ..

# 重新運行
npm run android
```

---

## ✅ 驗證

運行前確認：

```bash
# 檢查 Java 版本
java -version
# 應該顯示: java version "17.x.x"

# 檢查 JAVA_HOME
echo $JAVA_HOME
# 應該指向 Java 17 的路徑
```

---

## 📝 注意事項

- 如果同時安裝了多個 Java 版本，`/usr/libexec/java_home -V` 可以查看所有版本
- 使用 `export JAVA_HOME=$(/usr/libexec/java_home -v 17)` 可以自動選擇 Java 17
- 每次打開新終端都需要設置 JAVA_HOME（除非添加到 ~/.zshrc）

---

完成後，你就可以正常運行 `npm run android` 了！🚀

