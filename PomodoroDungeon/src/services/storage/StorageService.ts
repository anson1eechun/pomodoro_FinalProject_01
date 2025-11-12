import AsyncStorage from '@react-native-async-storage/async-storage';
import { PomodoroConfig, PomodoroSession, PomodoroStats } from '@typings/pomodoro.types';
import { STORAGE_KEYS } from '@constants/pomodoro.constants';

/**
 * 本地儲存服務
 * 使用 AsyncStorage 儲存番茄鐘相關資料
 */
class StorageService {
  /**
   * 儲存番茄鐘配置
   */
  async savePomodoroConfig(config: PomodoroConfig): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.POMODORO_CONFIG, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving pomodoro config:', error);
      throw error;
    }
  }

  /**
   * 讀取番茄鐘配置
   */
  async getPomodoroConfig(): Promise<PomodoroConfig | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.POMODORO_CONFIG);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading pomodoro config:', error);
      return null;
    }
  }

  /**
   * 儲存番茄鐘統計資料
   */
  async savePomodoroStats(stats: PomodoroStats): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.POMODORO_STATS, JSON.stringify(stats));
    } catch (error) {
      console.error('Error saving pomodoro stats:', error);
      throw error;
    }
  }

  /**
   * 讀取番茄鐘統計資料
   */
  async getPomodoroStats(): Promise<PomodoroStats | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.POMODORO_STATS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading pomodoro stats:', error);
      return null;
    }
  }

  /**
   * 新增番茄鐘記錄
   */
  async addPomodoroSession(session: PomodoroSession): Promise<void> {
    try {
      const history = await this.getPomodoroHistory();
      history.push(session);
      await AsyncStorage.setItem(STORAGE_KEYS.POMODORO_HISTORY, JSON.stringify(history));
    } catch (error) {
      console.error('Error adding pomodoro session:', error);
      throw error;
    }
  }

  /**
   * 取得番茄鐘歷史記錄
   */
  async getPomodoroHistory(): Promise<PomodoroSession[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.POMODORO_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading pomodoro history:', error);
      return [];
    }
  }

  /**
   * 取得今日的番茄鐘記錄
   */
  async getTodaySessions(): Promise<PomodoroSession[]> {
    try {
      const history = await this.getPomodoroHistory();
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayTimestamp = todayStart.getTime();

      return history.filter(
        session => session.startTime >= todayTimestamp && session.completed
      );
    } catch (error) {
      console.error('Error loading today sessions:', error);
      return [];
    }
  }

  /**
   * 清除所有資料
   */
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.POMODORO_CONFIG,
        STORAGE_KEYS.POMODORO_STATS,
        STORAGE_KEYS.POMODORO_HISTORY,
      ]);
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  }
}

// 匯出單例
export default new StorageService();