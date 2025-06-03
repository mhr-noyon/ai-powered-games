import { calculateWinner, isGameEnd } from "./moveChecker";

export function getRandom(min, max){
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

export function easyMove(boardState){
    console.log("Current board state from easy: ",boardState);
    let moves = getDistinctRandomInts(0, 8);
    console.log("Available random moves: ", moves);
    
    for(let index of moves){
        if(boardState[index]===null) return index;
    }
    console.log("Coundn't find the index from easy");
    return null;
}

export function mediumMove(boardState, aiPiece, humanPiece){    
    let moves = getDistinctRandomInts(0, 8);
    console.log("AI Piece is: ",aiPiece);
    console.log("Human Piece is: ",humanPiece);
    console.log("Current board state from medium: ",boardState);
    
    

    // For finding ai winning move
    for(let index of moves){
        if(boardState[index]===null){
            boardState[index] = aiPiece;
            if(calculateWinner(boardState) === aiPiece && aiPiece!==null){
                return index;
            }
            boardState[index] = null;
        }
    }

    // For finding human winning position and block them
    for(let index of moves){
        if(boardState[index]===null){
            boardState[index] = humanPiece;
            if(calculateWinner(boardState) === humanPiece && humanPiece!==null){
                let willBlock = Math.random();
                if(willBlock<0.8){
                    return index;
                }
                console.log("Didn't block cause %",willBlock)
            }
            boardState[index] = null;
        }
    }

    for(let index of moves){        
        if(boardState[index]===null) return index;
    }

    console.log("Coundn't find the index from medium");
    return null;
}

export function AiTicTacToe(boardState, aiPiece, humanPiece, depthMax) {
    console.log("Current board state from hard: ",boardState);
    const minMax = (depth, isMax, alpha, beta) => {
        if (calculateWinner(board) === humanPiece) return -10 + depth;
        if (calculateWinner(board) === aiPiece) return 10 + depth;
        if (isGameEnd(board)) return 0;
        if (depth === 0) return 0;

        if (isMax) {
            let best = Number.MIN_SAFE_INTEGER;
            for (let i = 0; i <= 8; i++) {
                if (board[i] === null) {
                    board[i] = aiPiece;
                    let score = minMax(depth - 1, false, alpha, beta);
                    board[i] = null;
                    best = Math.max(best, score);
                    alpha = Math.max(alpha, best);
                    if (beta <= alpha) return best;
                }
            }
            return best;
        } else {
            let best = Number.MAX_SAFE_INTEGER;
            for (let i = 0; i <= 8; i++) {
                if (board[i] === null) {
                    board[i] = humanPiece;
                    let score = minMax(depth - 1, true, alpha, beta);
                    board[i] = null;
                    best = Math.min(best, score);
                    beta = Math.min(beta, best);
                    if (beta <= alpha) return best;
                }
            }
            return best;
        }
    };
    let board = [...boardState];
    console.log("Current temp board state from hard: ",board);
    let bestIndex = 0,
        bestValue = Number.MIN_SAFE_INTEGER,
        minValue = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i <= 8; i++) {
        if (board[i] === null) {
            board[i] = aiPiece;
            let currentBest = minMax(depthMax, false, bestValue, minValue);
            if (currentBest > bestValue) {
                bestValue = currentBest;
                bestIndex = i;
            }
            board[i] = null;
        }
    }
    console.log("Best value: ", bestValue);
    
    return bestIndex;
}
