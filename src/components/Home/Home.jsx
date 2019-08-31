import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: '80%'
	},
	moviePoster: {
		padding: theme.spacing(2),
		margin: 'auto',
		// width: '30vw'
	},
	image: {
		width: 'auto',
		height: 250
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	}
});

class Home extends Component {
	componentDidMount() {
		this.props.dispatch({ type: 'FETCH_MOVIES' });
	}

	handleClick = (id) => {
		this.props.dispatch({ type: 'SELECT_MOVIE', payload: id })
		this.props.history.push('/details')
	}

	render() {
		const { classes } = this.props;

		let gridHtml = this.props.movies.map((movie, index) => {
			return (
				<Grid container item key={index} xs={12} md={6} lg={4}>
					<Paper className={classes.moviePoster}>
						<Grid item>
							<ButtonBase
								className={classes.image}
								onClick={() => this.handleClick(movie.id)}>
								<img className={classes.img} alt='complex' src={movie.poster} />
							</ButtonBase>
						</Grid>
						<Grid item>
							<Typography variant='body2'>
								{movie.title}
							</Typography>
						</Grid>
					</Paper>
				</Grid>
			);
		});

		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<Grid container spacing={2}>
						{gridHtml}
					</Grid>
				</Paper>
			</div>
		);
	}
}
const mapStateToProps = reduxStore => ({
	movies: reduxStore.movies
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
