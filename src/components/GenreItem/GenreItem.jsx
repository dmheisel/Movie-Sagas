import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import { Chip, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

//styling for page
const styles = theme => ({
	chip: {
		margin: theme.spacing(1)
	}
});

class GenreItem extends Component {
	//local state to control view of chip
	state = {
		movieHasGenre: this.props.inEdit
			? this.props.currentMovie.genres.includes(this.props.name)
			: 'true'
		//if in edit mode, return the value of the movieHasGenre prop, else return true
	};
	handleClick = (genre, movieHasGenre) => {
		if (this.props.inEdit) {
			//only trigger in edit mode
			if (movieHasGenre === true) {
				//if movie has this genre, remove it
				console.log(`Removing ${genre.name} from movie`);
				//find the index of the genre in the movie genres
				let index = this.props.currentMovie.genres.findIndex(
					movieGenre => movieGenre === genre.name
				);
				//use that index to find the matching junction id
				let junctionId = this.props.currentMovie.junction_table_ids[index];
				this.props.dispatch({
					type: 'REMOVE_GENRE',
					payload: {
						junctionId: junctionId,
						movieId: this.props.currentMovie.id
					}
				});
			} else {
				//else add genre to movie
				console.log(`Adding ${genre.name} to movie`);
				this.props.dispatch({
					type: 'ADD_GENRE',
					payload: { genreId: genre.id, movieId: this.props.currentMovie.id }
				});
			}
			this.setState({ movieHasGenre: !this.state.movieHasGenre });
			//toggles state to show new status (updates display)
		}
	};
	render() {
		const { classes } = this.props;
		return (
			<Chip
				label={this.props.name}
				className={classes.chip}
				color={this.state.movieHasGenre ? 'primary' : 'secondary'}
				//color is based on if the movie selected has the genre displayed
				avatar={<Avatar>{this.props.name[0]}</Avatar>}
				onClick={() =>
					this.handleClick(this.props.genre, this.state.movieHasGenre)
				}
			/>
		);
	}
}
const mapStateToProps = reduxStore => ({
	allGenres: reduxStore.genres,
	currentMovie: reduxStore.currentMovie
});
export default connect(mapStateToProps)(withStyles(styles)(GenreItem));
