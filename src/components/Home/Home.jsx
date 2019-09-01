import React, { Component } from 'react';
import { connect } from 'react-redux';
//material-ui imports
import { Paper, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MovieItem from '../MovieItem/ MovieItem';

//styling for page
const styles = theme => ({
	paper: {
		flexGrow: 1,
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: '80vw',
		maxHeight: '95vh',
		marginTop: '2%',
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
		//fetches moveis on component mount, saga sets to state
		this.props.dispatch({ type: 'FETCH_MOVIES' });
	}

	handleClick = id => {
		//pushes to details page of id clicked on
		this.props.history.push(`/details/${id}`);
	};

	render() {
		const { classes } = this.props;
		//maps over list of movies and creates a movie item for each
		let gridHtml = this.props.movies.map(movie => {
			return (
				//num of columns in grid is responsive to screen size
				<Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
					<MovieItem movie={movie} handleClick={this.handleClick} />
				</Grid>
			);
		});

		return (
			<Paper className={classes.paper}>
				<Grid className={classes.grid} container spacing={2}>
					{gridHtml}
				</Grid>
			</Paper>
		);
	}
}
const mapStateToProps = reduxStore => ({
	movies: reduxStore.movies
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
