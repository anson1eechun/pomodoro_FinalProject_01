#!/bin/bash

echo "🛑 正在關閉 React Native 相關進程..."

# 關閉 Metro Bundler
echo "1. 關閉 Metro Bundler..."
killall node 2>/dev/null && echo "   ✓ Metro Bundler 已關閉" || echo "   ⚠ Metro Bundler 未運行"

# 關閉 Android 模擬器
echo "2. 關閉 Android 模擬器..."
killall qemu-system-x86_64 2>/dev/null && echo "   ✓ 模擬器已關閉" || echo "   ⚠ 模擬器未運行"
killall emulator 2>/dev/null && echo "   ✓ 模擬器進程已關閉" || echo "   ⚠ 模擬器進程未運行"

# 關閉 Gradle Daemon
echo "3. 關閉 Gradle Daemon..."
if [ -d "android" ]; then
    cd android && ./gradlew --stop 2>/dev/null && echo "   ✓ Gradle Daemon 已關閉" || echo "   ⚠ Gradle 未運行"
    cd ..
else
    echo "   ⚠ android 目錄不存在"
fi

echo ""
echo "✅ 完成！"
echo ""
echo "如需關閉 adb 伺服器，請運行: adb kill-server"
