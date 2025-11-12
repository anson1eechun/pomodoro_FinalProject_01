# 💻 開發指南

本文件提供 Pomodoro Dungeon App 的開發最佳實踐和團隊協作規範。

## 程式碼風格指南

### TypeScript 規範

#### 1. 型別定義
```typescript
// ✅ 好的做法 - 明確的型別定義
interface User {
  id: string;
  name: string;
  email: string;
}

const user: User = {
  id: '123',
  name: 'John',
  email: 'john@example.com'
};

// ❌ 避免使用 any
const data: any = fetchData(); // 不推薦

// ✅ 使用具體型別或 unknown
const data: unknown = fetchData();
if (isUser(data)) {
  // Type guard
  console.log(data.name);
}
```

#### 2. 函數定義
```typescript
// ✅ 明確的參數和返回型別
function calculateProgress(current: number, total: number): number {
  return Math.round((current / total) * 100);
}

// ✅ 使用箭頭函數
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
```

### React/React Native 規範

#### 1. 元件結構
```typescript
// ✅ 推薦的元件結構
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Props 型別定義
interface TimerProps {
  timeRemaining: number;
  onComplete: () => void;
}

// 元件定義
const Timer: React.FC<TimerProps> = ({ timeRemaining, onComplete }) => {
  // Hooks 放在最上面
  const [isRunning, setIsRunning] = React.useState(false);
  
  // Effect hooks
  React.useEffect(() => {
    // ...
  }, [timeRemaining]);
  
  // 事件處理函數
  const handleStart = () => {
    setIsRunning(true);
  };
  
  // 渲染
  return (
    <View style={styles.container}>
      <Text>{timeRemaining}</Text>
    </View>
  );
};

// 樣式定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Timer;
```

#### 2. Hooks 使用規則
```typescript
// ✅ 自訂 Hook
function useTimer(initialTime: number) {
  const [time, setTime] = React.useState(initialTime);
  
  const start = React.useCallback(() => {
    // ...
  }, []);
  
  return { time, start };
}

// ✅ 使用 useCallback 避免不必要的重新渲染
const handlePress = React.useCallback(() => {
  console.log('Button pressed');
}, []);

// ✅ 使用 useMemo 快取計算結果
const expensiveValue = React.useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

#### 3. 效能優化
```typescript
// ✅ 使用 React.memo 避免不必要的重新渲染
const TimerDisplay = React.memo<TimerDisplayProps>(({ time }) => {
  return <Text>{time}</Text>;
});

// ✅ 分離靜態內容
const StaticHeader = React.memo(() => {
  return <Text>番茄鐘計時器</Text>;
});
```

### 命名規範

#### 1. 檔案命名
```
# 元件檔案 - PascalCase
PomodoroTimer.tsx
UserProfile.tsx

# Hooks - camelCase with 'use' prefix
usePomodoro.ts
useTimer.ts

# 工具函數 - camelCase
timeUtils.ts
storageHelper.ts

# 常數檔案 - camelCase
constants.ts
config.ts

# 型別定義 - camelCase with .types suffix
pomodoro.types.ts
user.types.ts
```

#### 2. 變數命名
```typescript
// ✅ 使用描述性名稱
const userProfile = getUserProfile();
const isTimerRunning = checkTimerStatus();
const totalFocusTime = calculateTotalTime();

// ❌ 避免縮寫
const usr = getUser(); // 不好
const tm = getTime();  // 不好

// ✅ Boolean 變數使用 is/has/should 前綴
const isLoading = true;
const hasPermission = checkPermission();
const shouldUpdate = needsUpdate();

// ✅ 常數使用 UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';
```

#### 3. 函數命名
```typescript
// ✅ 使用動詞開頭
function fetchUserData() { ... }
function updateProfile() { ... }
function validateEmail() { ... }

// ✅ 事件處理函數使用 handle 前綴
function handleSubmit() { ... }
function handlePress() { ... }
function handleChange() { ... }
```

## Git 工作流程

### 分支策略

```
main (穩定版本)
  ↑
develop (開發主分支)
  ↑
feature/xxx (功能分支)
bugfix/xxx (修復分支)
hotfix/xxx (緊急修復)
```

### Commit 訊息規範

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type 類型:
- `feat`: 新功能
- `fix`: 修復 Bug
- `docs`: 文件更新
- `style`: 程式碼格式調整 (不影響功能)
- `refactor`: 重構
- `test`: 測試相關
- `chore`: 建置流程或工具變動
- `perf`: 效能優化

#### 範例:
```bash
# 新功能
git commit -m "feat(pomodoro): add notification sound"

# 修復 Bug
git commit -m "fix(timer): correct time calculation in break phase"

# 文件更新
git commit -m "docs: update setup guide with new dependencies"

# 重構
git commit -m "refactor(storage): simplify async storage operations"
```

### Pull Request 流程

1. **建立分支**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

2. **開發並提交**
```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

3. **建立 PR**
- 填寫 PR 描述模板
- 連結相關 Issue
- 指定 Reviewer
- 確保 CI 測試通過

4. **Code Review**
- 至少需要 1 位成員 Approve
- 解決所有 Review Comments
- 更新文件 (如需要)

5. **合併**
```bash
git checkout develop
git merge feature/your-feature-name
git push origin develop
```

## 測試策略

### 單元測試

```typescript
// Timer.test.ts
import { formatTime } from '@utils/timeUtils';

describe('formatTime', () => {
  it('should format time correctly', () => {
    expect(formatTime(90)).toBe('01:30');
    expect(formatTime(3600)).toBe('60:00');
  });
  
  it('should pad single digits', () => {
    expect(formatTime(5)).toBe('00:05');
  });
});
```

