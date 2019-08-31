import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		width: '80vw'
	}
});

class Details extends Component {
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<Typography variant='body1'>
						{this.props.movie.description}
					</Typography>
					<Button
						onClick={() => this.props.history.push('/')}

						color='secondary'>
						Return to List
					</Button>
					<Button
						onClick={() => this.props.history.push('/edit')}
						color='secondary'>
						Edit
					</Button>
				</Paper>
			</div>
		);
	}
}
const mapStateToProps = reduxStore => ({
	movie: reduxStore.currentMovie
});
export default connect(mapStateToProps)(withStyles(styles)(Details));
