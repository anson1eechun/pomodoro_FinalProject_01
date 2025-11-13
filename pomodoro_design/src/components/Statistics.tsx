import React, { useState } from 'react';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Target, TrendingUp, Zap } from 'lucide-react';

interface StatisticsProps {
  userData: {
    totalFocusTime: number;
    completedSessions: number;
  };
}

export function Statistics({ userData }: StatisticsProps) {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'all'>('today');

  // 模擬數據
  const todayMinutes = 150; // 2.5 小時
  const todayGoal = 180; // 3 小時
  const progress = (todayMinutes / todayGoal) * 100;
  const streak = 12; // 連續天數
  const rank = 'Top 10%';

  // 本週趨勢數據
  const weekData = [
    { day: '一', minutes: 120 },
    { day: '二', minutes: 150 },
    { day: '三', minutes: 90 },
    { day: '四', minutes: 180 },
    { day: '五', minutes: 150 },
    { day: '六', minutes: 60 },
    { day: '日', minutes: 100 },
  ];

  // 時段分析
  const timeSlots = [
    { time: '22:00-23:00', emoji: '🌙', percentage: 45, minutes: 67 },
    { time: '14:00-15:00', emoji: '🌆', percentage: 30, minutes: 45 },
    { time: '09:00-10:00', emoji: '☀️', percentage: 25, minutes: 38 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-white text-2xl">📊 學習統計</h2>
        <Select value={timeRange} onValueChange={(v: any) => setTimeRange(v)}>
          <SelectTrigger className="w-32 bg-slate-800 border-purple-500/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-purple-500/30">
            <SelectItem value="today">今日</SelectItem>
            <SelectItem value="week">本週</SelectItem>
            <SelectItem value="month">本月</SelectItem>
            <SelectItem value="all">總計</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Today's Main Card */}
      <Card className="bg-gradient-to-br from-purple-600 to-pink-600 border-0 p-8 mb-6 text-white">
        <div className="text-center">
          <p className="text-purple-100 mb-2">今日專注時間</p>
          <div className="text-5xl mb-6">
            {Math.floor(todayMinutes / 60)}.{Math.floor((todayMinutes % 60) / 6)} 小時
          </div>
          
          <Progress value={progress} className="h-3 mb-3 bg-white/20" />
          
          <div className="flex items-center justify-between text-sm text-purple-100">
            <span>{todayMinutes} 分鐘</span>
            <span>{progress.toFixed(0)}% 完成</span>
            <span>目標: {todayGoal} 分鐘</span>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="bg-slate-900/50 backdrop-blur-sm border-purple-500/30 p-4 text-center">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl text-white mb-1">{streak}</div>
          <p className="text-xs text-slate-400">連續天數</p>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-sm border-purple-500/30 p-4 text-center">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl text-white mb-1">{userData.completedSessions}</div>
          <p className="text-xs text-slate-400">完成次數</p>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-sm border-purple-500/30 p-4 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl text-white mb-1">{rank}</div>
          <p className="text-xs text-slate-400">排名</p>
        </Card>
      </div>

      {/* Weekly Trend */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-purple-500/30 p-6 mb-6">
        <h3 className="text-white text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          本週趨勢
        </h3>
        
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weekData}>
            <defs>
              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="day" 
              stroke="#94A3B8" 
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#94A3B8" 
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Line
              type="monotone"
              dataKey="minutes"
              stroke="#8B5CF6"
              strokeWidth={3}
              fill="url(#colorMinutes)"
              dot={{ fill: '#8B5CF6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Time Slot Analysis */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-purple-500/30 p-6 mb-6">
        <h3 className="text-white text-lg mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          最常專注時段
        </h3>
        
        <div className="space-y-4">
          {timeSlots.map((slot, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{slot.emoji}</span>
                  <span className="text-white">{slot.time}</span>
                </div>
                <span className="text-purple-300">{slot.percentage}%</span>
              </div>
              <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
                  style={{ width: `${slot.percentage}%` }}
                />
              </div>
              <p className="text-xs text-slate-400">{slot.minutes} 分鐘</p>
            </div>
          ))}
        </div>
      </Card>

      {/* All Time Stats */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-purple-500/30 p-6">
        <h3 className="text-white text-lg mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-400" />
          總計成就
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-white text-lg">
                {Math.floor(userData.totalFocusTime / 60)}h {userData.totalFocusTime % 60}m
              </div>
              <p className="text-xs text-slate-400">總專注時間</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
            <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <div className="text-white text-lg">{userData.completedSessions}</div>
              <p className="text-xs text-slate-400">完成場次</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-white text-lg">{Math.floor(userData.totalFocusTime / 25)}</div>
              <p className="text-xs text-slate-400">番茄鐘數</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-white text-lg">{streak}</div>
              <p className="text-xs text-slate-400">最長連勝</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
