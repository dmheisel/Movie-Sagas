import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		width: '80vw'
	},
	textField: {
		width: '75vw',
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	}
});

class Edit extends Component {
	state = {
		text: this.props.movie.description
	};

	handleSubmit = () => {
		let editedMovie = { id: this.props.movie.id, description: this.state.text };
		console.log(editedMovie);
		this.props.dispatch({ type: 'EDIT_DESCRIPTION', payload: editedMovie });
		this.props.history.push('/details')
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<TextField
						id='Text Input Field'
						label='Edit Description'
						multiline
						value={this.state.text}
						onChange={e => this.setState({ text: e.target.value })}
						className={classes.textField}
						margin='normal'
						helperText='Edit Description'
						variant='outlined'
					/>
					<Button
						onClick={() => this.props.history.push('/')}
						color='secondary'>
						Return to List
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
