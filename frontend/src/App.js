import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "antd/dist/antd.css";
import "./styles/_chunk.scss";
import { login, register, logout } from "./features/homePage/api";
import axios from "./axios";

import Login from "./features/homePage";
import Resume from "./features/resume";
import AuthWrapper from "./features/resume/AuthWrapper";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/test">
          <button
            onClick={() => {
              login("Yun", "test");
            }}
          >
            login
          </button>
          <button onClick={() => register("Fish", "Yun", "test")}>
            register
          </button>
          <button
            onClick={() => {
              axios
                .get("/getOrder", { ChunkList: [1, 2] })
                .then((res) => {
                  console.log("res", res);
                })
                .catch((err) => console.log("err", err));
            }}
          >
            getOrder
          </button>
          <button
            onClick={() => {
              logout();
            }}
          >
            logout
          </button>
        </Route>
        <Route path="/resume">
          <AuthWrapper>
            <Resume />
          </AuthWrapper>
        </Route>
        );
      </Switch>
    </Router>
  );
}

export default App;
