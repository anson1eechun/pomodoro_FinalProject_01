import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './ui/sonner';

interface RewardShopProps {
  userCoins: number;
  onPurchase: (cost: number) => boolean;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  category: 'physical' | 'digital' | 'experience';
  stock?: number;
}

const rewards: Reward[] = [
  {
    id: '1',
    name: '星巴克咖啡券',
    description: '一杯中杯飲料兌換券',
    cost: 50,
    icon: '☕',
    category: 'physical',
    stock: 15
  },
  {
    id: '2',
    name: '圖書館VIP座位',
    description: '預約一週的專屬座位',
    cost: 100,
    icon: '📚',
    category: 'experience',
    stock: 5
  },
  {
    id: '3',
    name: '電影票',
    description: '一張電影院票券',
    cost: 80,
    icon: '🎬',
    category: 'physical',
    stock: 20
  },
  {
    id: '4',
    name: 'Spotify Premium',
    description: '一個月會員',
    cost: 120,
    icon: '🎵',
    category: 'digital'
  },
  {
    id: '5',
    name: '健身房體驗券',
    description: '三天免費體驗',
    cost: 60,
    icon: '💪',
    category: 'experience',
    stock: 10
  },
  {
    id: '6',
    name: '美食街餐券',
    description: '100元餐券',
    cost: 90,
    icon: '🍜',
    category: 'physical',
    stock: 25
  },
  {
    id: '7',
    name: 'Netflix',
    description: '一個月會員',
    cost: 150,
    icon: '📺',
    category: 'digital'
  },
  {
    id: '8',
    name: '桌遊聚會券',
    description: '免費參加一次桌遊活動',
    cost: 70,
    icon: '🎲',
    category: 'experience',
    stock: 8
  },
  {
    id: '9',
    name: '課程折扣券',
    description: '任何線上課程9折',
    cost: 40,
    icon: '🎓',
    category: 'digital'
  },
];

export function RewardShop({ userCoins, onPurchase }: RewardShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'physical' | 'digital' | 'experience'>('all');
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());

  const filteredRewards = selectedCategory === 'all'
    ? rewards
    : rewards.filter(r => r.category === selectedCategory);

  const handlePurchase = (reward: Reward) => {
    if (purchasedItems.has(reward.id)) {
      toast.error('你已經購買過這個獎勵了！');
      return;
    }

    const success = onPurchase(reward.cost);
    if (success) {
      setPurchasedItems(new Set([...purchasedItems, reward.id]));
      toast.success(`成功購買 ${reward.name}！`, {
        description: '獎勵已發送到你的郵箱',
      });
    } else {
      toast.error('金幣不足！', {
        description: `還需要 ${reward.cost - userCoins} 金幣`,
      });
    }
  };

  const categories = [
    { id: 'all', label: '全部', icon: '🏪' },
    { id: 'physical', label: '實體獎勵', icon: '🎁' },
    { id: 'digital', label: '數位獎勵', icon: '💻' },
    { id: 'experience', label: '體驗獎勵', icon: '✨' },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <Toaster />
      
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-white text-3xl mb-2">獎勵商店</h2>
        <p className="text-purple-300">用你的金幣兌換真實獎勵</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => {
          const canAfford = userCoins >= reward.cost;
          const isPurchased = purchasedItems.has(reward.id);

          return (
            <motion.div
              key={reward.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all"
            >
              <div className="p-6">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{reward.icon}</div>
                  {reward.stock !== undefined && (
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                      剩餘 {reward.stock}
                    </Badge>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-white text-xl mb-2">{reward.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{reward.description}</p>

                {/* Price & Purchase */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-amber-900 text-sm">
                      ¤
                    </div>
                    <span className={`text-lg ${canAfford ? 'text-amber-300' : 'text-red-400'}`}>
                      {reward.cost}
                    </span>
                  </div>

                  <Button
                    onClick={() => handlePurchase(reward)}
                    disabled={!canAfford || isPurchased}
                    className={`${
                      isPurchased
                        ? 'bg-green-600 hover:bg-green-600'
                        : canAfford
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                        : 'bg-slate-700'
                    } text-white`}
                  >
                    {isPurchased ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        已購買
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        購買
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredRewards.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏺</div>
          <p className="text-slate-400">這個分類目前沒有獎勵</p>
        </div>
      )}
    </div>
  );
}
