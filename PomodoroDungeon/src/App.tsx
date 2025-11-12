import React from 'react';
import { PomodoroProvider } from './contexts/PomodoroContext';
import PomodoroScreen from './screens/PomodoroScreen/PomodoroScreen';

/**
 * 應用程式主入口
 */
const App: React.FC = () => {
  return (
    <PomodoroProvider>
      <PomodoroScreen />
    </PomodoroProvider>
  );
};

export default App;