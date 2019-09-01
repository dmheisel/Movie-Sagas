import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import GenreList from '../GenreList/GenreList';

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

export default connect()(withStyles(styles)(MovieItem));
