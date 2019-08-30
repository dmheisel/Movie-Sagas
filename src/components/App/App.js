import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from '../Home/Home'
import CssBaseline from '@material-ui/core/CssBaseline'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
			<Router>
				<CssBaseline />
				<Route exact path='/' component={Home} />
			</Router>
		);
  }
}

export default App;
