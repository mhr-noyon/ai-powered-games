import { useEffect, useState } from "react";
import { Title, BoardDesign } from "./boardDesign";
import { ChooseDifficulty } from "./chooseDificulty";
import "./style.css";
export function TicTacToe() {
    const [difficulty, setDifficulty] = useState(null);

    useEffect(()=>{

    },[difficulty])
    return (
        <>
            <div className="tic-tac-toe">
                <Title difficulty={difficulty}/>
                {difficulty===null ? (
                        <ChooseDifficulty setDifficulty={setDifficulty} />
                    ) : 
                    <BoardDesign difficulty={difficulty} setDifficulty={setDifficulty}/>
                }
            </div>
        </>
    );
}
