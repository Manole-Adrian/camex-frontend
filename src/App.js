import React from "react";

import RoulettePro from "react-roulette-pro";
import "react-roulette-pro/dist/index.css";

import "./App.css";
import CamelsCounter from "./Components/CamelsCounter/CamelsCounter";
import Hero from "./Components/Hero/Hero";
import Roulette from "./Components/Roulette/Roulette";

function App() {
  const [isAuth, setIsAuth] = React.useState(false);

  const [camels, setCamels] = React.useState(0);
  React.useEffect(() => {
    try {
      const isAlreadyLogged = localStorage.getItem("token");
      if (isAlreadyLogged) setIsAuth(true);
    } catch {
      console.log("not auth");
    }
  }, []);

  return (
    <div className="App">
      <Hero isAuth={isAuth} setIsAuth={setIsAuth} />
      {!isAuth && (
        <p className="devText">
          Posibil sa dureze ~5 secunde sa dea log in, csf folosim free tier
        </p>
      )}
      <Roulette isAuth={isAuth} setCamels={setCamels} />
      {isAuth === true && (
        <CamelsCounter camels={camels} setCamels={setCamels} isAuth={isAuth} />
      )}
      <p className="devText">
        Scuze ca arata ca dracu site-ul, l-am facut in 4 ore (plus chinul sa dau
        deploy), plus nu ma descurc la design
      </p>
      <p className="devText">
        Voiam sa poti sa dai la ruleta doar o data pe zi (ceea ce e
        semi-implementat in backend), dar oricum nimeni n-o sa stea mai mult de
        5 minute pe site
      </p>
    </div>
  );
}

export default App;
