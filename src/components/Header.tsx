import React from 'react';
import '../styles/Header.css';

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDark }) => (
  <header className="header">
    <div className="header__logo">
      <span className="header__logo-text">SpeedTap</span>
    </div>
    <button
      className="header__dark-toggle"
      onClick={onToggleDark}
      aria-label="Toggle dark mode"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  </header>
);

export default Header;