import BackgroundTimer from 'react-native-background-timer';

/**
 * 計時器服務
 * 使用 BackgroundTimer 確保背景運行
 */
class TimerService {
  private intervalId: number | null = null;
  private callback: (() => void) | null = null;

  /**
   * 啟動計時器
   * @param callback 每秒執行的回調函數
   */
  start(callback: () => void): void {
    if (this.intervalId !== null) {
      console.warn('Timer is already running');
      return;
    }

    this.callback = callback;
    
    // 使用 BackgroundTimer 確保在背景也能運行
    this.intervalId = BackgroundTimer.setInterval(() => {
      if (this.callback) {
        this.callback();
      }
    }, 1000); // 每秒執行一次

    console.log('Timer started with interval:', this.intervalId);
  }

  /**
   * 停止計時器
   */
  stop(): void {
    if (this.intervalId !== null) {
      BackgroundTimer.clearInterval(this.intervalId);
      console.log('Timer stopped:', this.intervalId);
      this.intervalId = null;
      this.callback = null;
    }
  }

  /**
   * 暫停計時器
   */
  pause(): void {
    this.stop();
  }

  /**
   * 恢復計時器
   * @param callback 每秒執行的回調函數
   */
  resume(callback: () => void): void {
    this.start(callback);
  }

  /**
   * 檢查計時器是否運行中
   */
  isRunning(): boolean {
    return this.intervalId !== null;
  }

  /**
   * 清理資源
   */
  cleanup(): void {
    this.stop();
  }
}

// 匯出單例
export default new TimerService();