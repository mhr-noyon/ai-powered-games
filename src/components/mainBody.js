export function MainBody() {
     return (
          <>
               <section className="hero" id="about">
                    <div className="container hero__inner">
                         <div className="hero__text">
                              <h1 className="hero__title">
                                   Play quick, delightful web games.
                              </h1>
                              <p className="hero__subtitle">
                                   Welcome to <strong>MiniArcade</strong> —
                                   launch games instantly in-page or in a new
                                   tab.
                              </p>
                              <div className="hero__actions">
                                   <a
                                        href="#games"
                                        className="btn btn--primary"
                                   >
                                        Browse Games
                                   </a>
                              </div>
                         </div>
                         <img
                              className="site_image"
                              src="https://images.samsung.com/is/image/samsung/assets/bd/apps/gaming-hub/01_gameLauncher_section_kv_mo.jpg?$720_N_JPG$"
                              alt="Arcade themed illustration"
                         />
                    </div>
               </section>
          </>
     );
}
