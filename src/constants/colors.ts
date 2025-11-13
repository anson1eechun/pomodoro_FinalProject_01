/**
 * 地牢專注 App - 設計系統顏色常量
 * 參考 pomodoro_design 的設計系統
 */

// 主色調 - 地牢深紫
export const COLORS = {
  // Purple
  purple: {
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7', // Primary Purple
    600: '#9333EA', // Primary Dark
    700: '#7E22CE',
    900: '#581C87',
  },

  // Pink (Secondary)
  pink: {
    400: '#F472B6',
    500: '#EC4899',
    600: '#DB2777',
    700: '#BE185D',
    900: '#831843',
  },

  // Focus Mode - 火焰橙紅
  focus: {
    primary: '#DC2626', // Red-600
    secondary: '#EA580C', // Orange-600
  },

  // Break Mode - 恢復綠
  break: {
    primary: '#059669', // Green-600
    secondary: '#10B981', // Green-500
  },

  // Gold - 獎勵/金幣
  gold: {
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Primary Gold
    600: '#D97706',
    900: '#78350F',
  },

  // Background - 地牢深邃
  background: {
    primary: '#0F172A', // Slate-900
    secondary: '#1E293B', // Slate-800
    card: 'rgba(15, 23, 42, 0.5)', // Slate-900/50
  },

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#CBD5E1', // Slate-300
    tertiary: '#94A3B8', // Slate-400
    muted: '#64748B', // Slate-500
  },

  // Border
  border: {
    purple: 'rgba(139, 92, 246, 0.3)', // Purple-500/30
    purple50: 'rgba(139, 92, 246, 0.5)', // Purple-500/50
  },

  // Semantic
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // Slate (for gradients and backgrounds)
  slate: {
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
};

// 漸變色配置
export const GRADIENTS = {
  background: ['#0F172A', '#581C87', '#0F172A'], // slate-900 via purple-900 to slate-900
  focus: ['#DC2626', '#EA580C'], // red-600 to orange-600
  break: ['#059669', '#10B981'], // green-600 to green-500
  primary: ['#9333EA', '#EC4899'], // purple-600 to pink-600
  gold: ['#F59E0B', '#D97706'], // amber-500 to amber-600
};

