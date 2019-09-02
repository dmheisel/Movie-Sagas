import React, { Component } from 'react';
import { connect } from 'react-redux';
import GenreList from '../GenreList/GenreList';

//material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//styling for page
const styles = theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		margin: 'auto',
		width: '80vw',
		flexGrow: 1,
		marginTop: '2.5%'
	},
	descriptionField: {
		width: '50vw',
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	titleField: {
		width: '25vw',
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	content: {
		display: 'flex',
		flexDirection: 'column'
	},
	buttonContainer: {
		display: 'inline',
		margin: 'auto'
	}
});

class Edit extends Component {
	//local state to keep current values in input fields
	state = {
		titleText: this.props.movie.title,
		descriptionText: this.props.movie.description
	};

	componentDidMount() {
		//selects the movie from the server, this goes to saga which sends to reducer
		this.props.dispatch({
			type: 'SELECT_MOVIE',
			payload: this.props.match.params.id
		});
		this.props.dispatch({
			type: 'FETCH_GENRES'
		})
	}
	//this below will update state once props are received but throws errors, leaving out for now
	// componentWillReceiveProps(newProps) {
	// 	this.setState({
	// 		titleText: newProps.movie.title,
	// 		descriptionText: newProps.movie.description
	// 	});
	// }

	handleSubmit = () => {
		//creates movie to send as payload
		let editedMovie = {
			id: this.props.movie.id,
			title: this.state.titleText,
			description: this.state.descriptionText
		};
		console.log(editedMovie);
		//dispatches to sagas with new info
		this.props.dispatch({ type: 'EDIT_MOVIE', payload: editedMovie });
		//pushes back to details page for movie
		this.props.history.push(`/details/${this.props.movie.id}`);
	};

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.paper}>
				{/* Paper is background for poster and edit fields */}
				<div>
					<img src={this.props.movie.poster} alt='movie poster' />
				</div>
				<div className={classes.content}>
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
					<GenreList inEdit={true} genres={this.props.movie.genres} />
					<div className={classes.buttonContainer}>
						<Button
							onClick={() =>
								this.props.history.push(`/details/${this.props.movie.id}`)
							}
							color='secondary'>
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color='secondary'>
							Submit
						</Button>
					</div>
				</div>
			</Paper>
		);
	}
}
const mapStateToProps = reduxStore => ({
	movie: reduxStore.currentMovie
});
export default connect(mapStateToProps)(withStyles(styles)(Edit));
