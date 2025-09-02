export const calculateWinner = (board) => {
     // console.log("Board in calculateWinner:", board);
     const winningState = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
     ];
     for (let [a, b, c] of winningState) {
          if (board[a] && board[a] === board[b] && board[b] === board[c]) {
               return board[a];
          }
     }

     // if no winner found
     return null;
};
export function isGameEnd(board) {
     for (let i = 0; i <= 8; i++) {
          if (board[i] === null) return false;
     }
     return true;
}
