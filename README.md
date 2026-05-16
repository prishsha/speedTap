# SpeedTap – Reaction Time Game

SpeedTap is a fast-paced reaction time game built using **React**, **TypeScript**, and **Vite**. Players must click randomly appearing targets as quickly as possible before the timer runs out.

The game is designed to test reflexes, improve reaction speed, and provide a fun interactive experience with multiple difficulty levels.

---

# Features

- Randomly spawning targets
- Fast-paced reaction gameplay
- Multiple difficulty modes
- Real-time score tracking
- Countdown timer
- Responsive UI
- React + TypeScript architecture
- Component-based styling

---

# Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend UI |
| TypeScript | Type safety |
| Vite | Fast development/build tool |
| CSS3 | Styling |

---

# Project Structure

```bash
src/
│
├── assets/                     # Static assets
│
├── components/                 # React components
│   ├── DifficultySelector.tsx
│   ├── Game.tsx
│   ├── Header.tsx
│   ├── ScoreBoard.tsx
│   └── Target.tsx
│
├── hooks/                      # Custom hooks
│   └── useGameLogic.ts
│
├── styles/                     # CSS files
│   ├── DifficultySelector.css
│   ├── Game.css
│   ├── Header.css
│   ├── ScoreBoard.css
│   └── Target.css
│
├── types/                      # Type definitions
│   └── index.ts
│
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

---

# Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/speedtap.git
```

## 2️⃣ Navigate to the Project Directory

```bash
cd speedtap
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Start the Development Server

```bash
npm run dev
```

The app will run locally on:

```bash
http://localhost:5173
```

---

# Build for Production

```bash
npm run build
```

---

# Preview Production Build

```bash
npm run preview
```

---

# How to Play

1. Choose a difficulty level
2. Start the game
3. Click the targets before they disappear
4. Gain points for every successful hit
5. Beat your highest score before time runs out

---

# Screenshots

Add gameplay screenshots here.

Example:

---

# Future Enhancements

- Sound effects
- High score leaderboard
- Multiplayer support
- Dark/light theme toggle
- Game analytics
- Better mobile optimization
