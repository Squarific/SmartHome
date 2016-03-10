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
import Popover from 'material-ui/lib/popover/popover';
import {RegisterForm, LoginForm} from './Authentication'
//import GraphCard from './Graphing';

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
	popover: {
		padding: 20,
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
		this.handleLoginRequestClose = this.handleLoginRequestClose.bind(this);
		this.handleLoginTouchTap = this.handleLoginTouchTap.bind(this);

		this.state = {
		  navbarOpen: false,
		  loginOpen: false,
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

	handleLoginRequestClose() {
		this.setState({
		  loginOpen: false,
		});
	}

	handleLoginTouchTap(event) {
		this.setState({
		  loginOpen: true,
		  anchorEl: event.currentTarget,
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
					label="Log in"
					onTouchTap={this.handleLoginTouchTap}/>
				}
				onLeftIconButtonTouchTap={this.handleNavTouchTap}/>

				<Popover
					open={this.state.loginOpen}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					onRequestClose={this.handleRequestLoginClose}>
					<div style={styles.popover}>
						<RegisterForm/>
					</div>
				</Popover>

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
