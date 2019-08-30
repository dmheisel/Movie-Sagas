import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from '../Home/Home'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <Route exact path='/' component={Home} />
      </Router>
    );
  }
}

export default App;
