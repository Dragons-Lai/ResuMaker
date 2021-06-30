import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "antd/dist/antd.css";
import "./styles/scss/_chunk.scss";
import "./styles/scss/_header.scss";

import { Loginform, Registerform, Homepage } from "./features/homePage";
import Resume from "./features/resume";
import ViewResume from "./features/resume/ViewResume";
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
        <Route path="/viewResume/:url_suffix" children={<ViewResume />}></Route>
      </Switch>
    </Router>
  );
}

export default App;
