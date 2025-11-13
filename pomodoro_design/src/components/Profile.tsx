import React from 'react';
import { User, Mail, School, Users, Clock, Target, LogOut, Settings, Trophy, Flame } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface ProfileProps {
  userData: {
    name: string;
    email: string;
    school: string;
    guild: string;
    level: number;
    totalFocusTime: number;
    completedSessions: number;
  };
  onLogout: () => void;
}

export function Profile({ userData, onLogout }: ProfileProps) {
  const currentLevelXP = (userData.level - 1) * 500 + userData.totalFocusTime;
  const nextLevelXP = userData.level * 500;
  const xpProgress = ((currentLevelXP % 500) / 500) * 100;

  const achievements = [
    { id: '1', name: '初次專注', icon: '🎯', unlocked: true },
    { id: '2', name: '連續7天', icon: '🔥', unlocked: true },
    { id: '3', name: '累積100小時', icon: '⏰', unlocked: false },
    { id: '4', name: '公會貢獻', icon: '🏆', unlocked: true },
    { id: '5', name: '完成50次', icon: '⭐', unlocked: true },
    { id: '6', name: '午夜戰士', icon: '🌙', unlocked: false },
  ];

  const stats = [
    {
      label: '總專注時間',
      value: `${Math.floor(userData.totalFocusTime / 60)}h ${userData.totalFocusTime % 60}m`,
      icon: Clock,
      color: 'text-blue-400'
    },
    {
      label: '完成場次',
      value: userData.completedSessions,
      icon: Target,
      color: 'text-green-400'
    },
    {
      label: '當前等級',
      value: userData.level,
      icon: Trophy,
      color: 'text-purple-400'
    },
    {
      label: '連續天數',
      value: '12天',
      icon: Flame,
      color: 'text-orange-400'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Profile Header */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-purple-500/30 p-8 mb-6">
        <div className="flex items-start gap-6 mb-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-4xl flex-shrink-0">
            {userData.name.charAt(0)}
          </div>

          {/* User Info */}
          <div className="flex-grow">
            <h2 className="text-white text-2xl mb-2">{userData.name}</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{userData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <School className="w-4 h-4" />
                <span className="text-sm">{userData.school}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Users className="w-4 h-4" />
                <span className="text-sm">{userData.guild}</span>
              </div>
            </div>

            <Badge className="bg-purple-500/20 text-purple-300">
              等級 {userData.level} 冒險者
            </Badge>
          </div>

          {/* Settings Button */}
          <Button
            variant="outline"
            size="icon"
            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Level Progress */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">等級進度</span>
            <span className="text-purple-300 text-sm">
              {currentLevelXP % 500} / 500 XP
            </span>
          </div>
          <Progress value={xpProgress} className="h-2" />
          <p className="text-slate-400 text-xs mt-2">
            再專注 {500 - (currentLevelXP % 500)} 分鐘升到等級 {userData.level + 1}
          </p>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="bg-slate-900/50 backdrop-blur-sm border-purple-500/30 p-4 text-center"
            >
              <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-white text-2xl mb-1">{stat.value}</div>
              <p className="text-slate-400 text-xs">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Achievements */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-purple-500/30 p-6 mb-6">
        <h3 className="text-white text-xl mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-purple-400" />
          成就徽章
        </h3>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`text-center p-4 rounded-lg transition-all ${
                achievement.unlocked
                  ? 'bg-purple-500/20 border border-purple-500/50'
                  : 'bg-slate-800/50 border border-slate-700 opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <p className="text-xs text-slate-300">{achievement.name}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-purple-500/30 p-6 mb-6">
        <h3 className="text-white text-xl mb-4">最近活動</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
            <div className="text-2xl">🎯</div>
            <div className="flex-grow">
              <p className="text-slate-300 text-sm">完成專注時段</p>
              <p className="text-slate-500 text-xs">2小時前</p>
            </div>
            <span className="text-green-400 text-sm">+10 金幣</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
            <div className="text-2xl">☕</div>
            <div className="flex-grow">
              <p className="text-slate-300 text-sm">兌換星巴克咖啡券</p>
              <p className="text-slate-500 text-xs">昨天</p>
            </div>
            <span className="text-red-400 text-sm">-50 金幣</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
            <div className="text-2xl">🏆</div>
            <div className="flex-grow">
              <p className="text-slate-300 text-sm">公會排名上升</p>
              <p className="text-slate-500 text-xs">3天前</p>
            </div>
            <span className="text-purple-400 text-sm">+5 XP</span>
          </div>
        </div>
      </Card>

      {/* Logout Button */}
      <Button
        onClick={onLogout}
        variant="outline"
        className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20"
      >
        <LogOut className="w-4 h-4 mr-2" />
        登出
      </Button>
    </div>
  );
}
