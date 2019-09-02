import React, { Component } from 'react';

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
		movieHasGenre: this.props.inEdit ? this.props.movieHasGenre : 'true'
		//if in edit mode, return the value of the movieHasGenre prop, else return true
	};
	click = () => {
		//only fires click handler if on the edit page
		if (this.props.inEdit) {
			this.props.handleClick(this.props.genre.id, this.state.movieHasGenre)
		}
	}
	render() {
		const { classes } = this.props;
		return (
			<Chip
				label={this.props.name}
				className={classes.chip}
				color={this.state.movieHasGenre ? 'primary' : 'secondary'}
				//color is based on if the movie selected has the genre displayed
				avatar={<Avatar>{this.props.name[0]}</Avatar>}
				onClick={this.click}
			/>
		);
	}
}

export default withStyles(styles)(GenreItem);
