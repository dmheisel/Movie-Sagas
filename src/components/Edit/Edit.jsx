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
		display: 'flex',
		margin: 'auto',
		width: '80vw'
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
	}
	//this below will update state once props are received but throws errors, leaving out for now
	// componentWillReceiveProps(newProps) {
	// 	this.setState({
	// 		titleText: newProps.movie.title,
	// 		descriptionText: newProps.movie.description
	// 	});
	// }

	handleSubmit = () => {
		let editedMovie = {
			id: this.props.movie.id,
			title: this.state.titleText,
			description: this.state.descriptionText
		};
		console.log(editedMovie);
		this.props.dispatch({ type: 'EDIT_MOVIE', payload: editedMovie });
		this.props.history.push(`/details/${this.props.movie.id}`);
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
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
			</div>
		);
	}
}
const mapStateToProps = reduxStore => ({
	movie: reduxStore.currentMovie
});
export default connect(mapStateToProps)(withStyles(styles)(Edit));
