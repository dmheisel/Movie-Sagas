import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

	moviePoster: {
		padding: theme.spacing(2),
		margin: 'auto',
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
});

class MovieItem extends Component {
	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.moviePoster}>
				<Grid item>
					<ButtonBase
						className={classes.image}
						onClick={() => this.props.handleClick(this.props.movie.id)}>
						<img
							className={classes.img}
							alt='complex'
							src={this.props.movie.poster}
						/>
					</ButtonBase>
				</Grid>
				<Grid item>
					<Typography variant='caption' noWrap={false}>
						{this.props.movie.title}
					</Typography>
				</Grid>
			</Paper>
		);
	}
}

export default connect()(withStyles(styles)(MovieItem));
