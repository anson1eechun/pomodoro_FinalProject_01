import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { Login } from './components/Login';
import { PomodoroTimer } from './components/PomodoroTimer';
import { RewardShop } from './components/RewardShop';
import { GuildRanking } from './components/GuildRanking';
import { Profile } from './components/Profile';
import { Statistics } from './components/Statistics';
import { Settings } from './components/Settings';
import { Swords, Trophy, ShoppingBag, User, Settings as SettingsIcon, BarChart3 } from 'lucide-react';

type AppState = 'splash' | 'onboarding' | 'login' | 'main';
type MainView = 'timer' | 'shop' | 'ranking' | 'profile' | 'stats' | 'settings';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [currentView, setCurrentView] = useState<MainView>('timer');
  const [userCoins, setUserCoins] = useState(150);
  const [userData, setUserData] = useState({
    name: '勇敢的冒險者',
    email: 'student@edu.example.com',
    school: '台灣大學',
    guild: '午夜學者公會',
    level: 5,
    totalFocusTime: 1250, // 分鐘
    completedSessions: 42
  });

  const handleLogin = (email: string, password: string) => {
    // UI 原型 - 模擬登入
    setAppState('main');
  };

  const handleLogout = () => {
    setAppState('login');
    setCurrentView('timer');
  };

  const handleSessionComplete = (minutes: number) => {
    // 每完成一個番茄鐘獲得 10 金幣
    const coinsEarned = Math.floor(minutes / 25) * 10;
    setUserCoins(prev => prev + coinsEarned);
    setUserData(prev => ({
      ...prev,
      totalFocusTime: prev.totalFocusTime + minutes,
      completedSessions: prev.completedSessions + 1
    }));
  };

  const handlePurchase = (cost: number) => {
    if (userCoins >= cost) {
      setUserCoins(prev => prev - cost);
      return true;
    }
    return false;
  };

  // Splash Screen
  if (appState === 'splash') {
    return (
      <SplashScreen
        onComplete={() => {
          // 檢查是否首次使用
          const isFirstTime = localStorage.getItem('hasSeenOnboarding') !== 'true';
          if (isFirstTime) {
            setAppState('onboarding');
          } else {
            setAppState('login');
          }
        }}
      />
    );
  }

  // Onboarding
  if (appState === 'onboarding') {
    return (
      <Onboarding
        onComplete={() => {
          localStorage.setItem('hasSeenOnboarding', 'true');
          setAppState('login');
        }}
      />
    );
  }

  // Login
  if (appState === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  // Settings View (full screen)
  if (currentView === 'settings') {
    return (
      <Settings
        onBack={() => setCurrentView('profile')}
        onLogout={handleLogout}
      />
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-purple-500/30 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white">地牢專注</h1>
              <p className="text-purple-300 text-sm">{userData.name} - Lv.{userData.level}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg px-4 py-2 flex items-center gap-2">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-amber-900">
                ¤
              </div>
              <span className="text-amber-300">{userCoins}</span>
            </div>
            
            <button
              onClick={() => setCurrentView('settings')}
              className="text-purple-300 hover:text-purple-200 transition-colors"
            >
              <SettingsIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {currentView === 'timer' && (
          <div className="px-4 py-8">
            <PomodoroTimer 
              onSessionComplete={handleSessionComplete}
              userLevel={userData.level}
            />
          </div>
        )}
        {currentView === 'stats' && (
          <Statistics userData={userData} />
        )}
        {currentView === 'shop' && (
          <RewardShop 
            userCoins={userCoins}
            onPurchase={handlePurchase}
          />
        )}
        {currentView === 'ranking' && (
          <GuildRanking userGuild={userData.guild} />
        )}
        {currentView === 'profile' && (
          <Profile 
            userData={userData}
            onLogout={handleLogout}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-purple-500/30 z-20">
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setCurrentView('timer')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                currentView === 'timer'
                  ? 'bg-purple-500/20 text-purple-300 scale-105'
                  : 'text-slate-400 hover:text-purple-300'
              }`}
            >
              <Swords className="w-6 h-6" />
              <span className="text-xs">專注</span>
            </button>

            <button
              onClick={() => setCurrentView('stats')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                currentView === 'stats'
                  ? 'bg-purple-500/20 text-purple-300 scale-105'
                  : 'text-slate-400 hover:text-purple-300'
              }`}
            >
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs">統計</span>
            </button>

            <button
              onClick={() => setCurrentView('shop')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                currentView === 'shop'
                  ? 'bg-purple-500/20 text-purple-300 scale-105'
                  : 'text-slate-400 hover:text-purple-300'
              }`}
            >
              <ShoppingBag className="w-6 h-6" />
              <span className="text-xs">商店</span>
            </button>

            <button
              onClick={() => setCurrentView('ranking')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                currentView === 'ranking'
                  ? 'bg-purple-500/20 text-purple-300 scale-105'
                  : 'text-slate-400 hover:text-purple-300'
              }`}
            >
              <Trophy className="w-6 h-6" />
              <span className="text-xs">排名</span>
            </button>

            <button
              onClick={() => setCurrentView('profile')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                currentView === 'profile'
                  ? 'bg-purple-500/20 text-purple-300 scale-105'
                  : 'text-slate-400 hover:text-purple-300'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs">個人</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
