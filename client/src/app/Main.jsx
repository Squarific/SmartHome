/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import {green500} from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

import {RegisterForm, LoginForm} from './Authentication'
import AppBar from 'material-ui/lib/app-bar';
import HouseHoldCard from './HouseHoldCard';
//import GraphCard from './Graphing';

const styles = {
  container: {
	textAlign: 'center',
  },
  header: {
  },
};

const muiTheme = getMuiTheme({
  palette: {
	primary1Color: green500,
  },
});

class Main extends React.Component {
  constructor(props, context) {
	super(props, context);
	this.handleRequestClose = this.handleRequestClose.bind(this);
	this.handleTouchTap = this.handleTouchTap.bind(this);

	this.state = {
	  open: false,
	};
  }

  handleRequestClose() {
	this.setState({
	  open: false,
	});
  }

  handleTouchTap() {
	this.setState({
	  open: true,
	});
  }

  render() {
	const standardActions = (
	  <FlatButton
		label="Okey"
		secondary={true}
		onTouchTap={this.handleRequestClose}/>
	);

	return (
	  <MuiThemeProvider muiTheme={muiTheme}>
		<div style={styles.container}>
			<div style={styles.header}>
				<AppBar
				title="SmartHome"/>
			</div>
			<div>
				<HouseHoldCard
				title="Naam card (bv Huis van Bart: Vaatwasmachine)"
				subtitle="Subtitle card (bv: verbruik week 21/03/2016)"
				prev="vorige week"
				next="volgende week"/>
			</div>
		</div>
	  </MuiThemeProvider>
	);
  }
}

export default Main;
