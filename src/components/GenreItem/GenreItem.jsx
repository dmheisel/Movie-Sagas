import React, { Component } from 'react';

//material-ui imports
import { Chip, Avatar } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
	chip: {
		margin: theme.spacing(1)
	}
});

class GenreItem extends Component {
  state = {
		open: this.props.inDetails? true:false
  }
	render() {
		const { classes } = this.props;
		return (
			<Chip
				label={this.state.open && this.props.genre}
				className={classes.chip}
				color='primary'
				avatar={<Avatar>{this.props.genre[0]}</Avatar>}
				onClick={e => this.setState({ open: !this.state.open })}
			/>
		);
	}
}

export default withStyles(styles)(GenreItem);
