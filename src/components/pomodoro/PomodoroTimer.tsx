import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { usePomodoro } from '@contexts/PomodoroContext';
import { PomodoroPhase, PomodoroStatus } from '@typings/pomodoro.types';
import { formatTime, calculateProgress } from '@utils/timeUtils';
import { COLORS, GRADIENTS } from '@constants/colors';

/**
 * 番茄鐘計時器顯示元件
 * 顯示當前時間、階段和進度 - 遊戲化設計
 */
const PomodoroTimer: React.FC = () => {
  const { state } = usePomodoro();
  const [heroPosition] = React.useState(new Animated.Value(0));
  const screenWidth = Dimensions.get('window').width;

  // 取得階段顯示文字和圖標
  const getPhaseInfo = () => {
    switch (state.phase) {
      case PomodoroPhase.FOCUS:
        return {
          text: '🔥 專注模式',
          emoji: '🐉',
          description: '專注擊敗地牢怪物！',
          heroEmoji: '🚶',
        };
      case PomodoroPhase.SHORT_BREAK:
        return {
          text: '☕ 短休息',
          emoji: '🧘',
          description: '休息恢復體力',
          heroEmoji: '🧘',
        };
      case PomodoroPhase.LONG_BREAK:
        return {
          text: '🌟 長休息',
          emoji: '🧘',
          description: '深度恢復體力',
          heroEmoji: '🧘',
        };
      default:
        return {
          text: '🔥 專注模式',
          emoji: '🐉',
          description: '專注擊敗地牢怪物！',
          heroEmoji: '🚶',
        };
    }
  };

  const phaseInfo = getPhaseInfo();
  const isRunning = state.status === PomodoroStatus.RUNNING;
  const isFocus = state.phase === PomodoroPhase.FOCUS;

  // 取得階段顏色
  const getPhaseColors = () => {
    if (isFocus) {
      return {
        primary: COLORS.focus.primary,
        secondary: COLORS.focus.secondary,
        gradient: GRADIENTS.focus,
      };
    } else {
      return {
        primary: COLORS.break.primary,
        secondary: COLORS.break.secondary,
        gradient: GRADIENTS.break,
      };
    }
  };

  const colors = getPhaseColors();
  const progress = calculateProgress(state.timeRemaining, state.totalTime);

  // 英雄行走動畫
  React.useEffect(() => {
    if (isRunning && isFocus) {
      heroPosition.setValue(0);
      Animated.timing(heroPosition, {
        toValue: 1,
        duration: state.totalTime * 1000, // 根據總時間設定動畫時長
        useNativeDriver: true,
      }).start();
    } else {
      heroPosition.setValue(0);
    }
  }, [isRunning, isFocus, state.totalTime, heroPosition]);

  // 計算英雄移動距離（85% 的卡片寬度，減去英雄寬度）
  // 假設卡片內邊距為 32*2 = 64，英雄寬度約為 60
  const cardPadding = 64;
  const heroWidth = 60;
  const maxTranslateX = (screenWidth - cardPadding - heroWidth) * 0.85;

  const heroTranslateX = heroPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxTranslateX],
  });

  return (
    <View style={styles.container}>
      {/* 模式選擇器區域 */}
      <View style={styles.modeSelector}>
        <View
          style={[
            styles.modeButton,
            { marginRight: 8 },
            isFocus && styles.modeButtonActive,
            isFocus && { backgroundColor: colors.primary },
          ]}
        >
          <Text style={[styles.modeButtonText, isFocus && styles.modeButtonTextActive]}>
            🔥 專注模式
          </Text>
        </View>
        <View
          style={[
            styles.modeButton,
            { marginLeft: 8 },
            !isFocus && styles.modeButtonActive,
            !isFocus && { backgroundColor: colors.primary },
          ]}
        >
          <Text style={[styles.modeButtonText, !isFocus && styles.modeButtonTextActive]}>
            ✨ 休息時間
          </Text>
        </View>
      </View>

      {/* 計時器卡片 */}
      <View style={styles.timerCard}>
        {/* 背景效果層 */}
        <View style={[styles.backgroundEffect, { backgroundColor: `${colors.primary}15` }]} />

        {/* 地牢怪物/角色顯示區域 */}
        <View style={styles.characterArea}>
          <Text style={styles.monsterEmoji}>{phaseInfo.emoji}</Text>
          <Text style={styles.descriptionText}>{phaseInfo.description}</Text>
        </View>

        {/* 英雄行走動畫區域 (僅在專注模式顯示) */}
        {isFocus && (
          <View style={styles.walkingPath}>
            <View style={styles.pathLine} />
            <Animated.View
              style={[
                styles.heroContainer,
                {
                  transform: [{ translateX: heroTranslateX }],
                },
              ]}
            >
              <Text style={styles.heroEmoji}>{phaseInfo.heroEmoji}</Text>
              {isRunning && <Text style={styles.dustEmoji}>💨</Text>}
            </Animated.View>
          </View>
        )}

        {/* 時間顯示 */}
        <View style={styles.timerDisplay}>
          <Text style={[styles.timerText, { color: colors.primary }]}>
            {formatTime(state.timeRemaining)}
          </Text>
        </View>

        {/* 進度條 */}
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${progress}%`,
                backgroundColor: colors.primary,
              },
            ]}
          />
        </View>
      </View>

      {/* 統計卡片 */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { marginRight: 6 }]}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statValue}>{state.completedPomodoros}</Text>
          <Text style={styles.statLabel}>今日完成</Text>
        </View>
        <View style={[styles.statCard, { marginHorizontal: 6 }]}>
          <Text style={styles.statEmoji}>⚡</Text>
          <Text style={styles.statValue}>{state.completedPomodoros * 25}</Text>
          <Text style={styles.statLabel}>分鐘專注</Text>
        </View>
        <View style={[styles.statCard, { marginLeft: 6 }]}>
          <Text style={styles.statEmoji}>💎</Text>
          <Text style={styles.statValue}>Lv.5</Text>
          <Text style={styles.statLabel}>冒險等級</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  modeSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    width: '100%',
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.slate[800],
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButtonActive: {
    shadowColor: COLORS.purple[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.tertiary,
  },
  modeButtonTextActive: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
  },
  timerCard: {
    width: '100%',
    backgroundColor: COLORS.background.card,
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border.purple,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  characterArea: {
    alignItems: 'center',
    marginBottom: 24,
  },
  monsterEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  walkingPath: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: 'flex-end',
  },
  pathLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.slate[700],
    opacity: 0.5,
  },
  heroContainer: {
    position: 'absolute',
    bottom: 0,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 48,
  },
  dustEmoji: {
    position: 'absolute',
    bottom: -10,
    fontSize: 20,
    opacity: 0.7,
  },
  timerDisplay: {
    alignItems: 'center',
    marginVertical: 24,
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 2,
    color: COLORS.text.primary,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: COLORS.slate[800],
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 16,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    width: '100%',
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
  },
});

export default PomodoroTimer;

