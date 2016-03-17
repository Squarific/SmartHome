/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import {green500, green300, green100, grey500} from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import AppBar from 'material-ui/lib/app-bar';
import HouseHoldCard from './Components/HouseHoldCard';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Popover from 'material-ui/lib/popover/popover';
import {RegisterForm, LoginForm} from './Components/Authentication'
import {GraphCard} from './Components/Graphing';

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
	body: {
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: 20,
		marginBottom: 20,
		maxWidth: 1024,
	},
	cancelButton: {
		color: grey500,
	},
	submitButton: {
		color: green500,
	},
	horizontalLine: {
		margin: 10,
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
		this.handleCreateHouseHoldRequest = this.handleCreateHouseHoldRequest.bind(this);
		this.handleCreateHouseHoldClose = this.handleCreateHouseHoldClose.bind(this);
		this.handleCreateSensorRequest = this.handleCreateSensorRequest.bind(this);
		this.handleCreateSensorClose = this.handleCreateSensorClose.bind(this);
		this.handleViewHouseHold = this.handleViewHouseHold.bind(this);

		this.state = {
		  navbarOpen: false,
		  loginOpen: false,
		  createHouseHoldOpen: false,
		  createSensorOpen: false,
		  active: "HouseHoldCard",

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

	handleCreateHouseHoldRequest(event) {
		this.setState({
			createHouseHoldOpen: true,
			navbarOpen: false,
			anchorEl: event.currentTarget,
		});
	}

	handleCreateHouseHoldClose() {
		this.setState({
			createHouseHoldOpen: false,
		});
	}

	handleCreateSensorRequest(event) {
		this.setState({
			createSensorOpen: true,
			navbarOpen: false,
			anchorEl: event.currentTarget,
		});
	}

	handleCreateSensorClose() {
		this.setState({
			createSensorOpen: false,
		});
	}

	handleViewHouseHold() {
		this.setState({
			navbarOpen: false,	
			active: "Second",
		});
	}

	render() {
		const data = {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [
				{
					label: "My First dataset",
					fillColor: "rgba(220,220,220,0.5)",
					strokeColor: "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
					data: [65, 59, 80, 81, 56, 55, 40],
				},
				{
					label: "My Second dataset",
					fillColor: "rgba(76,175,80,0.5)",
					strokeColor: "rgba(151,187,205,0.8)",
					highlightFill: "rgba(151,187,205,0.75)",
					highlightStroke: "rgba(151,187,205,1)",
					data: [28, 48, 40, 19, 86, 27, 90],
				},
			],
		};

		const houseHoldActions = [
			<FlatButton style={styles.cancelButton}
				label="Cancel"
				secondary={true}
				onTouchTap={this.handleCreateHouseHoldClose}/>,

			<FlatButton style={styles.submitButton}
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleCreateHouseHoldClose}/>,
		];

		const sensorActions = [
			<FlatButton style={styles.cancelButton}
				label="Cancel"
				secondary={true}
				onTouchTap={this.handleCreateSensorClose}/>,

			<FlatButton style={styles.submitButton}
				label="Create"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleCreateSensorClose}/>,
		];

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
						onRequestClose={this.handleLoginRequestClose}>
						<div style={styles.popover}>
							<LoginForm/>
						</div>
					</Popover>				

					<LeftNav open={this.state.navbarOpen} style={styles.leftnav} docked={false}  onRequestChange={this.handleNavRequestClose} >
						<AppBar title="Menu" onLeftIconButtonTouchTap={this.handleNavRequestClose} />
						<hr style={styles.horizontalLine} color="white"/>
						<MenuItem onTouchTap={this.handleViewHouseHold}>View Households</MenuItem>
						<hr style={styles.horizontalLine} color="white"/>
						<MenuItem onTouchTap={this.handleCreateHouseHoldRequest}>Create Household</MenuItem>
						<MenuItem onTouchTap={this.handleCreateSensorRequest}>Create Sensor</MenuItem>
					</LeftNav>
				</div>
				<div style={styles.body}>
					{(() => {
        				switch (this.state.active) {
          					case "Second":   return "TRoL";
          					case "green": return "#00FF00";
          					case "blue":  return "#0000FF";
          					default:      return <HouseHoldCard
					title="Naam card (bv Huis van Bart: Vaatwasmachine)"
					subtitle="Subtitle card (bv: verbruik week 21/03/2016)"
					prev="vorige week"
					next="volgende week"
					data={data}/>;
        				}
      				})()}
						
					<Dialog
						title="Create Household"
						open={this.state.createHouseHoldOpen}
						onRequestClose={this.handleCreateHouseHoldClose}
						actions={houseHoldActions}>

						
					</Dialog>

					<Dialog
						title="Create Sensor"
						open={this.state.createSensorOpen}
						onRequestClose={this.handleCreateSensorClose}
						actions={sensorActions}>

						INSERT FORM
					</Dialog>
				</div>
			</div>
			</MuiThemeProvider>
		);
	}
}

/*
  data={data}
*/
export default Main;