### 元件測試

```typescript
// PomodoroTimer.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PomodoroTimer from '@components/pomodoro/PomodoroTimer';

describe('PomodoroTimer', () => {
  it('renders correctly', () => {
    const { getByText } = render(<PomodoroTimer />);
    expect(getByText('25:00')).toBeTruthy();
  });
  
  it('starts timer on button press', () => {
    const { getByText } = render(<PomodoroTimer />);
    const startButton = getByText('開始');
    fireEvent.press(startButton);
    expect(getByText('暫停')).toBeTruthy();
  });
});
```

### 執行測試

```bash
# 執行所有測試
npm test

# 執行特定測試檔案
npm test PomodoroTimer.test.tsx

# 執行測試並產生覆蓋率報告
npm test -- --coverage

# Watch 模式
npm test -- --watch
```

## 效能優化技巧

### 1. 避免不必要的重新渲染

```typescript
// ✅ 使用 React.memo
const ExpensiveComponent = React.memo<Props>(({ data }) => {
  return <View>{data}</View>;
});

// ✅ 使用 useCallback
const handlePress = React.useCallback(() => {
  console.log('pressed');
}, []);

// ✅ 使用 useMemo
const sortedData = React.useMemo(() => {
  return data.sort((a, b) => a - b);
}, [data]);
```

### 2. 圖片優化

```typescript
// ✅ 使用適當的圖片尺寸
<Image 
  source={{ uri: imageUrl }}
  style={{ width: 100, height: 100 }}
  resizeMode="cover"
/>

// ✅ 使用 FastImage (第三方套件)
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: imageUrl }}
  style={{ width: 100, height: 100 }}
  resizeMode={FastImage.resizeMode.cover}
/>
```

### 3. 列表優化

```typescript
// ✅ 使用 FlatList 而非 ScrollView + map
<FlatList
  data={items}
  renderItem={({ item }) => <Item data={item} />}
  keyExtractor={item => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

## 除錯技巧

### 1. Console 除錯

```typescript
// ✅ 使用有意義的 log
console.log('[PomodoroContext] Timer started:', { phase, duration });

// ✅ 使用不同的 log 等級
console.info('Info message');
console.warn('Warning message');
console.error('Error message');

// ✅ 使用群組
console.group('User Data');
console.log('Name:', user.name);
console.log('Email:', user.email);
console.groupEnd();
```

### 2. React DevTools

```bash
# 安裝 React DevTools
npm install -g react-devtools

# 啟動
react-devtools
```

### 3. Flipper 除錯

Flipper 提供:
- Network Inspector
- Databases
- Shared Preferences
- React DevTools
- Redux DevTools

## 常見問題解決

### 問題 1: State 更新不生效

```typescript
// ❌ 直接修改 state
state.items.push(newItem);

// ✅ 建立新陣列
setState({
  ...state,
  items: [...state.items, newItem]
});
```

### 問題 2: useEffect 無限循環

```typescript
// ❌ 缺少 dependency array
useEffect(() => {
  fetchData();
});

// ✅ 正確的 dependencies
useEffect(() => {
  fetchData();
}, [userId]); // 只在 userId 變化時執行
```

### 問題 3: 記憶體洩漏

```typescript
// ✅ 清理 effect
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  // 清理函數
  return () => {
    clearInterval(timer);
  };
}, []);
```

## 安全性最佳實踐

### 1. 避免儲存敏感資料在 AsyncStorage

```typescript
// ❌ 不要儲存密碼、Token 等敏感資料
await AsyncStorage.setItem('password', userPassword);

// ✅ 使用 SecureStore (Expo) 或 Keychain (原生)
import * as SecureStore from 'expo-secure-store';
await SecureStore.setItemAsync('token', authToken);
```

### 2. 驗證使用者輸入

```typescript
// ✅ 驗證 email 格式
const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ✅ 清理使用者輸入
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
```

## 文件撰寫

### 1. JSDoc 註解

```typescript
/**
 * 計算番茄鐘進度百分比
 * @param remaining - 剩餘時間 (秒)
 * @param total - 總時間 (秒)
 * @returns 進度百分比 (0-100)
 * @example
 * calculateProgress(750, 1500) // returns 50
 */
function calculateProgress(remaining: number, total: number): number {
  if (total === 0) return 0;
  return Math.round(((total - remaining) / total) * 100);
}
```

### 2. README 文件

每個主要模組都應該有 README:
- 模組目的
- 使用方式
- API 文件
- 範例程式碼

## 團隊協作建議

### 1. Daily Standup
每日簡短分享:
- 昨天完成了什麼
- 今天計畫做什麼
- 遇到什麼阻礙

### 2. Code Review 準則
- 保持友善和建設性
- 解釋「為什麼」,不只是「什麼」
- 稱讚好的程式碼
- 及時回應 Review

### 3. 文件更新
- 程式碼變更時同步更新文件
- 新功能必須附帶文件
- 定期檢視文件是否過時

## 學習資源

### 官方文件
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks](https://react.dev/reference/react)

### 推薦閱讀
- Clean Code by Robert C. Martin
- React Native in Action
- Effective TypeScript

### 線上課程
- [React Native - The Practical Guide](https://www.udemy.com/course/react-native-the-practical-guide/)
- [TypeScript: The Complete Developer's Guide](https://www.udemy.com/course/typescript-the-complete-developers-guide/)

---

**文件版本:** 1.0  
**最後更新:** 2025-11-12  
**維護者:** 技術團隊