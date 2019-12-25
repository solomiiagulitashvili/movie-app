import React from "react";
import "./styles/index.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./Homepage";
import OneMovie from "./OneMovie";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Movie App</h1>
        </div>
        <Router>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/:one-movie" component={OneMovie}></Route>
        </Router>
      </div>
    );
  }
}

export default App;
