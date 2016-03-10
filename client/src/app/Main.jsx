/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import {green500, green300, green100} from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import AppBar from 'material-ui/lib/app-bar';
import HouseHoldCard from './HouseHoldCard';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

//-------------------------------------------------------------

const styles = {
	container: {
		textAlign: 'center',
	},
	header: {
	},
	loginButton: {
		color: green500,
	},
};

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: green500,
		primary2Color: green300,
		primary3Color: green100,
	},
});

class Main extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleNavRequestClose = this.handleNavRequestClose.bind(this);
		this.handleNavTouchTap = this.handleNavTouchTap.bind(this);

		this.state = {
		  navbarOpen: false,
		};
	}

	handleNavRequestClose() {
		this.setState({
		  navbarOpen: false,
		});
	}

	handleNavTouchTap() {
		this.setState({
		  navbarOpen: true,
		});
	}

	render() {
	return (
		<MuiThemeProvider muiTheme={muiTheme}>
		<div style={styles.container}>
			<div style={styles.header}>
				<AppBar
				title="SmartHome"
				iconElementRight={
					<FlatButton style={styles.loginButton}
					backgroundColor={"#FFFFFF"}
					hoverColor={"#DDDDDD"}
					rippleColor={"#BBBBBB"}
					label="Log in"/>
				}
				onLeftIconButtonTouchTap={this.handleNavTouchTap}/>

				<LeftNav open={this.state.navbarOpen} style={styles.leftnav}>
					<MenuItem onTouchTap={this.handleNavRequestClose}>Close</MenuItem>
					<MenuItem>...</MenuItem>
					<MenuItem>...</MenuItem>
				</LeftNav>
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
