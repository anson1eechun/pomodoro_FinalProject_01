import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import PomodoroTimer from '@components/pomodoro/PomodoroTimer';
import PomodoroControls from '@components/pomodoro/PomodoroControls';
import PomodoroStats from '@components/pomodoro/PomodoroStats';
import { COLORS } from '@constants/colors';

/**
 * 番茄鐘主畫面
 * 整合計時器、控制按鈕和統計資料 - 遊戲化設計
 */
const PomodoroScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background.primary} />
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  timerSection: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  statsSection: {
    flex: 1,
    paddingTop: 20,
    minHeight: 400,
  },
});

export default PomodoroScreen;