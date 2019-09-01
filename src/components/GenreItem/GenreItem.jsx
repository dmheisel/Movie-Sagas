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
		isOpen: this.props.inDetails ? true : false
	};

	render() {
		const { classes } = this.props;
		return (
			<Chip
				label={this.state.isOpen && this.props.genre}
				// label shows full genre name if chip state 'isOpen'
				className={classes.chip}
				color='primary'
				avatar={<Avatar>{this.props.genre[0]}</Avatar>}
				//avatar for chip is first letter of genre name
				onClick={e => this.setState({ isOpen: !this.state.isOpen })}
				//toggles isOpen state of chip
			/>
		);
	}
}

export default withStyles(styles)(GenreItem);
