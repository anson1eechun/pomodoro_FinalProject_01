declare module 'react-native-background-timer' {
  const BackgroundTimer: {
    setInterval: (callback: () => void, delay: number) => number;
    clearInterval: (intervalId: number) => void;
    setTimeout: (callback: () => void, delay: number) => number;
    clearTimeout: (timeoutId: number) => void;
  };

  export default BackgroundTimer;
}

