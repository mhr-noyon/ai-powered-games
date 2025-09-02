# 🎮 AI-Powered Games (2025)

A growing collection of small, polished games with rule-based / search AI opponents.

Currently included:

- **Tic Tac Toe 2025** — classic 3×3, three difficulties
- **Dot Connector 2025** — Connect-4–style 7×6 grid with gravity and AI

---

## ✨ Features

- ✅ Single-player vs AI (Human vs Computer)
- 🎯 **Difficulty levels** across games
     - **Easy** – lightweight / randomish moves
     - **Medium** – shallow look-ahead
     - **Hard** – Minimax with Alpha-Beta pruning
- 🔁 One-click **Reset / Restart**
- 👁️ **Turn indicator** (label & color match piece, with mini swatch)
- 📱 Responsive UI

---

## 🕹️ Included Games

### 1) Tic Tac Toe 2025

- **Board**: 3×3
- **Win**: three in a row (horizontal / vertical / diagonal)
- **AI**:
     - **Easy**: random valid move
     - **Medium**: simple heuristics + short look-ahead
     - **Hard**: **Minimax + Alpha-Beta** (optimal play)

**Key files**

```
src/components/ticTacToeGame/
  ├─ BoardDesign.js
  ├─ moveChecker.js
  └─ aiTicTacToe.js
```

---

### 2) Dot Connector 2025 (Connect-4 style)

- **Board**: 7 columns × 6 rows; pieces fall to the lowest empty cell in a column
- **Win**: four in a row (horizontal / vertical / diagonal)
- **Controls**: click a **column arrow** to drop a piece
- **AI**:
     - **Easy**: shallow search (depth ≈ 1)
     - **Medium**: deeper search (depth ≈ 3)
     - **Hard**: deeper search (depth ≈ 7) with Alpha-Beta pruning

**Key files**

```
src/components/DotConnectors/
  ├─ boardDesign.js
  ├─ moveChecker.js
  └─ aiDotConnector.js
```

---

## 🚀 Getting Started

### 1) Clone

```bash
git clone https://github.com/mhr-noyon/ai-powered-games.git
cd ai-powered-games
```

### 2) Install

```bash
npm install
```

### 3) Run (dev)

```bash
npm start
```

Open http://localhost:3000 in your browser.

---

## 📁 Project Structure (high level)

```
src/
├─ components/
│  ├─ ticTacToeGame/
│  │  ├─ BoardDesign.js
│  │  ├─ moveChecker.js
│  │  └─ aiTicTacToe.js
│  └─ DotConnectors/
│     ├─ boardDesign.js
│     ├─ moveChecker.js
│     └─ aiDotConnector.js
├─ App.js
└─ index.js
```

---

## 🕹️ How to Play

### Tic Tac Toe

1. Choose a difficulty.
2. Click an empty cell to place your mark.
3. The board locks briefly while the AI thinks.
4. Reset anytime.

### Dot Connector (Connect-4)

1. Choose a difficulty.
2. Click the **arrow** above a column to drop a piece (gravity applies).
3. Four in a row wins.
4. Reset anytime.

---

## 🙋 Author

- **Md. Hosain Rohman Noyon**  
  GitHub: [@mhr-noyon](https://github.com/mhr-noyon)

---
