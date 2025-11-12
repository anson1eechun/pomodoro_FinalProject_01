/**
 * 將秒數轉換為 mm:ss 格式
 * @param seconds 秒數
 * @returns 格式化的時間字串 (例: 25:00)
 */
export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  /**
   * 將秒數轉換為 HH:mm:ss 格式
   * @param seconds 秒數
   * @returns 格式化的時間字串 (例: 01:25:30)
   */
  export const formatLongTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  /**
   * 將秒數轉換為人類可讀的格式
   * @param seconds 秒數
   * @returns 格式化的字串 (例: "1 小時 25 分鐘")
   */
  export const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return mins > 0 ? `${hours} 小時 ${mins} 分鐘` : `${hours} 小時`;
    }
    
    return `${mins} 分鐘`;
  };
  
  /**
   * 計算進度百分比
   * @param remaining 剩餘時間
   * @param total 總時間
   * @returns 進度百分比 (0-100)
   */
  export const calculateProgress = (remaining: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round(((total - remaining) / total) * 100);
  };
  
  /**
   * 生成唯一 ID
   * @returns 唯一識別碼
   */
  export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };
  
  /**
   * 檢查是否為同一天
   * @param timestamp1 時間戳 1
   * @param timestamp2 時間戳 2
   * @returns 是否為同一天
   */
  export const isSameDay = (timestamp1: number, timestamp2: number): boolean => {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  /**
   * 取得今天開始的時間戳
   * @returns 今天 00:00:00 的時間戳
   */
  export const getTodayStart = (): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime();
  };
  
  /**
   * 計算連續天數
   * @param sessions 番茄鐘記錄陣列
   * @returns 連續天數
   */
  export const calculateStreak = (sessions: { endTime?: number; completed: boolean }[]): number => {
    if (sessions.length === 0) return 0;
    
    const completedSessions = sessions
      .filter(s => s.completed && s.endTime)
      .sort((a, b) => (b.endTime || 0) - (a.endTime || 0));
    
    if (completedSessions.length === 0) return 0;
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const session of completedSessions) {
      const sessionDate = new Date(session.endTime!);
      sessionDate.setHours(0, 0, 0, 0);
      
      const dayDiff = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 0 || dayDiff === 1) {
        if (dayDiff === 1) {
          streak++;
          currentDate = sessionDate;
        }
      } else {
        break;
      }
    }
    
    return streak;
  };