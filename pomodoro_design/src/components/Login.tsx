import React, { useState } from 'react';
import { Mail, Lock, Swords } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      // 驗證 EDU email
      if (!email.endsWith('.edu') && !email.includes('edu.')) {
        alert('請使用學校的 EDU email 註冊');
        return;
      }
    }
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1672940095109-4bec8a0b495e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdW5nZW9uJTIwZGFyayUyMGZhbnRhc3l8ZW58MXx8fHwxNzYzMDIyMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Swords className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white text-2xl mb-2">地牢專注</h1>
            <p className="text-purple-100">進入學習的冒險世界</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">
                    冒險者名稱
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="輸入你的名稱"
                    className="bg-slate-800 border-purple-500/30 text-white placeholder:text-slate-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school" className="text-slate-300">
                    學校
                  </Label>
                  <Input
                    id="school"
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="例如：台灣大學"
                    className="bg-slate-800 border-purple-500/30 text-white placeholder:text-slate-500"
                    required
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                EDU Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@school.edu"
                  className="pl-10 bg-slate-800 border-purple-500/30 text-white placeholder:text-slate-500"
                  required
                />
              </div>
              {isSignUp && (
                <p className="text-xs text-purple-300">
                  必須使用學校的 .edu 電子郵件
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                密碼
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-slate-800 border-purple-500/30 text-white placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {isSignUp ? '開始冒險' : '登入'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-300 hover:text-purple-200 text-sm"
              >
                {isSignUp ? '已有帳號？返回登入' : '還沒有帳號？立即註冊'}
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3">
            <div className="text-2xl mb-1">⚔️</div>
            <p className="text-xs text-purple-300">專注戰鬥</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3">
            <div className="text-2xl mb-1">💰</div>
            <p className="text-xs text-purple-300">賺取金幣</p>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3">
            <div className="text-2xl mb-1">🏆</div>
            <p className="text-xs text-purple-300">公會競爭</p>
          </div>
        </div>
      </div>
    </div>
  );
}
