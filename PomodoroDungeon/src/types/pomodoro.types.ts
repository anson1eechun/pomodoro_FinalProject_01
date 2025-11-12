// 番茄鐘狀態
export enum PomodoroStatus {
    IDLE = 'IDLE',           // 閒置
    RUNNING = 'RUNNING',     // 進行中
    PAUSED = 'PAUSED',       // 暫停
    COMPLETED = 'COMPLETED', // 已完成
  }
  
  // 番茄鐘階段類型
  export enum PomodoroPhase {
    FOCUS = 'FOCUS',         // 專注時段
    SHORT_BREAK = 'SHORT_BREAK', // 短休息
    LONG_BREAK = 'LONG_BREAK',   // 長休息
  }
  
  // 番茄鐘配置
  export interface PomodoroConfig {
    focusDuration: number;      // 專注時長 (秒)
    shortBreakDuration: number; // 短休息時長 (秒)
    longBreakDuration: number;  // 長休息時長 (秒)
    longBreakInterval: number;  // 多少個番茄後進入長休息
    autoStartBreak: boolean;    // 是否自動開始休息
    autoStartFocus: boolean;    // 是否自動開始下一個專注時段
  }
  
  // 番茄鐘記錄
  export interface PomodoroSession {
    id: string;
    phase: PomodoroPhase;
    startTime: number;          // 開始時間戳
    endTime?: number;           // 結束時間戳
    duration: number;           // 持續時間 (秒)
    completed: boolean;         // 是否完成
    interrupted: boolean;       // 是否被中斷
    coinsEarned: number;        // 獲得的金幣
  }
  
  // 番茄鐘統計
  export interface PomodoroStats {
    totalSessions: number;      // 總完成次數
    totalFocusTime: number;     // 總專注時間 (秒)
    todaySessions: number;      // 今日完成次數
    todayFocusTime: number;     // 今日專注時間 (秒)
    currentStreak: number;      // 當前連續天數
    longestStreak: number;      // 最長連續天數
    totalCoinsEarned: number;   // 總獲得金幣
  }
  
  // 番茄鐘狀態 (用於 Context)
  export interface PomodoroState {
    status: PomodoroStatus;
    phase: PomodoroPhase;
    timeRemaining: number;      // 剩餘時間 (秒)
    totalTime: number;          // 總時間 (秒)
    completedPomodoros: number; // 已完成的番茄數
    config: PomodoroConfig;
    currentSession?: PomodoroSession;
  }
  
  // 番茄鐘動作
  export type PomodoroAction =
    | { type: 'START'; payload?: { phase?: PomodoroPhase } }
    | { type: 'PAUSE' }
    | { type: 'RESUME' }
    | { type: 'STOP' }
    | { type: 'TICK' }
    | { type: 'COMPLETE' }
    | { type: 'SKIP_BREAK' }
    | { type: 'UPDATE_CONFIG'; payload: Partial<PomodoroConfig> }
    | { type: 'RESET' };