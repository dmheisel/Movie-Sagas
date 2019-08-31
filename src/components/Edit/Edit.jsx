import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop: '2.5%'
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		width: '80vw'
	},
	descriptionField: {
		width: '75vw',
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	}
});

class Edit extends Component {
	state = {
		titleText: this.props.movie.title,
		descriptionText: this.props.movie.description
	};

	handleSubmit = () => {
		let editedMovie = {
			id: this.props.movie.id,
			title: this.state.titleText,
			description: this.state.descriptionText
		};
		console.log(editedMovie);
		this.props.dispatch({ type: 'EDIT_MOVIE', payload: editedMovie });
		this.props.history.push('/details');
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<TextField
						id='MovieTitleInput'
						label='Edit Movie Title'
						value={this.state.titleText}
						onChange={e => this.setState({ titleText: e.target.value })}
						className={classes.titleField}
						margin='normal'
						helperText='Edit Movie Title'
						variant='outlined'
					/>
					<TextField
						id='MovieDescriptionInput'
						label='Edit Movie Description'
						multiline
						value={this.state.descriptionText}
						onChange={e => this.setState({ descriptionText: e.target.value })}
						className={classes.descriptionField}
						margin='normal'
						helperText='Edit Movie Description'
						variant='outlined'
					/>
					<Button
						onClick={() => this.props.history.push('/details')}
						color='secondary'>
						Cancel
					</Button>
					<Button onClick={this.handleSubmit} color='secondary'>
						Submit
					</Button>
				</Paper>
			</div>
		);
	}
}
const mapStateToProps = reduxStore => ({
	movie: reduxStore.currentMovie
});
export default connect(mapStateToProps)(withStyles(styles)(Edit));
