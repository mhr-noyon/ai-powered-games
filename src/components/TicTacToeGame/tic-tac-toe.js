import { useState } from "react";
import { Title, BoardDesign } from "./boardDesign";
import { ChooseDifficulty } from "./chooseDificulty"; // <-- ensure filename matches
import "./style.css";

const VALID_DIFFICULTIES = new Set(["easy", "medium", "hard"]); // adjust to yours

export function TicTacToe() {
     const [difficulty, setDifficulty] = useState(null);

     const isValid = difficulty === null || VALID_DIFFICULTIES.has(difficulty);

     return (
          <div className="game-interface">
               <Title difficulty={difficulty} />

               {difficulty === null || !isValid ? (
                    <ChooseDifficulty setDifficulty={setDifficulty} />
               ) : (
                    // key ensures fresh board state on difficulty change
                    <BoardDesign
                         key={difficulty}
                         difficulty={difficulty}
                         setDifficulty={setDifficulty}
                    />
               )}
          </div>
     );
}
