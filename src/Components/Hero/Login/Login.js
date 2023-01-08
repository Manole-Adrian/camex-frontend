import React from "react";
import "./Login.css";

export default function Login(props) {
  const [loginData, setLoginData] = React.useState({
    username: "",
    password: "",
  });

  function handleChangeLogin(event) {
    setLoginData((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  }

  function loginHandler(event) {
    event.preventDefault();
    fetch("https://camex-backend.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        props.setIsAuth(true);
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
      });
  }

function logoutHandler() {
  props.setIsAuth(false);
  localStorage.removeItem("token")
  localStorage.removeItem("userId")
}
  return (
    <div>
      {props.isAuth === false && <form className="loginContainer">
        <h2>Log in!</h2>
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
        <button onClick={loginHandler} type="submit">
          SUBMIT
        </button>
      </form>}
      {props.isAuth === true && <button className="logoutButton" onClick={logoutHandler}>Log Out!</button>}
    </div>
  );
}
