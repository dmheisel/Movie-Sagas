import React, { Component } from 'react';
//material-ui imports
import {
	Paper,
	Typography,
	ButtonBase,
	List,
	ListItem,
	ListItemText,
	Divider
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GenreList from '../GenreList/GenreList';
import { borderRadius } from '@material-ui/system';

//styling for page
const styles = theme => ({
	moviePoster: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
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
	},
	list: {
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.primary.contrastText,
		borderRadius: '5px'
	}
});

class MovieItem extends Component {
	render() {
		const { classes } = this.props;
		let genres = this.props.movie.genres.map((genre, index) => {
			return (
				<>
					{index > 0 && <Divider />}
					<ListItem key={index}>
						<ListItemText primary={genre} />
					</ListItem>
				</>
			);
		});
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
				<List dense={true} className={classes.list}>
					{genres}
				</List>
			</Paper>
		);
	}
}

export default withStyles(styles)(MovieItem);
