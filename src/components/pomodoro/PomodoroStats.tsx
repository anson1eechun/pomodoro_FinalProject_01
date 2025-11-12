import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { usePomodoro } from '@contexts/PomodoroContext';
import { formatDuration } from '@utils/timeUtils';

/**
 * 統計資料元件
 * 顯示番茄鐘統計資訊
 */
const PomodoroStats: React.FC = () => {
  const { stats } = usePomodoro();

  if (!stats) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>載入統計資料中...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>📊 你的統計資料</Text>

      {/* 今日統計 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>今日成果</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.todaySessions}</Text>
            <Text style={styles.statLabel}>完成番茄</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatDuration(stats.todayFocusTime)}</Text>
            <Text style={styles.statLabel}>專注時間</Text>
          </View>
        </View>
      </View>

      {/* 總計統計 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>總計成果</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalSessions}</Text>
            <Text style={styles.statLabel}>總完成番茄</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatDuration(stats.totalFocusTime)}</Text>
            <Text style={styles.statLabel}>總專注時間</Text>
          </View>
        </View>
      </View>

      {/* 連續天數 & 金幣 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>成就與獎勵</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>🔥 {stats.currentStreak}</Text>
            <Text style={styles.statLabel}>連續天數</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>💰 {stats.totalCoinsEarned}</Text>
            <Text style={styles.statLabel}>總獲得金幣</Text>
          </View>
        </View>
      </View>

      {/* 激勵文字 */}
      <View style={styles.motivationBox}>
        <Text style={styles.motivationText}>
          {getMotivationText(stats.todaySessions, stats.currentStreak)}
        </Text>
      </View>
    </ScrollView>
  );
};

// 取得激勵文字
const getMotivationText = (todaySessions: number, streak: number): string => {
  if (todaySessions === 0) {
    return '🌟 開始你的第一個番茄時段吧!';
  } else if (todaySessions < 3) {
    return '💪 很好的開始!繼續保持專注!';
  } else if (todaySessions < 5) {
    return '🔥 太棒了!你今天表現很出色!';
  } else if (todaySessions < 8) {
    return '🏆 驚人的專注力!你是真正的學習勇士!';
  } else {
    return '👑 你是番茄鐘大師!這專注力無人能敵!';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  motivationBox: {
    backgroundColor: '#3498DB',
    padding: 20,
    borderRadius: 16,
    marginTop: 12,
  },
  motivationText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default PomodoroStats;