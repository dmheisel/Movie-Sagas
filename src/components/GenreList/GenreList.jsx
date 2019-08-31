import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	chip: {
		margin: theme.spacing(1)
	}
});

class GenreList extends Component {
	render() {
		const { classes } = this.props;
		let listHtml = this.props.genres.map((genre, index) => (
			<Chip
				key={index}
				className={classes.chip}
				label={genre}
				color='primary'
				avatar={<Avatar>{genre[0]}</Avatar>}
			/>
		));
		return <div className={classes.root}>{listHtml}</div>;
	}
}
const mapStateToProps = reduxStore => ({
	genres: reduxStore.currentMovie.genres
})
export default connect(mapStateToProps)(withStyles(styles)(GenreList));
