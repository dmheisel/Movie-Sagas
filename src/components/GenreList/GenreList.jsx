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
						/>
				  ))
				: this.props.currentMovie.genres.map((genre, index) => (
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
