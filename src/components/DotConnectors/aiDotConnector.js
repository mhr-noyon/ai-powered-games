import { calculateWinner, isGameEnd, getValidRow } from "./moveChecker";
const ROWS = 6, COLS = 7;

export function getRandom(min, max) {
     return Math.floor(Math.random() * (max - min + 1.0)) + min;
}
export function getDistinctRandomInts(min, max) {
     let numbers = [];
     for (let i = min; i <= max; i++) {
          numbers.push(i);
     }

     // Shuffle using Fisher-Yates algorithm
     for (let i = numbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
     }

     return numbers;
}

function evaluateWindow(window, aiPiece, humanPiece, emptyVal = null) {
     const aiCount = window.filter((x) => x === aiPiece).length;
     const humanCount = window.filter((x) => x === humanPiece).length;
     const emptyCount = window.filter((x) => x === emptyVal).length;

     // If both players occupy the window, it's blocked: no potential
     if (aiCount > 0 && humanCount > 0) return 0;

     if (aiCount === 4) return 100000; // win
     if (humanCount === 4) return -100000; // loss (very bad)

     if (aiCount === 3 && emptyCount === 1) return 100; // make-3
     if (humanCount === 3 && emptyCount === 1) return -120; // must-block

     if (aiCount === 2 && emptyCount === 2) return 10;
     if (humanCount === 2 && emptyCount === 2) return -8;

     // Singletons or all-empty: tiny nudge at most
     if (aiCount === 1 && emptyCount === 3) return 1;
     if (humanCount === 1 && emptyCount === 3) return -1;

     return 0;
}

function evaluateBoard(board, aiPiece, humanPiece) {
     let score = 0;

     // Evaluate center
     let centerCol = [];
     for (let r = 0; r < ROWS; r++) {
          centerCol.push(board[r * COLS + 3]);
     }
     score += centerCol.filter((x) => x === aiPiece).length * 3;
     score -= centerCol.filter((x) => x === humanPiece).length * 3;

     // Score horizontally
     for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS - 3; c++) {
               let window = [];
               window.push(board[r * COLS + c]);
               window.push(board[r * COLS + (c + 1)]);
               window.push(board[r * COLS + (c + 2)]);
               window.push(board[r * COLS + (c + 3)]);
               score += evaluateWindow(window, aiPiece, humanPiece);
          }
     }

     //Score vertically
     for (let c = 0; c < COLS; c++) {
          for (let r = 0; r < ROWS - 3; r++) {
               let window = [];
               window.push(board[r * COLS + c]);
               window.push(board[(r + 1) * COLS + c]);
               window.push(board[(r + 2) * COLS + c]);
               window.push(board[(r + 3) * COLS + c]);
               score += evaluateWindow(window, aiPiece, humanPiece);
          }
     }
     // Score right tilt diagonals
     for (let r = 0; r < ROWS - 3; r++) {
          for (let c = 0; c < COLS - 3; c++) {
               let window = [];
               window.push(board[r * COLS + c]);
               window.push(board[(r + 1) * COLS + (c + 1)]);
               window.push(board[(r + 2) * COLS + (c + 2)]);
               window.push(board[(r + 3) * COLS + (c + 3)]);
               score += evaluateWindow(window, aiPiece, humanPiece);
          }
     }
     // Score left tilt diagonals
     for (let r = 0; r < ROWS - 3; r++) {
          for (let c = 3; c < COLS; c++) {
               let window = [];
               window.push(board[r * COLS + c]);
               window.push(board[(r + 1) * COLS + (c - 1)]);
               window.push(board[(r + 2) * COLS + (c - 2)]);
               window.push(board[(r + 3) * COLS + (c - 3)]);
               score += evaluateWindow(window, aiPiece, humanPiece);
          }
     }

     return score;
}

export function AiDotConnector(boardState, aiPiece, humanPiece, depthMax) {
     console.log("Current board state from hard: ", boardState);
     const minMax = (depth, isMax, alpha, beta) => {
          const winner = calculateWinner(board);
          if (winner === humanPiece) return -1000000 - depth;
          if (winner === aiPiece) return 1000000 + depth;
          if (isGameEnd(board)) return 0;
          if (depth === 0) return evaluateBoard(board, aiPiece, humanPiece);

          if (isMax) {
               let best = Number.MIN_SAFE_INTEGER;
               for (let col = 0; col < COLS; col++) {
                    let row = getValidRow(board, col);
                    if (row !== null) {
                         board[row * COLS + col] = aiPiece;
                         let score = minMax(depth - 1, false, alpha, beta);
                         board[row * COLS + col] = null;
                         best = Math.max(best, score);
                         alpha = Math.max(alpha, best);
                         if (beta <= alpha) return best;
                    }
               }
               return best;
          } else {
               let best = Number.MAX_SAFE_INTEGER;
               for (let col = 0; col < COLS; col++) {
                    let row = getValidRow(board, col);
                    if (row !== null) {
                         board[row * COLS + col] = humanPiece;
                         let score = minMax(depth - 1, true, alpha, beta);
                         board[row * COLS + col] = null;
                         best = Math.min(best, score);
                         beta = Math.min(beta, best);
                         if (beta <= alpha) return best;
                    }
               }
               return best;
          }
     };
     let board = [...boardState];
     console.log("Current temp board state from hard: ", board);
     let bestIndex = 0,
          bestValue = Number.MIN_SAFE_INTEGER,
          minValue = Number.MAX_SAFE_INTEGER;

     for (let col = 0; col < COLS; col++) {
          let row = getValidRow(board, col);
          if (row !== null) {
               board[row * COLS + col] = aiPiece;
               let currentBest = minMax(depthMax, false, bestValue, minValue);
               if (currentBest > bestValue) {
                    bestValue = currentBest;
                    bestIndex = row * COLS + col;
               }
               board[row * COLS + col] = null;
          }
     }
     console.log("Best value: ", bestValue);
     console.log("Best index: ", bestIndex);
     return bestIndex;
}
