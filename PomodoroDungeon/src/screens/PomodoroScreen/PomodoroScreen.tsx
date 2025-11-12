import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import PomodoroTimer from '@components/pomodoro/PomodoroTimer';
import PomodoroControls from '@components/pomodoro/PomodoroControls';
import PomodoroStats from '@components/pomodoro/PomodoroStats';

/**
 * 番茄鐘主畫面
 * 整合計時器、控制按鈕和統計資料
 */
const PomodoroScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 計時器區域 */}
        <View style={styles.timerSection}>
          <PomodoroTimer />
          <PomodoroControls />
        </View>

        {/* 統計資料區域 */}
        <View style={styles.statsSection}>
          <PomodoroStats />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  timerSection: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingBottom: 30,
  },
  statsSection: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    minHeight: 400,
  },
});

export default PomodoroScreen;