import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dataset from "./pages/Datasets";
import Analyze from "./pages/Analyze";
import Tables from "./pages/Tables";
import MLEngine from "./pages/MLEngine";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Dataset} />
            <Route path="/analyze" component={Analyze} />
            <Route path="/tables" component={Tables} />
            <Route path="/mlengine" component={MLEngine} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
