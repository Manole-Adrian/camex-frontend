import React from "react";

import RoulettePro from "react-roulette-pro";
import "react-roulette-pro/dist/index.css";

import "./Roulette.css";

export default function Roulette(props) {
  const prizes = [
    {
      image: "camel10.png",
    },
    {
      image: "camel5.png",
    },
    {
      image: "camel15.png",
    },
    {
      image: "camel5.png",
    },
    {
      image: "camel10.png",
    },
    {
      image: "camel5.png",
    },
    {
      image: "camel5.png",
    },
    {
      image: "camel10.png",
    },
    {
      image: "camel5.png",
    },
    {
      image: "camel5.png",
    },
  ];

  const winPrizeIndex = 0;

  const reproductionArray = (array = [], length = 0) => [
    ...Array(length)
      .fill("_")
      .map(() => array[Math.floor(Math.random() * array.length)]),
  ];

  const reproducedPrizeList = [
    ...prizes,
    ...reproductionArray(prizes, prizes.length * 3),
    ...prizes,
    ...reproductionArray(prizes, prizes.length),
  ];

  const generateId = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

  const prizeList = reproducedPrizeList.map((prize) => ({
    ...prize,
    id:
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : generateId(),
  }));
  const [start, setStart] = React.useState(false);


  const [prizeIndex,setPrizeIndex] = React.useState(0)
  const [prizeReward,setPrizeReward] = React.useState(0)

  let authToken;
  try {
    authToken = localStorage.getItem("token");
  } catch {
    console.log("not auth");
  }
  const handleStart = () => {
    if(start === false)
    {

      fetch("https://camex-backend.onrender.com/feed/getReward", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          console.log(resData);
          setPrizeIndex(prizes.length * 4 + resData.reward.index);
          setPrizeReward(resData.reward.reward);
          setStart((prevState) => !prevState);
        }).catch((err) => {
          console.log(err)
        });
    } else {
      setStart((prevState) => !prevState)
    };
    } 

  const handlePrizeDefined = () => {
    
    fetch("https://camex-backend.onrender.com/feed/addCamels", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addCamels:prizeReward
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      });

    props.setCamels((prevCamels) => {
      return prevCamels + prizeReward;
    });
  };

  return (
    <div className="rouletteContainer">
      <RoulettePro
        prizes={prizeList}
        prizeIndex={prizeIndex}
        start={start}
        onPrizeDefined={handlePrizeDefined}
        spinningTime={3}

      />
      {props.isAuth && <button onClick={handleStart}>{start === false ? "Start" : "Reset"}</button>}
    </div>
  );
}
