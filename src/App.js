import { useState } from "react";
import "./App.css";
import logo from "./logo.png";
import { GameHome } from "./components/gameHome";

function App() {
     return (
          <div className="App">
               <header className="header">
                    <div className="container header__inner">
                         <div className="brand">
                              <img
                                   src={logo}
                                   className="brand__logo"
                                   alt="Site logo"
                              />
                              <span className="brand__name">MiniArcade</span>
                         </div>
                         <nav className="nav">
                              <a href="#games" className="nav__link">
                                   Games
                              </a>
                              <a href="#about" className="nav__link">
                                   About
                              </a>
                              <a href="#contact" className="nav__link">
                                   Contact
                              </a>
                         </nav>
                    </div>
               </header>

               <GameHome />

               <footer className="footer" id="contact">
                    <div className="container footer__inner">
                         <p>
                              Got ideas?{" "}
                              <a href="mailto:mdnoyon.mh@gmail.com">Email us</a>{" "}
                              to request a game.
                         </p>
                         <p className="footer__small">
                              © {new Date().getFullYear()} MiniArcade. All
                              rights reserved.
                         </p>
                    </div>
               </footer>
          </div>
     );
}

export default App;
