# 📡 API 規格文件

> **注意:** 此文件為未來後端整合規劃,目前 MVP 版本使用本地儲存。

## API 基本資訊

### Base URL
```
開發環境: https://api-dev.pomodoro-dungeon.com/v1
正式環境: https://api.pomodoro-dungeon.com/v1
```

### 認證方式
```
Authorization: Bearer <JWT_TOKEN>
```

### 通用 Response 格式

#### 成功 Response
```json
{
  "success": true,
  "data": { ... },
  "message": "操作成功",
  "timestamp": "2025-11-12T10:30:00Z"
}
```

#### 錯誤 Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "錯誤訊息",
    "details": { ... }
  },
  "timestamp": "2025-11-12T10:30:00Z"
}
```

## 使用者 API

### 1. 註冊使用者 (EDU Email)

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "student@university.edu.tw",
  "password": "secure_password",
  "displayName": "李同學",
  "schoolDomain": "university.edu.tw"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "uuid-1234",
    "email": "student@university.edu.tw",
    "displayName": "李同學",
    "schoolId": "uuid-school-1",
    "schoolName": "台灣大學",
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

### 2. 登入

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "student@university.edu.tw",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "uuid-1234",
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600
  }
}
```

### 3. 取得使用者資料

**Endpoint:** `GET /users/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "uuid-1234",
    "email": "student@university.edu.tw",
    "displayName": "李同學",
    "avatar": "https://cdn.example.com/avatars/user123.jpg",
    "schoolId": "uuid-school-1",
    "schoolName": "台灣大學",
    "coins": 1250,
    "level": 15,
    "experience": 3500,
    "guildId": "uuid-guild-1",
    "createdAt": "2025-01-01T00:00:00Z"
  }
}
```

## 番茄鐘 API

### 4. 記錄番茄鐘完成

**Endpoint:** `POST /pomodoro/sessions`

**Request Body:**
```json
{
  "phase": "FOCUS",
  "duration": 1500,
  "completed": true,
  "interrupted": false,
  "startTime": "2025-11-12T10:00:00Z",
  "endTime": "2025-11-12T10:25:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "uuid-session-1",
    "coinsEarned": 15,
    "experienceEarned": 25,
    "bonusMultiplier": 1.5,
    "streakBonus": true,
    "newLevel": 15,
    "achievements": [
      {
        "id": "achievement-1",
        "name": "專注大師",
        "description": "連續完成10個番茄鐘"
      }
    ]
  }
}
```

### 5. 取得統計資料

**Endpoint:** `GET /pomodoro/stats`

**Query Parameters:**
- `period`: `today` | `week` | `month` | `all` (預設: `all`)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSessions": 150,
    "totalFocusTime": 225000,
    "todaySessions": 5,
    "todayFocusTime": 7500,
    "weekSessions": 32,
    "weekFocusTime": 48000,
    "currentStreak": 7,
    "longestStreak": 21,
    "totalCoinsEarned": 1500,
    "averageSessionPerDay": 4.5,
    "completionRate": 92.5
  }
}
```

### 6. 取得歷史記錄

**Endpoint:** `GET /pomodoro/history`

**Query Parameters:**
- `page`: 頁碼 (預設: 1)
- `limit`: 每頁數量 (預設: 20)
- `startDate`: 開始日期 (ISO 8601)
- `endDate`: 結束日期 (ISO 8601)

**Response:**
```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "uuid-session-1",
        "phase": "FOCUS",
        "duration": 1500,
        "completed": true,
        "coinsEarned": 15,
        "startTime": "2025-11-12T10:00:00Z",
        "endTime": "2025-11-12T10:25:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

## 獎勵系統 API

### 7. 取得獎勵商城列表

**Endpoint:** `GET /rewards`

**Response:**
```json
{
  "success": true,
  "data": {
    "rewards": [
      {
        "id": "reward-1",
        "name": "冰淇淋券",
        "description": "可在校園內的冰淇淋店兌換一支冰淇淋",
        "cost": 100,
        "category": "食物",
        "stock": 50,
        "icon": "https://cdn.example.com/rewards/icecream.png",
        "expiryDays": 30
      },
      {
        "id": "reward-2",
        "name": "圖書館包廂 2 小時",
        "description": "可預約圖書館包廂使用 2 小時",
        "cost": 200,
        "category": "學習",
        "stock": 10,
        "icon": "https://cdn.example.com/rewards/study-room.png",
        "expiryDays": 7
      }
    ]
  }
}
```

### 8. 兌換獎勵

**Endpoint:** `POST /rewards/redeem`

**Request Body:**
```json
{
  "rewardId": "reward-1",
  "quantity": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "redemptionId": "uuid-redemption-1",
    "rewardId": "reward-1",
    "rewardName": "冰淇淋券",
    "quantity": 1,
    "coinsSpent": 100,
    "remainingCoins": 1150,
    "code": "ICECREAM-ABC123",
    "expiresAt": "2025-12-12T00:00:00Z",
    "status": "active"
  }
}
```

