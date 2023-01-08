import React from "react";
import "./Signup.css";

export default function Signup(props) {
  const [authData, setAuthData] = React.useState({
    username: "",
    password: "",
  });
  function handleChange(event) {
    setAuthData((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  }
  function signupHandler(event) {
    event.preventDefault();
    fetch("https://camex-backend.onrender.com/auth/signup", {
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
  return (
    <div>
      {props.isAuth === false && <form className="signupForm">
        <h2>Sign-up!</h2>
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
        <button onClick={signupHandler} type="submit">
          SUBMIT
        </button>
      </form>}
    </div>
  );
}
