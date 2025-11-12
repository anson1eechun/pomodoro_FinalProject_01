import PushNotification, { Importance } from 'react-native-push-notification';
import { Platform } from 'react-native';
import { NOTIFICATION_CONFIG } from '@constants/pomodoro.constants';
import { PomodoroPhase } from '@typings/pomodoro.types';

/**
 * 通知服務
 * 處理本地推播通知
 */
class NotificationService {
  private channelId = 'pomodoro-channel';
  private isInitialized = false;

  /**
   * 初始化通知服務
   */
  initialize(): void {
    if (this.isInitialized) return;

    // 設定通知頻道 (Android)
    PushNotification.createChannel(
      {
        channelId: this.channelId,
        channelName: '番茄鐘通知',
        channelDescription: '番茄鐘計時器的通知提醒',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created: boolean) => console.log(`Notification channel created: ${created}`)
    );

    // 配置通知
    PushNotification.configure({
      onNotification: function (notification: any) {
        console.log('Notification received:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    this.isInitialized = true;
    console.log('NotificationService initialized');
  }

  /**
   * 請求通知權限
   */
  async requestPermissions(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        // Android 13+ 需要請求通知權限
        // 這裡需要使用 PermissionsAndroid
        return true; // 暫時回傳 true
      } else {
        // iOS 需要請求權限
        PushNotification.requestPermissions();
        return true;
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  /**
   * 顯示專注開始通知
   */
  showFocusStartNotification(): void {
    this.showNotification(
      NOTIFICATION_CONFIG.FOCUS_START_TITLE,
      NOTIFICATION_CONFIG.FOCUS_START_MESSAGE,
      'focus_start'
    );
  }

  /**
   * 顯示專注完成通知
   * @param coins 獲得的金幣數量
   */
  showFocusCompleteNotification(coins: number): void {
    const message = NOTIFICATION_CONFIG.FOCUS_COMPLETE_MESSAGE.replace('{coins}', coins.toString());
    this.showNotification(
      NOTIFICATION_CONFIG.FOCUS_COMPLETE_TITLE,
      message,
      'focus_complete'
    );
  }

  /**
   * 顯示休息開始通知
   */
  showBreakStartNotification(): void {
    this.showNotification(
      NOTIFICATION_CONFIG.BREAK_START_TITLE,
      NOTIFICATION_CONFIG.BREAK_START_MESSAGE,
      'break_start'
    );
  }

  /**
   * 顯示休息結束通知
   */
  showBreakCompleteNotification(): void {
    this.showNotification(
      NOTIFICATION_CONFIG.BREAK_COMPLETE_TITLE,
      NOTIFICATION_CONFIG.BREAK_COMPLETE_MESSAGE,
      'break_complete'
    );
  }

  /**
   * 顯示自訂通知
   * @param title 標題
   * @param message 訊息
   * @param id 通知 ID
   */
  private showNotification(title: string, message: string, id: string): void {
    if (!this.isInitialized) {
      console.warn('NotificationService not initialized');
      return;
    }

    PushNotification.localNotification({
      channelId: this.channelId,
      title,
      message,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      vibrate: true,
      vibration: 300,
      priority: 'high',
      id: id,
      smallIcon: 'ic_notification',
      largeIcon: 'ic_launcher',
    });

    console.log(`Notification shown: ${title} - ${message}`);
  }

  /**
   * 取消所有通知
   */
  cancelAllNotifications(): void {
    PushNotification.cancelAllLocalNotifications();
    console.log('All notifications cancelled');
  }

  /**
   * 清理資源
   */
  cleanup(): void {
    this.cancelAllNotifications();
  }
}

// 匯出單例
export default new NotificationService();