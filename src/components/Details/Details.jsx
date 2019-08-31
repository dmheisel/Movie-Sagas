import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenreList from '../GenreList/GenreList';

//material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop: '2.5%'
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		width: '80vw'
	}
});

class Details extends Component {
	componentDidMount() {
		this.props.dispatch({type: 'SELECT_MOVIE', payload: this.props.match.params.id})
	}
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<Typography variant="h3">
						{this.props.movie.title}
					</Typography>
					<Typography variant='body1'>
						{this.props.movie.description}
					</Typography>
					<GenreList genres={this.props.movie.genres} inDetails={true}/>
					<Button
						onClick={() => this.props.history.push('/')}
						color='secondary'>
						Return to List
					</Button>
					<Button
						onClick={() => this.props.history.push(`/edit/${this.props.match.params.id}`)}
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
