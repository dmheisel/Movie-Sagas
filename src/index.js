import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// saga imports
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
//material-ui theme imports
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#d12c2c', contrastText: '#ffffff' },
		secondary: { main: '#1dbfbf', contrastText: '#000000' }
	}
});

//SAGA stuff
// Create the rootSaga generator function
function* rootSaga() {
	yield takeEvery('FETCH_MOVIES', fetchMovies);
	yield takeEvery('SELECT_MOVIE', selectMovie);
	yield takeEvery('EDIT_MOVIE', editMovie);
}

function* fetchMovies(action) {
	try {
		let response = yield axios.get('/movies');
		yield put({ type: 'SET_MOVIES', payload: response.data });
	} catch (error) {
		yield console.log('error on fetching movies from server');
	}
}

function* selectMovie(action) {
	try {
		let response = yield axios.get(`/movies/details/${action.payload}`);
		yield put({ type: 'DISPLAY_MOVIE', payload: response.data });
	} catch (error) {
		yield console.log('error on fetching selected movie');
	}
}

function* editMovie(action) {
	try {
		yield axios.put(`/movies/${action.payload.id}`, action.payload);
		yield put({ type: 'SELECT_MOVIE', payload: action.payload.id });
	} catch (error) {
		yield console.log(`error on PUT route to server: `, error);
	}
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

//REDUCERS
// Used to store movies returned from the server
const movies = (state = [], action) => {
	switch (action.type) {
		case 'SET_MOVIES':
			return action.payload;
		default:
			return state;
	}
};

// Used to store the movie genres
const genres = (state = [], action) => {
	switch (action.type) {
		case 'SET_GENRES':
			return action.payload;
		default:
			return state;
	}
};

// Used to store the current movie for details/editing
const currentMovie = (state = { genres: [] }, action) => {
	switch (action.type) {
		case 'DISPLAY_MOVIE':
			return action.payload;
		default:
			return state;
	}
};

// Create one store that all components can use
const storeInstance = createStore(
	combineReducers({
		movies,
		genres,
		currentMovie
	}),
	// Add sagaMiddleware to our store
	applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={storeInstance}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
