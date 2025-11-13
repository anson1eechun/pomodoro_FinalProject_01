import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    emoji: '🚶⚔️🐉',
    title: '專注 25 分鐘',
    description: '化身勇者,擊敗分心怪物\n每次專注都是一場史詩戰鬥',
    animation: 'battle',
  },
  {
    id: 2,
    emoji: '💰🏆',
    title: '賺取真實獎勵',
    description: '完成任務賺金幣,兌換\n校園優惠券、會員、禮品',
    animation: 'reward',
  },
  {
    id: 3,
    emoji: '🏆📊',
    title: '加入公會戰鬥',
    description: '與同學組隊,為學校榮譽\n而戰,爬上排行榜榜首',
    animation: 'ranking',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 text-purple-300 hover:text-purple-200 transition-colors z-10"
      >
        跳過
      </button>

      {/* Content */}
      <div className="h-full flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.3 }}
            className="text-center w-full max-w-md"
          >
            {/* Animated illustration */}
            <div className="mb-12 h-48 flex items-center justify-center">
              {slide.animation === 'battle' && (
                <div className="flex items-center gap-8">
                  <motion.div
                    className="text-6xl"
                    animate={{
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  >
                    🚶⚔️
                  </motion.div>
                  <motion.div
                    className="text-7xl"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    🐉
                  </motion.div>
                </div>
              )}

              {slide.animation === 'reward' && (
                <div className="relative">
                  <motion.div
                    className="text-8xl"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    💰
                  </motion.div>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-3xl"
                      style={{
                        left: `${50 + Math.cos((i * 72 * Math.PI) / 180) * 80}px`,
                        top: `${50 + Math.sin((i * 72 * Math.PI) / 180) * 80}px`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>
              )}

              {slide.animation === 'ranking' && (
                <div className="space-y-4">
                  {[1, 2, 3].map((rank) => (
                    <motion.div
                      key={rank}
                      className="flex items-center gap-4 bg-slate-800/50 rounded-lg px-6 py-3"
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: rank * 0.2 }}
                    >
                      <span className="text-2xl">
                        {rank === 1 ? '👑' : rank === 2 ? '🥈' : '🥉'}
                      </span>
                      <div className="flex-grow text-left">
                        <div className="text-white text-sm">學校 {rank}</div>
                        <div className="text-slate-400 text-xs">1{rank},000 分鐘</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-3xl mb-6"
            >
              {slide.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-purple-200 text-lg leading-relaxed whitespace-pre-line"
            >
              {slide.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Page indicators */}
        <div className="flex gap-2 mt-16 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-purple-500'
                  : 'w-2 bg-slate-600'
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12"
        >
          {isLastSlide ? (
            <>開始冒險</>
          ) : (
            <>
              下一步
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
