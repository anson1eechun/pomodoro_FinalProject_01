import React, { useState } from 'react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Bell, 
  Palette, 
  User, 
  Info,
  LogOut
} from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
}

export function Settings({ onBack, onLogout }: SettingsProps) {
  const [focusDuration, setFocusDuration] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [longBreakInterval, setLongBreakInterval] = useState(4);

  const [notifications, setNotifications] = useState({
    complete: true,
    breakReminder: true,
    dailyGoal: true,
    guildActivity: false,
  });

  const settingSections = [
    {
      icon: Clock,
      title: '⏱️ 計時器設定',
      items: [
        {
          label: '專注時長',
          type: 'number',
          value: focusDuration,
          onChange: setFocusDuration,
          suffix: '分鐘',
        },
        {
          label: '休息時長',
          type: 'number',
          value: shortBreak,
          onChange: setShortBreak,
          suffix: '分鐘',
        },
        {
          label: '長休息時長',
          type: 'number',
          value: longBreak,
          onChange: setLongBreak,
          suffix: '分鐘',
        },
        {
          label: '長休息間隔',
          type: 'number',
          value: longBreakInterval,
          onChange: setLongBreakInterval,
          suffix: '次',
        },
      ],
    },
    {
      icon: Bell,
      title: '🔔 通知設定',
      items: [
        {
          label: '完成通知',
          type: 'switch',
          value: notifications.complete,
          onChange: (v: boolean) => setNotifications({ ...notifications, complete: v }),
        },
        {
          label: '休息提醒',
          type: 'switch',
          value: notifications.breakReminder,
          onChange: (v: boolean) => setNotifications({ ...notifications, breakReminder: v }),
        },
        {
          label: '每日目標提醒',
          type: 'switch',
          value: notifications.dailyGoal,
          onChange: (v: boolean) => setNotifications({ ...notifications, dailyGoal: v }),
        },
        {
          label: '公會活動通知',
          type: 'switch',
          value: notifications.guildActivity,
          onChange: (v: boolean) => setNotifications({ ...notifications, guildActivity: v }),
        },
      ],
    },
    {
      icon: Palette,
      title: '🎨 外觀設定',
      items: [
        {
          label: '主題',
          type: 'select',
          value: '深色',
          options: ['深色', '淺色', '自動'],
        },
        {
          label: '語言',
          type: 'select',
          value: '繁體中文',
          options: ['繁體中文', 'English', '简体中文', '日本語'],
        },
      ],
    },
    {
      icon: User,
      title: '👤 帳號設定',
      items: [
        { label: '編輯個人資料', type: 'link' },
        { label: '更改密碼', type: 'link' },
        { label: '隱私設定', type: 'link' },
      ],
    },
    {
      icon: Info,
      title: 'ℹ️ 其他',
      items: [
        { label: '關於我們', type: 'link' },
        { label: '服務條款', type: 'link' },
        { label: '隱私政策', type: 'link' },
        { label: '版本', type: 'text', value: 'v1.0.0' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 pb-24">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-purple-500/30 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-purple-300 hover:text-purple-200 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl">設定</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {settingSections.map((section, index) => (
          <Card
            key={index}
            className="bg-slate-900/50 backdrop-blur-sm border-purple-500/30 p-6"
          >
            <h3 className="text-white text-lg mb-4 flex items-center gap-2">
              <section.icon className="w-5 h-5 text-purple-400" />
              {section.title}
            </h3>

            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0"
                >
                  <Label className="text-slate-300">{item.label}</Label>

                  {item.type === 'number' && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={item.value}
                        onChange={(e) => item.onChange?.(Number(e.target.value))}
                        className="w-20 bg-slate-800 border-purple-500/30 text-white text-center"
                      />
                      <span className="text-slate-400 text-sm">{item.suffix}</span>
                    </div>
                  )}

                  {item.type === 'switch' && (
                    <Switch
                      checked={item.value as boolean}
                      onCheckedChange={item.onChange}
                    />
                  )}

                  {item.type === 'select' && (
                    <button className="flex items-center gap-2 text-purple-300 hover:text-purple-200">
                      <span>{item.value}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

                  {item.type === 'link' && (
                    <button className="text-purple-300 hover:text-purple-200">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}

                  {item.type === 'text' && (
                    <span className="text-slate-400">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          登出帳號
        </Button>
      </div>
    </div>
  );
}
