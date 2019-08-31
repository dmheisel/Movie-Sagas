import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from '../Home/Home'
import CssBaseline from '@material-ui/core/CssBaseline'
import Details from '../Details/Details';
import Edit from '../Edit/Edit';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
			<Router>
				<CssBaseline />
				<Route exact path='/' component={Home} />
				<Route path='/details/:id' component={Details} />
				<Route path='/edit/:id' component={Edit} />
			</Router>
		);
  }
}

export default App;
