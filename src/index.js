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

//creates theme to provide to page
const theme = createMuiTheme({
	palette: {
		primary: { main: '#d12c2c', contrastText: '#ffffff' },
		secondary: { main: '#1dbfbf', contrastText: '#000000' }
	}
});

//SAGA stuff
// Create the rootSaga generator function to provide all saga actions
function* rootSaga() {
	yield takeEvery('FETCH_MOVIES', fetchMovies);
	yield takeEvery('SELECT_MOVIE', selectMovie);
	yield takeEvery('EDIT_MOVIE', editMovie);
	yield takeEvery('FETCH_GENRES', fetchGenres);
	yield takeEvery('ADD_GENRE', addGenre);
	yield takeEvery('REMOVE_GENRE', removeGenre);
}

//saga function to fetch all moves from database
function* fetchMovies(action) {
	try {
		let response = yield axios.get('/movies');
		yield put({ type: 'SET_MOVIES', payload: response.data });
	} catch (error) {
		yield console.log('error on fetching movies from server');
	}
}

//saga function to select a specific movie from database
function* selectMovie(action) {
	try {
		let response = yield axios.get(`/movies/details/${action.payload}`);
		yield put({ type: 'DISPLAY_MOVIE', payload: response.data });
	} catch (error) {
		yield console.log('error on fetching selected movie');
	}
}

//saga function to edit movie in database
function* editMovie(action) {
	try {
		yield axios.put(`/movies/${action.payload.id}`, action.payload);
		yield put({ type: 'SELECT_MOVIE', payload: action.payload.id });
	} catch (error) {
		yield console.log(`error on PUT route to server: `, error);
	}
}

function* fetchGenres(action) {
	try {
		let response = yield axios.get('/genres');
		yield put({ type: 'SET_GENRES', payload: response.data });
	} catch (error) {
		yield console.log('error on fetching genres from server');
	}
}

function* addGenre(action) {
	try {
		yield axios.post(`/genres`, action.payload);
		yield put({ type: 'FETCH_MOVIES' });
		yield put({ type: 'SELECT_MOVIE', payload: action.payload.movieId });
	} catch (error) {
		yield console.log('error on adding genre to movie from server');
	}
}

function* removeGenre(action) {
	try {
		yield axios.delete(`/genres/${action.payload.junctionId}`);
		yield put({ type: 'FETCH_MOVIES' });
		yield put({ type: 'SELECT_MOVIE', payload: action.payload.movieId });
	} catch (error) {
		yield console.log('error on deleting genre from movie');
	}
}

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

// Used to store all the movie genres, for comparing against current movie
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

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

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