### 9. 取得我的兌換記錄

**Endpoint:** `GET /rewards/my-redemptions`

**Query Parameters:**
- `status`: `active` | `used` | `expired` (可選)

**Response:**
```json
{
  "success": true,
  "data": {
    "redemptions": [
      {
        "id": "uuid-redemption-1",
        "rewardName": "冰淇淋券",
        "code": "ICECREAM-ABC123",
        "status": "active",
        "redeemedAt": "2025-11-12T10:30:00Z",
        "expiresAt": "2025-12-12T00:00:00Z"
      }
    ]
  }
}
```

## 排行榜 API

### 10. 取得學校排行榜

**Endpoint:** `GET /rankings/school/:schoolId`

**Query Parameters:**
- `period`: `today` | `week` | `month` | `all` (預設: `week`)
- `limit`: 前 N 名 (預設: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "week",
    "schoolName": "台灣大學",
    "rankings": [
      {
        "rank": 1,
        "userId": "uuid-user-1",
        "displayName": "學霸王",
        "avatar": "https://cdn.example.com/avatars/user1.jpg",
        "totalSessions": 45,
        "totalFocusTime": 67500,
        "coins": 5000,
        "level": 25
      },
      {
        "rank": 2,
        "userId": "uuid-user-2",
        "displayName": "專注達人",
        "avatar": "https://cdn.example.com/avatars/user2.jpg",
        "totalSessions": 42,
        "totalFocusTime": 63000,
        "coins": 4500,
        "level": 23
      }
    ],
    "myRank": {
      "rank": 15,
      "totalSessions": 32,
      "totalFocusTime": 48000
    }
  }
}
```

### 11. 取得公會排行榜

**Endpoint:** `GET /rankings/guilds/:schoolId`

**Query Parameters:**
- `period`: `today` | `week` | `month` | `all` (預設: `week`)

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "week",
    "guilds": [
      {
        "rank": 1,
        "guildId": "uuid-guild-1",
        "guildName": "資工系勇者團",
        "memberCount": 25,
        "totalSessions": 450,
        "averageSessions": 18,
        "totalCoins": 50000
      }
    ]
  }
}
```

## 公會系統 API

### 12. 建立公會

**Endpoint:** `POST /guilds`

**Request Body:**
```json
{
  "name": "資工系勇者團",
  "description": "資工系最強學習團隊",
  "icon": "https://cdn.example.com/icons/guild1.png",
  "isPrivate": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "guildId": "uuid-guild-1",
    "name": "資工系勇者團",
    "ownerId": "uuid-user-1",
    "memberCount": 1,
    "createdAt": "2025-11-12T10:30:00Z"
  }
}
```

### 13. 加入公會

**Endpoint:** `POST /guilds/:guildId/join`

**Response:**
```json
{
  "success": true,
  "data": {
    "guildId": "uuid-guild-1",
    "guildName": "資工系勇者團",
    "memberCount": 26,
    "joinedAt": "2025-11-12T10:35:00Z"
  }
}
```

## 錯誤碼列表

| 錯誤碼 | HTTP Status | 說明 |
|--------|-------------|------|
| `AUTH_001` | 401 | Token 無效或過期 |
| `AUTH_002` | 403 | 權限不足 |
| `USER_001` | 400 | Email 格式錯誤 |
| `USER_002` | 409 | Email 已被註冊 |
| `USER_003` | 404 | 使用者不存在 |
| `EDU_001` | 400 | 非有效的 EDU Email |
| `EDU_002` | 404 | 學校不在支援列表中 |
| `REWARD_001` | 400 | 金幣不足 |
| `REWARD_002` | 404 | 獎勵不存在 |
| `REWARD_003` | 400 | 獎勵庫存不足 |
| `GUILD_001` | 404 | 公會不存在 |
| `GUILD_002` | 409 | 已經是該公會成員 |
| `GUILD_003` | 400 | 公會人數已滿 |

## Rate Limiting

- **一般 API**: 100 requests / minute
- **認證 API**: 10 requests / minute
- **兌換獎勵**: 5 requests / minute

當超過限制時,返回 `429 Too Many Requests`。

## Webhooks (未來功能)

### 番茄鐘完成事件
```json
{
  "event": "pomodoro.completed",
  "userId": "uuid-user-1",
  "data": {
    "sessionId": "uuid-session-1",
    "coinsEarned": 15,
    "timestamp": "2025-11-12T10:25:00Z"
  }
}
```

### 獎勵兌換事件
```json
{
  "event": "reward.redeemed",
  "userId": "uuid-user-1",
  "data": {
    "redemptionId": "uuid-redemption-1",
    "rewardId": "reward-1",
    "timestamp": "2025-11-12T10:30:00Z"
  }
}
```

---

**API 版本:** v1  
**文件版本:** 1.0  
**最後更新:** 2025-11-12  
**負責人:** 後端開發組