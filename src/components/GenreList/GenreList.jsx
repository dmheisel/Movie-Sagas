import React, { Component } from 'react';
import GenreItem from '../GenreItem/GenreItem'
//material-ui imports
import { withStyles } from '@material-ui/core/styles';

//styling for page
const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
});

class GenreList extends Component {
	//component that loops over genres and creates GenreItem for each one
	render() {
		const { classes } = this.props;
		let listHtml = this.props.genres.map((genre, index) => (
			<GenreItem key={index} genre={genre} inDetails={this.props.inDetails} />
		));
		return <div className={classes.root}>{listHtml}</div>;
	}
}

export default (withStyles(styles)(GenreList));
