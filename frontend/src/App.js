import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./features/login";
import Resume from "./features/resume";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>      
        <Route path="/resume">
          <Resume />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
