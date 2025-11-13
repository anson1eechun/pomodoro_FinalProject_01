import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flame, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';

interface PomodoroTimerProps {
  onSessionComplete: (minutes: number) => void;
  userLevel: number;
}

export function PomodoroTimer({ onSessionComplete, userLevel }: PomodoroTimerProps) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [sessionCount, setSessionCount] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const totalSeconds = mode === 'focus' ? 25 * 60 : 5 * 60;
  const currentSeconds = minutes * 60 + seconds;
  const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // 完成一個時段
            handleComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  const handleComplete = () => {
    setIsActive(false);
    
    if (mode === 'focus') {
      setShowReward(true);
      onSessionComplete(25);
      setSessionCount(sessionCount + 1);
      
      setTimeout(() => {
        setShowReward(false);
        setMode('break');
        setMinutes(5);
        setSeconds(0);
      }, 3000);
    } else {
      setMode('focus');
      setMinutes(25);
      setSeconds(0);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === 'focus' ? 25 : 5);
    setSeconds(0);
  };

  const switchMode = (newMode: 'focus' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    setMinutes(newMode === 'focus' ? 25 : 5);
    setSeconds(0);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Mode Selector */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => switchMode('focus')}
          className={`flex-1 py-3 rounded-xl transition-all ${
            mode === 'focus'
              ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Flame className="w-5 h-5" />
            <span>專注模式</span>
          </div>
        </button>
        <button
          onClick={() => switchMode('break')}
          className={`flex-1 py-3 rounded-xl transition-all ${
            mode === 'break'
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>休息時間</span>
          </div>
        </button>
      </div>

      {/* Timer Display */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 mb-8 relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10" />
        
        {/* Walking Path Background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-800/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-8 left-0 right-0 h-1 bg-slate-700/50" />
        
        {/* Dungeon Monster (Enemy) */}
        <div className="relative text-center mb-8">
          <motion.div
            animate={{
              scale: isActive && mode === 'focus' ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isActive ? Infinity : 0,
            }}
            className="text-8xl mb-4"
          >
            {mode === 'focus' ? '🐉' : '🧘'}
          </motion.div>
          <p className="text-purple-300">
            {mode === 'focus' ? '專注擊敗地牢怪物！' : '休息恢復體力'}
          </p>
        </div>

        {/* Hero Walking Animation */}
        {mode === 'focus' && (
          <div className="absolute bottom-12 left-0 right-0 h-24 pointer-events-none">
            <motion.div
              animate={{
                x: isActive ? ['0%', '85%'] : '0%',
              }}
              transition={{
                duration: totalSeconds,
                ease: 'linear',
              }}
              className="relative w-20 h-20"
            >
              {/* Hero Character */}
              <motion.div
                animate={
                  isActive
                    ? {
                        rotate: [-5, 5, -5],
                        y: [0, -8, 0],
                      }
                    : { rotate: 0, y: 0 }
                }
                transition={{
                  duration: 0.6,
                  repeat: isActive ? Infinity : 0,
                  ease: 'easeInOut',
                }}
                className="text-6xl"
              >
                🚶
              </motion.div>
              
              {/* Walking dust effect */}
              {isActive && (
                <motion.div
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 2],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl"
                >
                  💨
                </motion.div>
              )}
            </motion.div>
          </div>
        )}

        {/* Timer */}
        <div className="text-center mb-6">
          <div className="text-7xl text-white mb-4 font-mono">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={toggleTimer}
            size="lg"
            className={`${
              mode === 'focus'
                ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
            } text-white px-8`}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                暫停
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                開始
              </>
            )}
          </Button>
          <Button
            onClick={resetTimer}
            size="lg"
            variant="outline"
            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            重置
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl text-white mb-1">{sessionCount}</div>
          <p className="text-sm text-slate-400">今日完成</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-2xl text-white mb-1">{sessionCount * 25}</div>
          <p className="text-sm text-slate-400">分鐘專注</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">💎</div>
          <div className="text-2xl text-white mb-1">Lv.{userLevel}</div>
          <p className="text-sm text-slate-400">冒險等級</p>
        </div>
      </div>

      {/* Reward Animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          >
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-center shadow-2xl">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: 3,
                }}
                className="text-8xl mb-4"
              >
                💰
              </motion.div>
              <h2 className="text-white text-3xl mb-2">勝利！</h2>
              <p className="text-amber-100 text-xl">獲得 10 金幣</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
