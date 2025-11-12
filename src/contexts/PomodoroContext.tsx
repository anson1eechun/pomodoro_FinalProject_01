import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import {
  PomodoroState,
  PomodoroAction,
  PomodoroStatus,
  PomodoroPhase,
  PomodoroSession,
  PomodoroStats,
} from '@typings/pomodoro.types';
import { DEFAULT_POMODORO_CONFIG, REWARD_CONFIG } from '@constants/pomodoro.constants';
import TimerService from '@services/timer/TimerService';
import NotificationService from '@services/notification/NotificationService';
import StorageService from '@services/storage/StorageService';
import { generateId, calculateStreak } from '@utils/timeUtils';

// 初始狀態
const initialState: PomodoroState = {
  status: PomodoroStatus.IDLE,
  phase: PomodoroPhase.FOCUS,
  timeRemaining: DEFAULT_POMODORO_CONFIG.focusDuration,
  totalTime: DEFAULT_POMODORO_CONFIG.focusDuration,
  completedPomodoros: 0,
  config: DEFAULT_POMODORO_CONFIG,
};

// Reducer 函數
const pomodoroReducer = (state: PomodoroState, action: PomodoroAction): PomodoroState => {
  switch (action.type) {
    case 'START': {
      const phase = action.payload?.phase || state.phase;
      const duration = getDurationForPhase(phase, state.config);
      
      return {
        ...state,
        status: PomodoroStatus.RUNNING,
        phase,
        timeRemaining: duration,
        totalTime: duration,
        currentSession: {
          id: generateId(),
          phase,
          startTime: Date.now(),
          duration,
          completed: false,
          interrupted: false,
          coinsEarned: 0,
        },
      };
    }

    case 'PAUSE':
      return {
        ...state,
        status: PomodoroStatus.PAUSED,
      };

    case 'RESUME':
      return {
        ...state,
        status: PomodoroStatus.RUNNING,
      };

    case 'STOP': {
      const wasRunning = state.status === PomodoroStatus.RUNNING;
      return {
        ...state,
        status: PomodoroStatus.IDLE,
        currentSession: wasRunning && state.currentSession
          ? { ...state.currentSession, interrupted: true, endTime: Date.now() }
          : undefined,
      };
    }

    case 'TICK':
      if (state.timeRemaining <= 0) return state;
      
      const newTimeRemaining = state.timeRemaining - 1;
      
      if (newTimeRemaining <= 0) {
        return {
          ...state,
          timeRemaining: 0,
          status: PomodoroStatus.COMPLETED,
        };
      }
      
      return {
        ...state,
        timeRemaining: newTimeRemaining,
      };

    case 'COMPLETE': {
      const nextCompletedPomodoros = 
        state.phase === PomodoroPhase.FOCUS 
          ? state.completedPomodoros + 1 
          : state.completedPomodoros;

      // 決定下一個階段
      let nextPhase: PomodoroPhase;
      if (state.phase === PomodoroPhase.FOCUS) {
        nextPhase = 
          nextCompletedPomodoros % state.config.longBreakInterval === 0
            ? PomodoroPhase.LONG_BREAK
            : PomodoroPhase.SHORT_BREAK;
      } else {
        nextPhase = PomodoroPhase.FOCUS;
      }

      // 計算獲得的金幣
      const coinsEarned = 
        state.phase === PomodoroPhase.FOCUS
          ? REWARD_CONFIG.COINS_PER_FOCUS + REWARD_CONFIG.PERFECT_SESSION_BONUS
          : REWARD_CONFIG.COINS_PER_BREAK;

      return {
        ...state,
        status: PomodoroStatus.IDLE,
        completedPomodoros: nextCompletedPomodoros,
        phase: nextPhase,
        timeRemaining: getDurationForPhase(nextPhase, state.config),
        totalTime: getDurationForPhase(nextPhase, state.config),
        currentSession: state.currentSession
          ? {
              ...state.currentSession,
              completed: true,
              endTime: Date.now(),
              coinsEarned,
            }
          : undefined,
      };
    }

    case 'SKIP_BREAK':
      return {
        ...state,
        status: PomodoroStatus.IDLE,
        phase: PomodoroPhase.FOCUS,
        timeRemaining: state.config.focusDuration,
        totalTime: state.config.focusDuration,
      };

    case 'UPDATE_CONFIG':
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

// 根據階段取得持續時間
const getDurationForPhase = (phase: PomodoroPhase, config: typeof DEFAULT_POMODORO_CONFIG): number => {
  switch (phase) {
    case PomodoroPhase.FOCUS:
      return config.focusDuration;
    case PomodoroPhase.SHORT_BREAK:
      return config.shortBreakDuration;
    case PomodoroPhase.LONG_BREAK:
      return config.longBreakDuration;
  }
};

// Context 型別
interface PomodoroContextType {
  state: PomodoroState;
  start: (phase?: PomodoroPhase) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  skipBreak: () => void;
  updateConfig: (config: Partial<typeof DEFAULT_POMODORO_CONFIG>) => void;
  reset: () => void;
  stats: PomodoroStats | null;
  refreshStats: () => Promise<void>;
}

// 建立 Context
const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

// Provider 元件
interface PomodoroProviderProps {
  children: ReactNode;
}

export const PomodoroProvider: React.FC<PomodoroProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);
  const [stats, setStats] = React.useState<PomodoroStats | null>(null);

  // 刷新統計資料
  const refreshStats = useCallback(async () => {
    const history = await StorageService.getPomodoroHistory();
    const todaySessions = await StorageService.getTodaySessions();

    const totalSessions = history.filter(s => s.completed && s.phase === PomodoroPhase.FOCUS).length;
    const totalFocusTime = history
      .filter(s => s.completed && s.phase === PomodoroPhase.FOCUS)
      .reduce((sum, s) => sum + s.duration, 0);

    const todaySessionsCount = todaySessions.filter(s => s.phase === PomodoroPhase.FOCUS).length;
    const todayFocusTime = todaySessions
      .filter(s => s.phase === PomodoroPhase.FOCUS)
      .reduce((sum, s) => sum + s.duration, 0);

    const currentStreak = calculateStreak(history);
    const totalCoinsEarned = history.reduce((sum, s) => sum + (s.coinsEarned || 0), 0);

    const newStats: PomodoroStats = {
      totalSessions,
      totalFocusTime,
      todaySessions: todaySessionsCount,
      todayFocusTime,
      currentStreak,
      longestStreak: currentStreak, // 簡化版本,未來可以追蹤最長紀錄
      totalCoinsEarned,
    };

    setStats(newStats);
    await StorageService.savePomodoroStats(newStats);
  }, []);

  // 初始化
  useEffect(() => {
    const init = async () => {
      // 初始化通知服務
      NotificationService.initialize();
      await NotificationService.requestPermissions();

      // 載入配置
      const savedConfig = await StorageService.getPomodoroConfig();
      if (savedConfig) {
        dispatch({ type: 'UPDATE_CONFIG', payload: savedConfig });
      }

      // 載入統計資料
      await refreshStats();
    };

    init();

    // 清理
    return () => {
      TimerService.cleanup();
      NotificationService.cleanup();
    };
  }, [refreshStats]);

  // 計時器 Tick
  useEffect(() => {
    if (state.status === PomodoroStatus.RUNNING) {
      TimerService.start(() => {
        dispatch({ type: 'TICK' });
      });
    } else {
      TimerService.stop();
    }

    return () => {
      TimerService.stop();
    };
  }, [state.status]);

  // 開始
  const start = useCallback((phase?: PomodoroPhase) => {
    dispatch({ type: 'START', payload: { phase } });
    
    if (phase === PomodoroPhase.FOCUS || state.phase === PomodoroPhase.FOCUS) {
      NotificationService.showFocusStartNotification();
    } else {
      NotificationService.showBreakStartNotification();
    }
  }, [state.phase]);

  // 處理完成
  const handleComplete = useCallback(async () => {
    // 儲存記錄
    if (state.currentSession) {
      const completedSession: PomodoroSession = {
        ...state.currentSession,
        completed: true,
        endTime: Date.now(),
      };

      await StorageService.addPomodoroSession(completedSession);
      await refreshStats();
    }

    // 顯示通知
    if (state.phase === PomodoroPhase.FOCUS) {
      NotificationService.showFocusCompleteNotification(
        state.currentSession?.coinsEarned || REWARD_CONFIG.COINS_PER_FOCUS
      );
    } else {
      NotificationService.showBreakCompleteNotification();
    }

    // 轉換到下一階段
    dispatch({ type: 'COMPLETE' });

    // 自動開始下一個階段
    if (state.phase === PomodoroPhase.FOCUS && state.config.autoStartBreak) {
      setTimeout(() => {
        start();
      }, 1000);
    } else if (state.phase !== PomodoroPhase.FOCUS && state.config.autoStartFocus) {
      setTimeout(() => {
        start();
      }, 1000);
    }
  }, [state.currentSession, state.phase, state.config, refreshStats, start]);

  // 監聽完成狀態
  useEffect(() => {
    if (state.status === PomodoroStatus.COMPLETED) {
      handleComplete();
    }
  }, [state.status, handleComplete]);

  // 暫停
  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, []);

  // 繼續
  const resume = useCallback(() => {
    dispatch({ type: 'RESUME' });
  }, []);

  // 停止
  const stop = useCallback(() => {
    dispatch({ type: 'STOP' });
  }, []);

  // 跳過休息
  const skipBreak = useCallback(() => {
    dispatch({ type: 'SKIP_BREAK' });
  }, []);

  // 更新配置
  const updateConfig = useCallback(async (config: Partial<typeof DEFAULT_POMODORO_CONFIG>) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: config });
    const newConfig = { ...state.config, ...config };
    await StorageService.savePomodoroConfig(newConfig);
  }, [state.config]);

  // 重置
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value: PomodoroContextType = {
    state,
    start,
    pause,
    resume,
    stop,
    skipBreak,
    updateConfig,
    reset,
    stats,
    refreshStats,
  };

  return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>;
};

// Hook
export const usePomodoro = (): PomodoroContextType => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoro must be used within PomodoroProvider');
  }
  return context;
};