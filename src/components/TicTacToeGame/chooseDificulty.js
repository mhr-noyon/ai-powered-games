export function ChooseDifficulty({setDifficulty}){
    const handleClick = (level) => {
        setDifficulty(level);
        console.log("Level chosen: ",level);
    }
    return (
        <>
            <div className="choose-dificulty">
                <h2>Select a difficulty level: </h2>
                <button className="difficultyBtn easy" onClick={()=>{handleClick("easy")}}>Easy</button>
                <button className="difficultyBtn medium" onClick={()=>{handleClick("medium")}}>Medium</button>
                <button className="difficultyBtn hard" onClick={()=>{handleClick("hard")}}>Hard</button>
            </div>
        </>
    )
}