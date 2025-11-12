import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePomodoro } from '@contexts/PomodoroContext';
import { PomodoroStatus, PomodoroPhase } from '@typings/pomodoro.types';

/**
 * 番茄鐘控制按鈕元件
 * 提供開始、暫停、繼續、停止等控制功能
 */
const PomodoroControls: React.FC = () => {
  const { state, start, pause, resume, stop, skipBreak } = usePomodoro();

  // 渲染主要按鈕
  const renderMainButton = () => {
    switch (state.status) {
      case PomodoroStatus.IDLE:
      case PomodoroStatus.COMPLETED:
        return (
          <TouchableOpacity
            style={[styles.mainButton, styles.startButton]}
            onPress={() => start()}
          >
            <Text style={styles.mainButtonText}>▶ 開始</Text>
          </TouchableOpacity>
        );

      case PomodoroStatus.RUNNING:
        return (
          <TouchableOpacity
            style={[styles.mainButton, styles.pauseButton]}
            onPress={pause}
          >
            <Text style={styles.mainButtonText}>⏸ 暫停</Text>
          </TouchableOpacity>
        );

      case PomodoroStatus.PAUSED:
        return (
          <TouchableOpacity
            style={[styles.mainButton, styles.resumeButton]}
            onPress={resume}
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
          <TouchableOpacity style={[styles.secondaryButton, styles.stopButton]} onPress={stop}>
            <Text style={styles.secondaryButtonText}>⏹ 停止</Text>
          </TouchableOpacity>
        )}

        {/* 跳過休息按鈕 */}
        {isBreak && state.status === PomodoroStatus.IDLE && (
          <TouchableOpacity
            style={[styles.secondaryButton, styles.skipButton]}
            onPress={skipBreak}
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
  },
  mainButton: {
    paddingHorizontal: 60,
    paddingVertical: 18,
    borderRadius: 30,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  startButton: {
    backgroundColor: '#27AE60',
  },
  pauseButton: {
    backgroundColor: '#F39C12',
  },
  resumeButton: {
    backgroundColor: '#3498DB',
  },
  mainButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  secondaryButtons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  secondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopButton: {
    backgroundColor: '#E74C3C',
  },
  skipButton: {
    backgroundColor: '#9B59B6',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default PomodoroControls;