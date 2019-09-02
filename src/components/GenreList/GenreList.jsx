import React, { Component } from 'react';
import GenreItem from '../GenreItem/GenreItem';
import { connect } from 'react-redux';
//material-ui imports
import { withStyles } from '@material-ui/core/styles';

//styling for page
const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	}
});

class GenreList extends Component {
	//component that loops over genres and creates GenreItem for each one
	handleClick = (genreId, movieHasGenre) => {
		if (movieHasGenre === true) {
			console.log(`Removing ${genreId} from movie`);
			this.props.dispatch({
				type: 'REMOVE_GENRE',
				payload: { genreId: genreId, movieId: this.props.currentMovie.id }
			});
		} else {
			console.log(`Adding ${genreId} to movie`);
			this.props.dispatch({
				type: 'ADD_GENRE',
				payload: { genreId: genreId, movieId: this.props.currentMovie.id }
			});
		}
	};

	render() {
		const { classes } = this.props;

		let listHtml =
			this.props.inEdit === true
				? this.props.allGenres.map(genre => (
						<GenreItem
							key={genre.id}
							name={genre.name}
							genre={genre}
							inEdit={this.props.inEdit}
							movieHasGenre={this.props.genres.includes(genre.name)}
							handleClick={this.handleClick}
						/>
				  ))
				: this.props.genres.map((genre, index) => (
						<GenreItem key={index} name={genre} inEdit={this.props.inEdit} />
				  ));

		return <div className={classes.root}>{listHtml}</div>;
	}
}
const mapStateToProps = reduxStore => ({
	allGenres: reduxStore.genres,
	currentMovie: reduxStore.currentMovie
});
export default connect(mapStateToProps)(withStyles(styles)(GenreList));
