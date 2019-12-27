import React from 'react';
import './styles/index.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Homepage from './Homepage';
import OneMovie from './OneMovie';


const App = () => (
  <div className="App">
    <Router>
    <div className="header">
      <Link to="/">
        <h1>Movie App</h1>
      </Link>
    </div>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route path="/one-movie/:id" component={OneMovie}></Route>
    </Router>
  </div>
);

export default App;
