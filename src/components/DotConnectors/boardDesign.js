import React, { useState, useEffect } from "react";
import arrow from "../../assets/arrow.png";
import { AiDotConnector } from "./aiDotConnector";
import { calculateWinner, isGameEnd, isValidMove } from "./moveChecker";

const piece = { 0: "computer", 1: "human" };
const ROWS = 6, COLS = 7;



export function Title({ difficulty }) {
     return (
          <div className="title-container">
               <h1 className="title">Dot Connector 2025</h1>
               <p className="subtitle">
                    A rule based AI powered - Dot Connector Game
               </p>
               {difficulty !== null && (
                    <>
                         <p>Difficulty: {difficulty.toUpperCase()}</p>
                    </>
               )}
          </div>
     );
}

export function BoardDesign({ difficulty, setDifficulty }) {
     const [boardState, setBoardState] = useState(Array(42).fill(null));
     const [currentPlayer, setCurrentPlayer] = useState(0);
     const [humanTurn, setHumanTurn] = useState(0);
     const [isLocked, setIsLocked] = useState(false);
     const [isAIFirstMove, setIsAIFirstMove] = useState(true);
     const [isEasy, setIsEasy] = useState(false);
     const [isMedium, setIsMedium] = useState(false);
     const [isHard, setIsHard] = useState(false);
     const [isGameStart, setIsGameStart] = useState(false);
     const [aiPiece, setAiPiece] = useState(null);
     const [humanPiece, setHumanPiece] = useState(null);
     const [hoverCol, setHoverCol] = useState(null);

     const backGame = () => {
          setDifficulty(null);
     };
     const giveupGame = () => {
          resetGame();
     };
     const resetGame = () => {
          setIsEasy(false); setIsMedium(false); setIsHard(false);
          if (difficulty === "medium") {
               setIsMedium(true);
          } else if (difficulty === "hard") {
               setIsHard(true);
          } else {
               setIsEasy(true);
          }
          setIsGameStart(true);
          setIsLocked(false);
          setBoardState(Array(42).fill(null));

          let humanStarts = Math.floor(Math.random() * 2);
          console.log("Random value: ", humanStarts);
          setCurrentPlayer(humanStarts);
          setHumanTurn(humanStarts);
          console.log("Current player: ", currentPlayer);

          setAiPiece(0);
          setHumanPiece(1);
          setIsAIFirstMove(true);
     };

     const dropInColumn = (board, col) => {
          for (let r = ROWS - 1; r >= 0; r--) {
               const idx = r * COLS + col;
               if (board[idx] === null) return idx;
          }
          return null;
     };
     const handleClick = (index) => {
          console.log("Human clicked: ", index);
          if (isLocked || calculateWinner(boardState)) {
               return;
          }

          const col = index % COLS;
          const idx = dropInColumn(boardState, col);
          if (idx === null) return; // column full

          const newBoardState = [...boardState];
          newBoardState[idx] = piece[humanPiece];
          setBoardState(newBoardState);
          setCurrentPlayer((prev) => prev ^ 1);
     };

     const winner = calculateWinner(boardState);
     console.log("Board: ", boardState);
     const isDraw = isGameEnd(boardState) && !winner;
     console.log("is draw: ", isDraw)
     useEffect(() => {
          if (!isGameStart) {
               resetGame();
               setIsGameStart(true);
               return;
          }

          console.log("AI Turn", currentPlayer, humanTurn);
          if (winner || isDraw || currentPlayer === humanTurn) return;

          setIsLocked(true);
          console.log("All mode: ", isEasy, isMedium, isHard, isAIFirstMove);

          const newBoard = [...boardState];
          let index = AiDotConnector(newBoard, piece[aiPiece], piece[humanPiece], isHard ? 7 : isMedium ? 3 : 1);


          if (index !== null && boardState[index] === null) {
               newBoard[index] = piece[aiPiece];
               setTimeout(() => {
                    setBoardState(newBoard);
                    setCurrentPlayer((prev) => prev ^ 1);
                    setIsLocked(false);
               }, 1000);
          }
          console.log("AI has chosen: ", index);
     }, [boardState, currentPlayer]);

     const gameContainer = () => {
          // console.log("Cur Player: ", currentPlayer, "Human turn: ", humanTurn);
          return (
               <div className={`main-container ${isLocked ? " no-click" : ""}`}>
                    {
                         winner ? (
                              <>
                                   <div className="win-message">
                                        {currentPlayer == humanTurn
                                             ? "Computer "
                                             : "Human "}
                                        wins!
                                   </div>
                                   <button
                                        className="reset-button"
                                        onClick={resetGame}
                                   >
                                        Reset Game
                                   </button>
                                   <button
                                        className="back-button"
                                        onClick={backGame}
                                   >
                                        Back
                                   </button>
                              </>
                         ) : isDraw ? (
                              <>
                                   <div className="draw-message">It's a draw!</div>
                                   <button
                                        className="reset-button"
                                        onClick={resetGame}
                                   >
                                        Restart Game
                                   </button>
                              </>
                         ) : (
                              <>
                                   {currentPlayer === humanTurn ? (
                                        <h2 className="current-player human">
                                             <span style={{ color: "white" }}>Turn:</span> Human
                                        </h2>
                                   ) : (
                                        <h2 className="current-player computer">
                                             <span style={{ color: "white" }}>Turn:</span> Computer
                                        </h2>
                                   )}
                                   <button
                                        className="giveup-button"
                                        onClick={giveupGame}
                                   >
                                        Restart
                                   </button>

                                   <button
                                        className="back-button"
                                        onClick={backGame}
                                   >
                                        Back
                                   </button>
                              </>
                         )
                    }
                    <div className="main-container">
                         {/* <div className={`board-container ${isLocked ? "no-click" : ""}`}> */}

                         <div className={`cell-icons ${isLocked ? "no-click" : ""}`}>
                              {Array.from({ length: 7 }, (_, i) => (
                                   <div key={i + 1} className="cell-icon"
                                        onMouseEnter={() => setHoverCol(i)}
                                        onMouseLeave={() => setHoverCol(null)}>
                                        <img className="arrow" src={arrow} alt={`Cell ${i + 1}`} onClick={() => handleClick(i)} />

                                   </div>
                              ))}
                         </div>
                         <div className={`dot-connector-board-container ${isLocked ? "no-click" : ""}`} data-hover-col={hoverCol ?? ""}>
                              {
                                   boardState.map((value, index) => {
                                        console.log("Rendering cell:", index, value);
                                        return (
                                             <div
                                                  key={index}
                                                  className={`cell ${value || ""}`}
                                                  onClick={() => handleClick(index % COLS)}
                                                  onMouseEnter={() => setHoverCol(index % 7)}
                                                  onMouseLeave={() => setHoverCol(null)}
                                                  data-index={index}
                                             ></div>
                                        );
                                   })
                              }
                         </div>
                         <div className="cell-numbering">
                              {Array.from({ length: 7 }, (_, i) => (
                                   <div key={i + 1} className="cell-number">
                                        {i + 1}
                                   </div>
                              ))}
                         </div>
                    </div>
               </div >
          );
     };

     return <>{gameContainer()}</>;
}
