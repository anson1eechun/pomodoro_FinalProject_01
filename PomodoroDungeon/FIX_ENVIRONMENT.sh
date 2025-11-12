#!/bin/bash

# 環境設置修復腳本
# 用於修復 React Native 開發環境問題

set -e

echo "🔧 開始修復 React Native 開發環境..."
echo ""

# 顏色定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. 安裝 Java 17
echo -e "${YELLOW}步驟 1: 檢查並安裝 Java 17...${NC}"
if brew list openjdk@17 &>/dev/null; then
    echo -e "${GREEN}✓ Java 17 已安裝${NC}"
else
    echo "正在安裝 Java 17..."
    brew install openjdk@17
    echo -e "${GREEN}✓ Java 17 安裝完成${NC}"
fi

# 2. 設置 JAVA_HOME
echo ""
echo -e "${YELLOW}步驟 2: 設置 JAVA_HOME...${NC}"
JAVA_17_HOME=$(/usr/libexec/java_home -v 17 2>/dev/null || echo "")
if [ -z "$JAVA_17_HOME" ]; then
    JAVA_17_HOME="/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
    if [ ! -d "$JAVA_17_HOME" ]; then
        echo -e "${RED}✗ 無法找到 Java 17 安裝路徑${NC}"
        exit 1
    fi
fi

export JAVA_HOME=$JAVA_17_HOME
echo "JAVA_HOME=$JAVA_HOME"

# 驗證 Java 版本
JAVA_VERSION=$(java -version 2>&1 | head -1 | awk '{print $3}' | tr -d '"')
echo "當前 Java 版本: $JAVA_VERSION"

# 3. 檢查 Android Studio
echo ""
echo -e "${YELLOW}步驟 3: 檢查 Android Studio...${NC}"
if [ -d "/Applications/Android Studio.app" ]; then
    echo -e "${GREEN}✓ Android Studio 已安裝${NC}"
else
    echo -e "${RED}✗ Android Studio 未安裝${NC}"
    echo "請下載並安裝 Android Studio: https://developer.android.com/studio"
    echo "安裝完成後，請運行此腳本繼續"
    exit 1
fi

# 4. 檢查 Android SDK
echo ""
echo -e "${YELLOW}步驟 4: 檢查 Android SDK...${NC}"
ANDROID_SDK_PATH="$HOME/Library/Android/sdk"
if [ -d "$ANDROID_SDK_PATH" ]; then
    echo -e "${GREEN}✓ Android SDK 已安裝${NC}"
    echo "SDK 路徑: $ANDROID_SDK_PATH"
else
    echo -e "${RED}✗ Android SDK 未安裝${NC}"
    echo "請打開 Android Studio，然後："
    echo "1. 選擇 'More Actions' → 'SDK Manager'"
    echo "2. 在 'SDK Platforms' 標籤中，選擇 Android 13.0 (API Level 33)"
    echo "3. 在 'SDK Tools' 標籤中，選擇："
    echo "   - Android SDK Build-Tools 33.0.0"
    echo "   - Android SDK Platform-Tools (包含 adb)"
    echo "   - Android Emulator"
    echo "4. 點擊 'Apply' 安裝"
    echo ""
    echo "安裝完成後，請運行此腳本繼續"
    exit 1
fi

# 5. 設置環境變數
echo ""
echo -e "${YELLOW}步驟 5: 設置環境變數...${NC}"

# 檢查 ~/.zshrc 是否存在
ZSHRC="$HOME/.zshrc"
if [ ! -f "$ZSHRC" ]; then
    touch "$ZSHRC"
fi

# 檢查是否已設置
if grep -q "JAVA_HOME.*openjdk@17" "$ZSHRC" 2>/dev/null; then
    echo -e "${GREEN}✓ JAVA_HOME 已在 ~/.zshrc 中設置${NC}"
else
    echo "" >> "$ZSHRC"
    echo "# React Native 環境變數" >> "$ZSHRC"
    echo "export JAVA_HOME=\$(/usr/libexec/java_home -v 17)" >> "$ZSHRC"
    echo -e "${GREEN}✓ 已添加 JAVA_HOME 到 ~/.zshrc${NC}"
fi

if grep -q "ANDROID_HOME" "$ZSHRC" 2>/dev/null; then
    echo -e "${GREEN}✓ ANDROID_HOME 已在 ~/.zshrc 中設置${NC}"
else
    echo "export ANDROID_HOME=\$HOME/Library/Android/sdk" >> "$ZSHRC"
    echo "export PATH=\$PATH:\$ANDROID_HOME/emulator" >> "$ZSHRC"
    echo "export PATH=\$PATH:\$ANDROID_HOME/platform-tools" >> "$ZSHRC"
    echo "export PATH=\$PATH:\$ANDROID_HOME/tools" >> "$ZSHRC"
    echo "export PATH=\$PATH:\$ANDROID_HOME/tools/bin" >> "$ZSHRC"
    echo -e "${GREEN}✓ 已添加 ANDROID_HOME 到 ~/.zshrc${NC}"
fi

# 6. 驗證 adb
echo ""
echo -e "${YELLOW}步驟 6: 驗證 adb...${NC}"
export ANDROID_HOME=$ANDROID_SDK_PATH
export PATH=$PATH:$ANDROID_HOME/platform-tools

if command -v adb &> /dev/null; then
    ADB_VERSION=$(adb version | head -1)
    echo -e "${GREEN}✓ adb 可用: $ADB_VERSION${NC}"
else
    echo -e "${RED}✗ adb 不可用${NC}"
    echo "請確保 Android SDK Platform-Tools 已安裝"
fi

# 7. 安裝 CocoaPods (如果需要 iOS 開發)
echo ""
echo -e "${YELLOW}步驟 7: 檢查 CocoaPods...${NC}"
if command -v pod &> /dev/null; then
    POD_VERSION=$(pod --version)
    echo -e "${GREEN}✓ CocoaPods 已安裝: $POD_VERSION${NC}"
else
    echo "正在安裝 CocoaPods..."
    if command -v gem &> /dev/null; then
        sudo gem install cocoapods
        echo -e "${GREEN}✓ CocoaPods 安裝完成${NC}"
    else
        echo -e "${RED}✗ 無法安裝 CocoaPods: gem 命令不可用${NC}"
        echo "請先安裝 Ruby，然後運行: sudo gem install cocoapods"
    fi
fi

# 8. 總結
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}環境設置完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "請執行以下命令使環境變數生效："
echo "  source ~/.zshrc"
echo ""
echo "然後驗證環境："
echo "  java -version"
echo "  echo \$ANDROID_HOME"
echo "  adb version"
echo "  pod --version"
echo ""
echo "完成後，可以運行："
echo "  cd PomodoroDungeon"
echo "  npm run android"

