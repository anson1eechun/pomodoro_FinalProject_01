import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { usePomodoro } from '@contexts/PomodoroContext';
import { formatDuration } from '@utils/timeUtils';
import { COLORS } from '@constants/colors';

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
      <Text style={styles.title}>📊 學習統計</Text>

      {/* 今日統計 - 主要卡片 */}
      <View style={styles.mainCard}>
        <Text style={styles.mainCardLabel}>今日專注時間</Text>
        <Text style={styles.mainCardValue}>
          {Math.floor(stats.todayFocusTime / 60)}.{Math.floor((stats.todayFocusTime % 60) / 6)} 小時
        </Text>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${Math.min((stats.todayFocusTime / 180) * 100, 100)}%`,
              },
            ]}
          />
        </View>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>{stats.todayFocusTime} 分鐘</Text>
          <Text style={styles.progressText}>目標: 180 分鐘</Text>
        </View>
      </View>

      {/* 統計網格 */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { marginRight: 6 }]}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statValue}>{stats.currentStreak}</Text>
          <Text style={styles.statLabel}>連續天數</Text>
        </View>
        <View style={[styles.statCard, { marginHorizontal: 6 }]}>
          <Text style={styles.statEmoji}>📚</Text>
          <Text style={styles.statValue}>{stats.totalSessions}</Text>
          <Text style={styles.statLabel}>完成次數</Text>
        </View>
        <View style={[styles.statCard, { marginLeft: 6 }]}>
          <Text style={styles.statEmoji}>🏆</Text>
          <Text style={styles.statValue}>Top 10%</Text>
          <Text style={styles.statLabel}>排名</Text>
        </View>
      </View>

      {/* 總計成就 */}
      <View style={styles.achievementSection}>
        <Text style={styles.sectionTitle}>總計成就</Text>
        <View style={styles.achievementGrid}>
          <View style={[styles.achievementCard, { marginRight: 6, marginBottom: 12 }]}>
            <View style={styles.achievementIcon}>
              <Text style={styles.achievementEmoji}>⏰</Text>
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementValue}>
                {Math.floor(stats.totalFocusTime / 60)}h {stats.totalFocusTime % 60}m
              </Text>
              <Text style={styles.achievementLabel}>總專注時間</Text>
            </View>
          </View>
          <View style={[styles.achievementCard, { marginLeft: 6, marginBottom: 12 }]}>
            <View style={[styles.achievementIcon, { backgroundColor: `${COLORS.pink[500]}20` }]}>
              <Text style={styles.achievementEmoji}>🎯</Text>
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementValue}>{stats.totalSessions}</Text>
              <Text style={styles.achievementLabel}>完成場次</Text>
            </View>
          </View>
          <View style={[styles.achievementCard, { marginRight: 6 }]}>
            <View style={[styles.achievementIcon, { backgroundColor: `${COLORS.gold[500]}20` }]}>
              <Text style={styles.achievementEmoji}>⚡</Text>
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementValue}>{Math.floor(stats.totalFocusTime / 25)}</Text>
              <Text style={styles.achievementLabel}>番茄鐘數</Text>
            </View>
          </View>
          <View style={[styles.achievementCard, { marginLeft: 6 }]}>
            <View style={[styles.achievementIcon, { backgroundColor: `${COLORS.break.primary}20` }]}>
              <Text style={styles.achievementEmoji}>📈</Text>
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementValue}>{stats.currentStreak}</Text>
              <Text style={styles.achievementLabel}>最長連勝</Text>
            </View>
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
  },
  content: {
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.text.tertiary,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  mainCard: {
    backgroundColor: COLORS.background.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border.purple,
    alignItems: 'center',
  },
  mainCardLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  mainCardValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: COLORS.slate[800],
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.purple[600],
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  progressText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.background.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.purple,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    textAlign: 'center',
  },
  achievementSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.card,
    borderRadius: 12,
    padding: 12,
    flex: 1,
    minWidth: '47%',
    borderWidth: 1,
    borderColor: COLORS.border.purple,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: `${COLORS.purple[500]}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementEmoji: {
    fontSize: 20,
  },
  achievementContent: {
    flex: 1,
  },
  achievementValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  achievementLabel: {
    fontSize: 12,
    color: COLORS.text.tertiary,
  },
  motivationBox: {
    backgroundColor: COLORS.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border.purple,
  },
  motivationText: {
    fontSize: 16,
    color: COLORS.text.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default PomodoroStats;