import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "antd/dist/antd.css";
import "./styles/_chunk.scss";

import { Loginform, Registerform, Homepage } from "./features/homepage";
import Resume from "./features/resume";
import AuthWrapper from "./features/resume/AuthWrapper";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/login">
          <Loginform />
        </Route>
        <Route path="/register">
          <Registerform />
        </Route>
        <Route path="/resume">
          <AuthWrapper>
            <Resume />
          </AuthWrapper>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
