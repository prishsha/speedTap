import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Game from './components/Game';
import { Difficulty } from './types';
import './styles/App.css';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="app">
      <Header darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />
      <main className="app__main">
        <Game difficulty={difficulty} onDifficultyChange={setDifficulty} />
      </main>
    </div>
  );
};

export default App;