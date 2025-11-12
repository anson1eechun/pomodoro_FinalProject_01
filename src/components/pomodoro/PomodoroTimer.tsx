import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePomodoro } from '@contexts/PomodoroContext';
import { PomodoroPhase } from '@typings/pomodoro.types';
import { formatTime, calculateProgress } from '@utils/timeUtils';

/**
 * 番茄鐘計時器顯示元件
 * 顯示當前時間、階段和進度
 */
const PomodoroTimer: React.FC = () => {
  const { state } = usePomodoro();

  // 取得階段顯示文字
  const getPhaseText = (): string => {
    switch (state.phase) {
      case PomodoroPhase.FOCUS:
        return '🎯 專注時段';
      case PomodoroPhase.SHORT_BREAK:
        return '☕ 短休息';
      case PomodoroPhase.LONG_BREAK:
        return '🌟 長休息';
      default:
        return '🎯 專注時段';
    }
  };

  // 取得階段顏色
  const getPhaseColor = (): string => {
    switch (state.phase) {
      case PomodoroPhase.FOCUS:
        return '#E74C3C';
      case PomodoroPhase.SHORT_BREAK:
        return '#3498DB';
      case PomodoroPhase.LONG_BREAK:
        return '#9B59B6';
      default:
        return '#E74C3C';
    }
  };

  // 計算進度
  const progress = calculateProgress(state.timeRemaining, state.totalTime);

  return (
    <View style={styles.container}>
      {/* 階段標籤 */}
      <Text style={[styles.phaseText, { color: getPhaseColor() }]}>
        {getPhaseText()}
      </Text>

      {/* 時間顯示 */}
      <View style={styles.timerContainer}>
        <Text style={[styles.timerText, { color: getPhaseColor() }]}>
          {formatTime(state.timeRemaining)}
        </Text>
      </View>

      {/* 進度條 */}
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${progress}%`, backgroundColor: getPhaseColor() },
          ]}
        />
      </View>

      {/* 進度百分比 */}
      <Text style={styles.progressText}>{progress}%</Text>

      {/* 已完成番茄數 */}
      {state.phase === PomodoroPhase.FOCUS && (
        <Text style={styles.completedText}>
          已完成: {state.completedPomodoros} 個番茄
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  phaseText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timerContainer: {
    marginVertical: 20,
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 4,
  },
  progressContainer: {
    width: '80%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginVertical: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 8,
  },
  completedText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 20,
  },
});

export default PomodoroTimer;

