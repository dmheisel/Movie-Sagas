import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import MovieItem from '../MovieItem/ MovieItem';

const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop: '2.5%'
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: '80%',
		background: theme.palette.background
	},
	grid: {
		height: '90vh',
		overflow: 'auto',
		margin: 'auto'
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

		let gridHtml = this.props.movies.map(movie => {
			return (
				<MovieItem key={movie.id} movie={movie} handleClick={this.handleClick}/>
			);
		});

		return (
			<Grid className={classes.root}>
				<Paper className={classes.paper}>
					<Grid className={classes.grid} container spacing={2}>
						{gridHtml}
					</Grid>
				</Paper>
			</Grid>
		);
	}
}
const mapStateToProps = reduxStore => ({
	movies: reduxStore.movies
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
