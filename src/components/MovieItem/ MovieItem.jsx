import React, { Component } from 'react';
//material-ui imports
import { Paper, Typography, ButtonBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GenreList from '../GenreList/GenreList';

//styling for page
const styles = theme => ({
	moviePoster: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 225
	},
	image: {
		width: 'auto',
		margin: 'auto'
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	},
	title: {
		textAlign: 'center'
	}
});

class MovieItem extends Component {
	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.moviePoster}>
				<ButtonBase
					// ButtonBase allows user to click anywhere on poster
					className={classes.image}
					onClick={() => this.props.handleClick(this.props.movie.id)}>
					<img
						className={classes.img}
						alt='complex'
						src={this.props.movie.poster}
					/>
				</ButtonBase>
				<Typography variant='subtitle1' noWrap={false}>
					{this.props.movie.title}
				</Typography>
				<GenreList genres={this.props.movie.genres} />
			</Paper>
		);
	}
}

export default withStyles(styles)(MovieItem);
