# 🎮 Tic Tac AI

A modern, production-ready Tic Tac Toe game built with **React**, **TypeScript**, and **Vite** featuring multiple AI difficulty levels powered by the **Strategy Pattern** and **Minimax Algorithm**.

Designed with a scalable architecture, clean state management, and responsive UI, this project demonstrates modern frontend engineering practices beyond a simple game.

---

## 🚀 Live Demo

🌐 https://tic-tac-ai-git-main-sakshi-g-projects05.vercel.app/

## 📂 Repository

💻 https://github.com/Sakshi-050174/tic-tac-ai

---

## ✨ Features

### Gameplay

- 🎮 Human vs Human
- 🤖 Human vs AI
- 🎯 Four AI difficulty levels
- ↩️ Undo moves
- 🔄 Restart game
- 📜 Move history timeline
- 🏆 Winner & Draw detection
- 🎉 Winner celebration animation
- 🔊 Sound effects with mute toggle
- 📱 Fully responsive design

### AI Difficulty Levels

| Difficulty | Strategy |
|------------|----------|
| Easy | Random Move |
| Medium | Win → Block → Random |
| Hard | Win → Block → Fork → Block Fork → Center → Corner → Edge |
| Impossible | Minimax Algorithm (Unbeatable AI) |

---

## 🎥 Demo

> Replace this GIF after recording your gameplay.

<p align="center">
  <img src="./assets/screenshots/demo.mp4" alt="Gameplay Demo" width="900"/>
</p>

---

## 🏗 Architecture

```
Game
│
├── Components
├── Zustand Store
├── Actions
├── Services
├── AI Engine
├── Strategies
└── Helpers
```

The application follows a modular architecture where UI, state management, business logic, and AI logic are cleanly separated for scalability and maintainability.

---

## 🤖 AI Engine

The AI is implemented using the **Strategy Pattern**, allowing each difficulty level to encapsulate its own decision-making algorithm.

```
Easy
   ↓
Random Move

Medium
   ↓
Win
   ↓
Block
   ↓
Random

Hard
   ↓
Win
   ↓
Block
   ↓
Fork
   ↓
Block Fork
   ↓
Center
   ↓
Corner
   ↓
Edge

Impossible
   ↓
Minimax Algorithm
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React | UI Library |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Zustand | State Management |
| SCSS Modules | Component Styling |
| Framer Motion | Animations |
| React Responsive | Responsive Layout |
| Lucide React | Icons |

---

## 📁 Project Structure

```
src
│
├── assets
├── components
├── features
│   └── game
│       ├── ai
│       ├── hooks
│       ├── services
│       ├── store
│       ├── types
│       └── utils
│
├── styles
├── App.tsx
└── main.tsx
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
git clone https://github.com/Sakshi-050174/tic-tac-ai.git

cd tic-tac-ai

pnpm install

pnpm dev
```

### Production Build

```bash
pnpm build
```

---

## 🎯 Engineering Highlights

- Clean Component Architecture
- Strategy Pattern
- Minimax Search Algorithm
- Modular AI Engine
- Service Layer Architecture
- Zustand State Management
- Strong TypeScript Typing
- Responsive UI
- Production-ready Folder Structure

---

## 👩‍💻 Author

**Sakshi Gupta**

Frontend Developer passionate about building scalable, maintainable, and modern web applications.

- GitHub: https://github.com/Sakshi-050174
- LinkedIn: https://www.linkedin.com/in/sakshi-gupta-874990361/

---

⭐ If you found this project useful, consider giving it a star!