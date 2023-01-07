import React from "react";

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

import "./App.css";

function App() {
  const [authData, setAuthData] = React.useState({ username: "", password: "" });
  const [loginData, setLoginData] = React.useState({ username: "", password: "" });

  function handleChange(event) {
    setAuthData((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  }
  function handleChangeLogin(event) {
    setLoginData((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  }

  function signupHandler(event) {
    event.preventDefault();
    fetch("http://localhost:8080/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: authData.username,
        password: authData.password,
      }),
    });
  }
  function loginHandler(event) {
    event.preventDefault();
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password,
      }),
    }).then(res => {
      return res.json()
    }).then(resData => {
      console.log(resData)
      localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
    });
  }


  const prizes = [
    {
      image: 'https://i.ibb.co/6Z6Xm9d/good-1.png',
    },
    {
      image: 'https://i.ibb.co/T1M05LR/good-2.png',
    },
    {
      image: 'https://i.ibb.co/Qbm8cNL/good-3.png',
    },
    {
      image: 'https://i.ibb.co/5Tpfs6W/good-4.png',
    },
    {
      image: 'https://i.ibb.co/64k8D1c/good-5.png',
    },
  ];
  
  const winPrizeIndex = 0;
  
  const reproductionArray = (array = [], length = 0) => [
    ...Array(length)
      .fill('_')
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
    id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : generateId(),
  }));
  const [start, setStart] = React.useState(false);

  const prizeIndex = prizes.length * 4 + winPrizeIndex;

  const handleStart = () => {
    setStart((prevState) => !prevState);
  };

  const handlePrizeDefined = () => {
    console.log('🥳 Prize defined! 🥳');
  };
  return (
    <div className="App">

      <h1 className="camelTest">camel</h1>
      <RoulettePro
        prizes={prizeList}
        prizeIndex={prizeIndex}
        start={start}
        onPrizeDefined={handlePrizeDefined}
      />
      <button onClick={handleStart}>Start</button>
      <form>
        <input
          onChange={handleChange}
          type="text"
          value={authData.username}
          name="username"
        ></input>
        <input
          onChange={handleChange}
          type="password"
          value={authData.password}
          name="password"
        ></input>
        <button onClick={signupHandler} type="submit">SUBMIT</button>
      </form>
      <form>
        <input
          onChange={handleChangeLogin}
          type="text"
          value={loginData.username}
          name="username"
        ></input>
        <input
          onChange={handleChangeLogin}
          type="password"
          value={loginData.password}
          name="password"
        ></input>
        <button onClick={loginHandler} type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default App;
