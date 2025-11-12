import { PomodoroConfig } from '@typings/pomodoro.types';

// 預設番茄鐘配置
export const DEFAULT_POMODORO_CONFIG: PomodoroConfig = {
  focusDuration: 25 * 60,        // 25 分鐘
  shortBreakDuration: 5 * 60,    // 5 分鐘
  longBreakDuration: 15 * 60,    // 15 分鐘
  longBreakInterval: 4,          // 4 個番茄後長休息
  autoStartBreak: false,         // 不自動開始休息
  autoStartFocus: false,         // 不自動開始專注
};

// 獎勵配置
export const REWARD_CONFIG = {
  COINS_PER_FOCUS: 10,           // 完成一個專注時段獲得的金幣
  COINS_PER_BREAK: 2,            // 完成休息時段獲得的金幣
  STREAK_BONUS_MULTIPLIER: 1.5,  // 連續天數獎勵倍數
  PERFECT_SESSION_BONUS: 5,      // 未中斷完成額外獎勵
};

// 通知配置
export const NOTIFICATION_CONFIG = {
  FOCUS_START_TITLE: '🎯 開始專注時段',
  FOCUS_START_MESSAGE: '讓我們進入地牢冒險吧!',
  FOCUS_COMPLETE_TITLE: '🎉 專注完成!',
  FOCUS_COMPLETE_MESSAGE: '太棒了!你獲得了 {coins} 金幣',
  BREAK_START_TITLE: '☕ 休息時間',
  BREAK_START_MESSAGE: '你已經完成了一次專注,休息一下吧!',
  BREAK_COMPLETE_TITLE: '⏰ 休息結束',
  BREAK_COMPLETE_MESSAGE: '準備好下一個挑戰了嗎?',
};

// 時間格式化
export const TIME_FORMAT = {
  DISPLAY: 'mm:ss',              // 顯示格式
  LONG_DISPLAY: 'HH:mm:ss',      // 長格式
};

// Storage Keys
export const STORAGE_KEYS = {
  POMODORO_CONFIG: '@pomodoro_config',
  POMODORO_STATS: '@pomodoro_stats',
  POMODORO_HISTORY: '@pomodoro_history',
  USER_PROFILE: '@user_profile',
};

// 音效配置 (待實作音效檔案)
export const SOUND_CONFIG = {
  FOCUS_START: 'focus_start.mp3',
  FOCUS_COMPLETE: 'focus_complete.mp3',
  BREAK_START: 'break_start.mp3',
  BREAK_COMPLETE: 'break_complete.mp3',
  TICK: 'tick.mp3',
};