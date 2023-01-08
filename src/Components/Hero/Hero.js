import React from "react";
import "./Hero.css";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

export default function Hero(props) {
  return (
    <div className="heroContainer">
      <h1 className="title">CamExchange</h1>
      <div className="formsContainer">
        <Signup isAuth = {props.isAuth}/>
        <Login isAuth = {props.isAuth} setIsAuth = {props.setIsAuth} />
      </div>
    </div>
  );
}
