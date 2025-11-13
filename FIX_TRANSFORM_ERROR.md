# 🔧 修復 Transform 錯誤

## 問題描述

錯誤訊息：`Transform with key of "translateX" must be a number: {"translateX":"0%"}`

這是因為 React Native 的 `transform` 屬性不支持百分比字符串，必須使用數字（像素值）。

## ✅ 已修復

我已經修復了 `PomodoroTimer.tsx` 中的問題：

### 修復內容

**之前（錯誤）：**
```typescript
const heroTranslateX = heroPosition.interpolate({
  inputRange: [0, 1],
  outputRange: ['0%', '85%'],  // ❌ 字符串，不支持
});
```

**現在（正確）：**
```typescript
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardPadding = 64;
const heroWidth = 60;
const maxTranslateX = (screenWidth - cardPadding - heroWidth) * 0.85;

const heroTranslateX = heroPosition.interpolate({
  inputRange: [0, 1],
  outputRange: [0, maxTranslateX],  // ✅ 數字，正確
});
```

## 🔄 重新加載應用

修復後，需要重新加載應用：

### 方法一：使用開發者菜單（推薦）

1. 在 Android 模擬器中按 `Cmd + M`（Mac）或搖動設備
2. 選擇 **"Reload"** 或按 `R, R`

### 方法二：重新運行應用

```bash
cd /Users/lijunsheng/Documents/軟工/finalproject/PomodoroDungeon
npx react-native run-android
```

### 方法三：在 Metro Bundler 終端中

按 `r` 鍵重新加載

## ⚠️ 關於 NativeEventEmitter 警告

你可能還會看到一個警告：
```
`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.
```

這個警告來自 `react-native-background-timer` 或 `react-native-push-notification`，**不會阻止應用運行**，可以暫時忽略。

## 🎉 預期結果

修復後，應用應該能夠：
- ✅ 正常啟動，沒有 Render Error
- ✅ 顯示深紫色地牢主題背景
- ✅ 顯示遊戲化計時器界面
- ✅ 英雄角色行走動畫正常工作

## 📝 技術說明

在 React Native 中：
- `transform` 屬性必須使用**數字**（像素值）
- 不能使用 CSS 風格的百分比字符串（如 `"50%"`）
- 需要使用 `Dimensions.get('window').width` 獲取屏幕寬度
- 然後計算百分比對應的像素值

---

**如果問題仍然存在**，請：
1. 確保 Metro Bundler 正在運行
2. 清除緩存並重新啟動：`npx react-native start --reset-cache`
3. 重新構建應用：`npx react-native run-android`

