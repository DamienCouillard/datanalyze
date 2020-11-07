import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Dataset from './pages/Datasets';
import Analyze from './pages/Analyze';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <Switch>
              <Route exact path='/' component={Dataset} />
              <Route path='/analyze' component={Analyze} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;