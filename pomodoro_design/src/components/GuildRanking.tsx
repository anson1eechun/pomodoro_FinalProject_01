import React, { useState } from 'react';
import { Trophy, TrendingUp, Users, Crown, Medal, Award } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GuildRankingProps {
  userGuild: string;
}

interface GuildData {
  id: string;
  name: string;
  school: string;
  totalMinutes: number;
  members: number;
  avgMinutesPerMember: number;
  change: number;
}

interface PlayerData {
  id: string;
  name: string;
  school: string;
  totalMinutes: number;
  level: number;
  guild: string;
}

const guilds: GuildData[] = [
  {
    id: '1',
    name: '深夜學者公會',
    school: '台灣大學',
    totalMinutes: 12500,
    members: 45,
    avgMinutesPerMember: 278,
    change: 2
  },
  {
    id: '2',
    name: '黎明戰士團',
    school: '清華大學',
    totalMinutes: 11800,
    members: 38,
    avgMinutesPerMember: 311,
    change: -1
  },
  {
    id: '3',
    name: '午夜學者公會',
    school: '台灣大學',
    totalMinutes: 10900,
    members: 42,
    avgMinutesPerMember: 260,
    change: 1
  },
  {
    id: '4',
    name: '專注騎士團',
    school: '交通大學',
    totalMinutes: 9800,
    members: 35,
    avgMinutesPerMember: 280,
    change: -2
  },
  {
    id: '5',
    name: '學習勇者聯盟',
    school: '成功大學',
    totalMinutes: 9200,
    members: 40,
    avgMinutesPerMember: 230,
    change: 0
  },
  {
    id: '6',
    name: '圖書館守護者',
    school: '政治大學',
    totalMinutes: 8500,
    members: 32,
    avgMinutesPerMember: 266,
    change: 1
  },
];

const players: PlayerData[] = [
  {
    id: '1',
    name: '學霸王',
    school: '台灣大學',
    totalMinutes: 2150,
    level: 12,
    guild: '深夜學者公會'
  },
  {
    id: '2',
    name: '專注大師',
    school: '清華大學',
    totalMinutes: 1980,
    level: 11,
    guild: '黎明戰士團'
  },
  {
    id: '3',
    name: '學習狂人',
    school: '台灣大學',
    totalMinutes: 1850,
    level: 10,
    guild: '午夜學者公會'
  },
  {
    id: '4',
    name: '考試戰神',
    school: '交通大學',
    totalMinutes: 1720,
    level: 10,
    guild: '專注騎士團'
  },
  {
    id: '5',
    name: '勇敢的冒險者',
    school: '台灣大學',
    totalMinutes: 1250,
    level: 5,
    guild: '午夜學者公會'
  },
];

export function GuildRanking({ userGuild }: GuildRankingProps) {
  const [rankingType, setRankingType] = useState<'guild' | 'player'>('guild');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-slate-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-slate-500 text-lg">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border-yellow-500/50';
      case 2:
        return 'bg-gradient-to-r from-slate-600/20 to-slate-500/20 border-slate-400/50';
      case 3:
        return 'bg-gradient-to-r from-amber-700/20 to-orange-700/20 border-amber-600/50';
      default:
        return 'border-purple-500/30';
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1738697216532-aae28e6dffaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZ3VpbGQlMjBiYW5uZXJ8ZW58MXx8fHwxNzYzMDIyMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Guild Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-white text-2xl mb-1">公會競技場</h2>
              <p className="text-purple-300">你的公會：{userGuild}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={rankingType} onValueChange={(v) => setRankingType(v as any)} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800">
          <TabsTrigger value="guild">公會排名</TabsTrigger>
          <TabsTrigger value="player">個人排名</TabsTrigger>
        </TabsList>

        {/* Guild Rankings */}
        <TabsContent value="guild" className="space-y-4 mt-6">
          {guilds.map((guild, index) => {
            const rank = index + 1;
            const isUserGuild = guild.name === userGuild;

            return (
              <div
                key={guild.id}
                className={`bg-slate-900/50 backdrop-blur-sm border ${getRankBg(rank)} rounded-xl p-6 ${
                  isUserGuild ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 flex items-center justify-center">
                    {getRankIcon(rank)}
                  </div>

                  {/* Guild Info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white text-lg">{guild.name}</h3>
                      {isUserGuild && (
                        <Badge className="bg-purple-500/20 text-purple-300">你的公會</Badge>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm">{guild.school}</p>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <span className="text-white text-xl">{guild.totalMinutes.toLocaleString()}</span>
                      <span className="text-slate-400 text-sm">分鐘</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Users className="w-4 h-4" />
                        <span>{guild.members}</span>
                      </div>
                      <div className={`flex items-center gap-1 ${
                        guild.change > 0 ? 'text-green-400' : guild.change < 0 ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        <TrendingUp className={`w-4 h-4 ${guild.change < 0 ? 'rotate-180' : ''}`} />
                        <span>{Math.abs(guild.change)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </TabsContent>

        {/* Player Rankings */}
        <TabsContent value="player" className="space-y-4 mt-6">
          {players.map((player, index) => {
            const rank = index + 1;
            const isCurrentUser = player.name === '勇敢的冒險者';

            return (
              <div
                key={player.id}
                className={`bg-slate-900/50 backdrop-blur-sm border ${getRankBg(rank)} rounded-xl p-6 ${
                  isCurrentUser ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 flex items-center justify-center">
                    {getRankIcon(rank)}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl">
                    {player.name.charAt(0)}
                  </div>

                  {/* Player Info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white text-lg">{player.name}</h3>
                      {isCurrentUser && (
                        <Badge className="bg-purple-500/20 text-purple-300">你</Badge>
                      )}
                      <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                        Lv.{player.level}
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-sm">{player.guild} • {player.school}</p>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-white text-xl">{player.totalMinutes.toLocaleString()}</span>
                      <span className="text-slate-400 text-sm">分鐘</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </TabsContent>
      </Tabs>

      {/* Season Info */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 text-center">
        <p className="text-slate-400 mb-2">賽季結束倒數</p>
        <div className="text-white text-3xl mb-1">7 天 14 小時</div>
        <p className="text-purple-300 text-sm">前三名公會將獲得特殊獎勵！</p>
      </div>
    </div>
  );
}
