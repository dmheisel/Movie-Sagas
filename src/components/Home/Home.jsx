import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		// padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500
	},
	image: {
		width: 128,
		height: 128
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
		this.props.dispatch({type: 'FETCH_MOVIES'})
	}
	render() {
    const {classes} = this.props
    return (
			<div className={classes.root}>
				{JSON.stringify(this.props.movies)}
        <Paper className={classes.Paper}>
          <Grid container spacing={8}>

          </Grid>
        </Paper>
      </div>
    );
  }
}
const mapStateToProps = reduxStore => ({
	movies: reduxStore.movies
})

export default connect(mapStateToProps)(withStyles(styles)(Home));
