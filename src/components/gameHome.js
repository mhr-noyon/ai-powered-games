import { useState } from "react";

import { TicTacToe } from "./TicTacToeGame/tic-tac-toe";
import { DotConnectors } from "./DotConnectors/dotConnectors";
import { MainBody } from "./mainBody";
const GAME_COMPONENTS = {
     "tic-tac-toe": TicTacToe,
     "dot-connectors": DotConnectors,
};

const GAMES = [
     {
          id: "tic-tac-toe",
          title: "Tic-Tac-Toe",
          description:
               "Classic 3×3 strategy. Beat your friend or Computer and warm up your brain.",
          thumb: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTFbbqG02U5RVcl7u_BtKt1Ua2UyIhIvml3zVGF_-LOeQ3mZQbT83nwmz95ePsQZ8pAXtQJjeNDj9d29e7x0pecj7uylIQQgP3psWS6dUQ",
     },
     {
          id: "dot-connectors",
          title: "Dot Connectors",
          description:
               "Connect the dots horizontally or vertically or diagonally and prove yourself.",
          thumb: "https://m.media-amazon.com/images/I/81deIwZPVXL.jpg",
     },
];

function GameCard({ game, onSelect }) {
     return (
          <button
               type="button"
               className={`card ${game.id}`}
               onClick={() => onSelect(game.id)}
               aria-label={`Play ${game.title} inside the page`}
          >
               <div className="card__imageWrap">
                    <img
                         src={game.thumb}
                         alt={`${game.title} thumbnail`}
                         className="card__image"
                    />
               </div>
               <div className="card__body">
                    <h3 className="card__title">{game.title}</h3>
                    <p className="card__desc">{game.description}</p>
                    <span className="card__cta">Play ▶</span>
               </div>
          </button>
     );
}

export function GameHome() {
     const [activeGameId, setActiveGameId] = useState(null);
     const ActiveGame = activeGameId ? GAME_COMPONENTS[activeGameId] : null;

     return (
          <>
               {ActiveGame === null && <MainBody />}

               <section className="section" id="games">
                    <div className="container">
                         {ActiveGame && (
                              <div
                                   className="play-area"
                                   role="region"
                                   aria-label="Game play area"
                              >
                                   <div className="play-area__header">
                                        <h3 className="play-area__title">
                                             {
                                                  GAMES.find(
                                                       (g) =>
                                                            g.id ===
                                                            activeGameId
                                                  )?.title
                                             }
                                        </h3>
                                        <button
                                             className="btn btn--ghost"
                                             onClick={() =>
                                                  setActiveGameId(null)
                                             }
                                        >
                                             Close ✕
                                        </button>
                                   </div>
                                   <div className="play-area__body">
                                        <ActiveGame />
                                   </div>
                              </div>
                         )}
                         
                         <div className="section__header">
                              <h2 className="section__title">
                                   Available Games
                              </h2>
                              <p className="section__subtitle">
                                   Click a card to play inside the page.
                              </p>
                         </div>

                         <div className="grid">
                              {GAMES.map((g) => (
                                   <GameCard
                                        key={g.id}
                                        game={g}
                                        onSelect={setActiveGameId}
                                   />
                              ))}
                         </div>
                    </div>
               </section>
          </>
     );
}
