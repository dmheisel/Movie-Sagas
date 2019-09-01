import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenreList from '../GenreList/GenreList';

//material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//styling for page
const styles = theme => ({
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		width: '80vw',
		display: 'flex',
		flexGrow: 1,
		marginTop: '2.5%'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	content: {
		display: 'flex',
		flexDirection: 'column'
	},
	buttonContainer: {
		display: 'inline',
		margin: 'auto'
	}
});

class Details extends Component {
	componentDidMount() {
		this.props.dispatch({
			type: 'SELECT_MOVIE',
			payload: this.props.match.params.id
		});
	}
	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.paper}>
				{/* Paper is background behind movie info */}
				<div id="posterDiv">
					<img src={this.props.movie.poster} alt='Movie Poster' />
				</div>
				<div className={classes.content}>
					<Typography className={classes.textField} variant='h3'>
						{this.props.movie.title}
					</Typography>
					<Typography className={classes.textField} variant='body1'>
						{this.props.movie.description}
					</Typography>
					{/* GenreList is reusable component to display genres */}
					<GenreList genres={this.props.movie.genres} inDetails={true} />
					<div className={classes.buttonContainer}>
						<Button
							onClick={() => this.props.history.push('/')}
							color='secondary'>
							Return to List
						</Button>
						<Button
							onClick={() =>
								this.props.history.push(`/edit/${this.props.match.params.id}`)
							}
							color='secondary'>
							Edit
						</Button>
					</div>
				</div>
			</Paper>
		);
	}
}
const mapStateToProps = reduxStore => ({
	movie: reduxStore.currentMovie
});
export default connect(mapStateToProps)(withStyles(styles)(Details));
