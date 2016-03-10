/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import {deepOrange500, lightGreenA700} from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import AppBar from 'material-ui/lib/app-bar';


const styles = {
  container: {
	textAlign: 'center',
  },
  header: {
  },
};

const muiTheme = getMuiTheme({
  palette: {
	primary1Color: lightGreenA700,
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
				title="SmartHome"
				conClassNameRight="muidocs-icon-navigation-expand-more"/>
			</div>
			<div>

			</div>
		</div>
	  </MuiThemeProvider>
	);
  }
}

export default Main;
