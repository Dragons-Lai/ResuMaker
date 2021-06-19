import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import "antd/dist/antd.css";
import "./styles/_chunk.scss";
import { login, register, logout } from "./features/homePage/api";
import axios from "./axios";

import Login from "./features/homePage";
import Resume from "./features/resume";
import AuthWrapper from "./features/resume/AuthWrapper";


const AuthRoute = ({loginState}) => {
  console.log("loginState", loginState)
  if (loginState === false)
    return <Redirect to="/" />;
  else
    return (
      <Route path="/resume">
        <Resume />
      </Route>);
};

// 把未登入者導到登入頁
function App() {
  const [loginState, setLoginState] = useState(null);

  axios.get("/isLogin")
  .then((res)=>{
    const isLogin = res.data
    setLoginState(isLogin)
  })
  .catch((err) => {
    console.log(err)
  })

  return (
    <Router>
      <Switch>  
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/test">
          <button onClick={ () => {
            login("Yun", "test")
          }}>login</button>
          <button onClick={ () => register("Fish", "Yun", "test")}>register</button>
          <button onClick={ () => {
            axios.post("/saveOrder", { ChunkList: [1, 2] })
            .then((res)=>{console.log("res", res)})
            .catch((err) => console.log("err", err))
          }}>saveOrder</button>
          <button onClick={ () => {} }>setLoginState</button>
          <button onClick={ () => {logout()} }>logout</button>
          </Route>
        <Route path="/resume">
          <Resume />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
