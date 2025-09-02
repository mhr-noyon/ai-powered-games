import { useEffect, useState } from "react";
import { BoardDesign, Title } from "../DotConnectors/boardDesign";
import { ChooseDifficulty } from "./chooseDificulty";
import "./style.css";

export function DotConnectors() {
     const [difficulty, setDifficulty] = useState(null);

     useEffect(() => {}, [difficulty]);
     return (
          <>
               <div className="game-interface">
                    <Title difficulty={difficulty} />
                    {difficulty === null ? (
                         <ChooseDifficulty setDifficulty={setDifficulty} />
                    ) : (
                         <BoardDesign
                              difficulty={difficulty}
                              setDifficulty={setDifficulty}
                         />
                    )}
               </div>
          </>
     );
}
