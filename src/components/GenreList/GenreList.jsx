import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenreItem from '../GenreItem/GenreItem'

//material-ui imports
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},

});

class GenreList extends Component {

	render() {
		const { classes } = this.props;
		let listHtml = this.props.genres.map((genre, index) => (
			<GenreItem key={index} genre={genre} inDetails={this.props.inDetails} />
		));
		return <div className={classes.root}>{listHtml}</div>;
	}
}

export default connect()(withStyles(styles)(GenreList));
