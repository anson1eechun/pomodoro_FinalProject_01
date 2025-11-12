declare module 'react-native-push-notification' {
  export enum Importance {
    DEFAULT = 3,
    HIGH = 4,
    LOW = 2,
    MIN = 1,
    NONE = 0,
    UNSPECIFIED = -1000,
  }

  export interface PushNotificationConfig {
    onNotification?: (notification: any) => void;
    permissions?: {
      alert?: boolean;
      badge?: boolean;
      sound?: boolean;
    };
    popInitialNotification?: boolean;
    requestPermissions?: boolean;
  }

  export interface PushNotificationChannel {
    channelId: string;
    channelName: string;
    channelDescription?: string;
    playSound?: boolean;
    soundName?: string;
    importance?: Importance;
    vibrate?: boolean;
  }

  export interface LocalNotification {
    channelId?: string;
    title?: string;
    message?: string;
    playSound?: boolean;
    soundName?: string;
    importance?: string;
    vibrate?: boolean;
    vibration?: number;
    priority?: string;
    id?: string;
    smallIcon?: string;
    largeIcon?: string;
  }

  const PushNotification: {
    configure: (config: PushNotificationConfig) => void;
    createChannel: (
      channel: PushNotificationChannel,
      callback?: (created: boolean) => void
    ) => void;
    localNotification: (notification: LocalNotification) => void;
    requestPermissions: () => void;
    cancelAllLocalNotifications: () => void;
  };

  export default PushNotification;
}

