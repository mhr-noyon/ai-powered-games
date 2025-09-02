const ROWS = 6, COLS = 7;

export const calculateWinner = (board) => {
     // check vertically
     for (let col = 0; col < COLS; col++) {
          for (let row = 0; row < ROWS - 3; row++) {
               let x = row * COLS + col;
               let y = (row + 1) * COLS + col;
               let z = (row + 2) * COLS + col;
               let w = (row + 3) * COLS + col;
               if (
                    board[x] &&
                    board[x] === board[y] &&
                    board[y] === board[z] &&
                    board[z] === board[w]
               ) {
                    return board[x];
               }
          }
     }
     //check Horizontally
     for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS - 3; col++) {
               let x = row * COLS + col;
               let y = row * COLS + (col + 1);
               let z = row * COLS + (col + 2);
               let w = row * COLS + (col + 3);
               if (
                    board[x] &&
                    board[x] === board[y] &&
                    board[y] === board[z] &&
                    board[z] === board[w]
               ) {
                    return board[x];
               }
          }
     }

     // Right tilt diagonal
     for (let row = 0; row < ROWS - 3; row++) {
          for (let col = 0; col < COLS - 3; col++) {
               let x = row * COLS + col;
               let y = (row + 1) * COLS + (col + 1);
               let z = (row + 2) * COLS + (col + 2);
               let w = (row + 3) * COLS + (col + 3);
               if (
                    board[x] &&
                    board[x] === board[y] &&
                    board[y] === board[z] &&
                    board[z] === board[w]
               ) {
                    return board[x];
               }
          }
     }

     // Left tilt diagonal
     for (let row = 0; row < ROWS - 3; row++) {
          for (let col = 3; col < COLS; col++) {
               let x = row * COLS + col;
               let y = (row + 1) * COLS + (col - 1);
               let z = (row + 2) * COLS + (col - 2);
               let w = (row + 3) * COLS + (col - 3);
               if (
                    board[x] &&
                    board[x] === board[y] &&
                    board[y] === board[z] &&
                    board[z] === board[w]
               ) {
                    return board[x];
               }
          }
     }
     // if no winner found
     return null;
};

export function isGameEnd(board) {
     // if (board.some((element) => element === null)) {
     //      return false;
     // }
     // console.log("Game is draw", board);
     // return true;
     return !board.includes(null);

}

export function getValidRow(board, col) {
     for (let row = ROWS - 1; row >= 0; row--) {
          if (board[row * COLS + col] === null) {
               return row;
          }
     }
     return null;
}

export const isValidMove = (board, index) => {
     let col = index % COLS;
     let row = getValidRow(board, col);
     return row * COLS + col === index;
};
