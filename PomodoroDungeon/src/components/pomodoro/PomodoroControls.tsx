import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePomodoro } from '@contexts/PomodoroContext';
import { PomodoroStatus, PomodoroPhase } from '@typings/pomodoro.types';
import { COLORS, GRADIENTS } from '@constants/colors';

/**
 * 番茄鐘控制按鈕元件
 * 提供開始、暫停、繼續、停止等控制功能
 */
const PomodoroControls: React.FC = () => {
  const { state, start, pause, resume, stop, skipBreak } = usePomodoro();

  const isFocus = state.phase === PomodoroPhase.FOCUS;
  const buttonColors = isFocus ? COLORS.focus : COLORS.break;

  // 渲染主要按鈕
  const renderMainButton = () => {
    switch (state.status) {
      case PomodoroStatus.IDLE:
      case PomodoroStatus.COMPLETED:
        return (
          <TouchableOpacity
            style={[
              styles.mainButton,
              {
                backgroundColor: buttonColors.primary,
                shadowColor: buttonColors.primary,
              },
            ]}
            onPress={() => start()}
            activeOpacity={0.8}
          >
            <Text style={styles.mainButtonText}>▶ 開始</Text>
          </TouchableOpacity>
        );

      case PomodoroStatus.RUNNING:
        return (
          <TouchableOpacity
            style={[
              styles.mainButton,
              {
                backgroundColor: buttonColors.primary,
                shadowColor: buttonColors.primary,
              },
            ]}
            onPress={pause}
            activeOpacity={0.8}
          >
            <Text style={styles.mainButtonText}>⏸ 暫停</Text>
          </TouchableOpacity>
        );

      case PomodoroStatus.PAUSED:
        return (
          <TouchableOpacity
            style={[
              styles.mainButton,
              {
                backgroundColor: buttonColors.primary,
                shadowColor: buttonColors.primary,
              },
            ]}
            onPress={resume}
            activeOpacity={0.8}
          >
            <Text style={styles.mainButtonText}>▶ 繼續</Text>
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  // 渲染次要按鈕
  const renderSecondaryButtons = () => {
    const isActive = state.status !== PomodoroStatus.IDLE;
    const isBreak = state.phase !== PomodoroPhase.FOCUS;

    return (
      <View style={styles.secondaryButtons}>
        {/* 停止按鈕 */}
        {isActive && (
          <TouchableOpacity
            style={[styles.secondaryButton, styles.stopButton, { marginRight: 6 }]}
            onPress={stop}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>⏹ 重置</Text>
          </TouchableOpacity>
        )}

        {/* 跳過休息按鈕 */}
        {isBreak && state.status === PomodoroStatus.IDLE && (
          <TouchableOpacity
            style={[styles.secondaryButton, styles.skipButton, { marginLeft: 6 }]}
            onPress={skipBreak}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>⏭ 跳過休息</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderMainButton()}
      {renderSecondaryButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  mainButton: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 16,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  mainButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  secondaryButtons: {
    flexDirection: 'row',
    marginTop: 16,
    width: '100%',
    justifyContent: 'center',
  },
  secondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border.purple,
    backgroundColor: COLORS.background.card,
  },
  stopButton: {
    backgroundColor: COLORS.background.card,
  },
  skipButton: {
    backgroundColor: COLORS.background.card,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
});

export default PomodoroControls;