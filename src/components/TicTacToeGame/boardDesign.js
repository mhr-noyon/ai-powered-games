import React, { useState, useEffect } from "react";
import { calculateWinner, isGameEnd } from "./moveChecker";
import { AiTicTacToe, easyMove, mediumMove } from "./aiTicTacToe";
const piece = { 0: "circle", 1: "cross" };

export function Title({ difficulty }) {
     return (
          <div className="title-container">
               <h1 className="title">Tic Tac Toe 2025</h1>
               <p className="subtitle">
                    A rule based AI powered - Tic Tac Toe Game
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
     const [boardState, setBoardState] = useState(Array(9).fill(null));
     const [currentPlayer, setCurrentPlayer] = useState(0);
     const [humanTurn, setHumanTurn] = useState(0);
     const [isLocked, setIsLocked] = useState(false);
     const [isAIFirstMove, setIsAIFirstMove] = useState(true);
     const [isEasy, setIsEasy] = useState(false);
     const [isMedium, setIsMedium] = useState(false);
     const [isHard, setIsHard] = useState(false);
     const [isGameStart, setIsGameStart] = useState(false);

     const backGame = () => {
          setDifficulty(null);
     };
     const giveupGame = () => {
          resetGame();
     };
     const resetGame = () => {
          if (difficulty === "medium") {
               setIsMedium(true);
          } else if (difficulty === "hard") {
               setIsHard(true);
          } else {
               setIsEasy(true);
          }

          setBoardState(Array(9).fill(null));
          let rnd = Math.floor(Math.random() * 2);
          console.log("Random value: ", rnd);
          setCurrentPlayer(0);
          console.log("Current player: ", currentPlayer);
          setHumanTurn(rnd);
          setIsAIFirstMove(true);
     };

     const handleClick = (index) => {
          if (isLocked || boardState[index] || calculateWinner(boardState)) {
               return;
          }
          const newBoardState = [...boardState];
          newBoardState[index] = piece[currentPlayer];
          setBoardState(newBoardState);
          setCurrentPlayer((prev) => prev ^ 1);
     };

     const winner = calculateWinner(boardState);
     const isDraw = isGameEnd(boardState);
     useEffect(() => {
          if (!isGameStart) {
               resetGame();
               setIsGameStart(true);
               return;
          }
          if (winner || isDraw || currentPlayer === humanTurn) return;

          setIsLocked(true);
          console.log("AI Turn");

          let index = null;
          console.log("All mode: ", isEasy, isMedium, isHard, isAIFirstMove);
          const newBoard = [...boardState];

          if (isEasy || (isAIFirstMove && !isHard)) {
               console.log("Entered easy or isAIFirstMove");
               setIsAIFirstMove(false);
               index = easyMove(newBoard);
          } else if (isMedium) {
               console.log("Entered medium");
               index = mediumMove(
                    newBoard,
                    piece[currentPlayer],
                    piece[humanTurn]
               );
          } else if (isHard) {
               console.log("Entered hard");
               console.log("---AI Piece: ", piece[currentPlayer]);
               console.log("---Human Piece: ", piece[humanTurn]);
               index = AiTicTacToe(
                    newBoard,
                    piece[currentPlayer],
                    piece[humanTurn],
                    6
               );
          }

          if (index !== null && boardState[index] === null) {
               newBoard[index] = piece[currentPlayer];
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
               <div className="main-container">
                    {winner ? (
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
                                        Human
                                   </h2>
                              ) : (
                                   <h2 className="current-player computer">
                                        Computer
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
                    )}
                    <div
                         className={`board-container ${
                              isLocked ? "no-click" : ""
                         }`}
                    >
                         {boardState.map((value, index) => (
                              <div
                                   key={index}
                                   className={`cell ${value || ""}`}
                                   onClick={() => handleClick(index)}
                                   data-index={index}
                              ></div>
                         ))}
                    </div>
               </div>
          );
     };

     return <>{gameContainer()}</>;
}
