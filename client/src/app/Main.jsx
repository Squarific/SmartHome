/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';

// Material includes
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import {green700, green600, green500, green300, green100, grey500} from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import AppBar from 'material-ui/lib/app-bar';
import HouseHoldCard from './Components/HouseHoldCard';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Popover from 'material-ui/lib/popover/popover';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';

// Own components
import {RegisterForm, LoginForm} from './Components/Authentication'
import {GraphCard} from './Components/Graphing';
import Divider from 'material-ui/lib/divider';
import {HouseHoldSelect} from './Components/HouseHoldSelect';
import {PowerUnitSelect} from './Components/PowerUnitSelect';
import {Rest} from './Components/Rest';

// Page components
import {HouseHoldList} from './PageComponents/HouseHoldList';
import {Wall} from './PageComponents/Wall';
import {Notifications} from './PageComponents/Notifications';


//-------------------------------------------------------------

const styles = {
	container: {
		textAlign: 'center',
	},
	header: {
	},
	loginButton: {
		marginLeft: "1em",
		color: "white",
	},
	registerButton: {
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
	form: {
		textAlign: "center",
	},
	formLabel: {
		fontWeight: 500,
		textAlign: "left",
		minWidth: "10em",
		display: "inline-block",
	},
	dialog: {
		textAlign: "center",
	},
};

const rest = new Rest("http://localhost:8000/");

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: green500,
		primary2Color: green300,
		primary3Color: green100,
		accent1Color: green500,
	},
});

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


class Main extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleNavRequestClose = this.handleNavRequestClose.bind(this);
		this.handleNavTouchTap = this.handleNavTouchTap.bind(this);
		this.handleLoginRequestClose = this.handleLoginRequestClose.bind(this);
		this.handleRegisterRequestClose = this.handleRegisterRequestClose.bind(this);
		this.handleLoginTouchTap = this.handleLoginTouchTap.bind(this);
		this.handleRegisterTouchTap = this.handleRegisterTouchTap.bind(this);
		this.handleCreateHouseHoldRequest = this.handleCreateHouseHoldRequest.bind(this);
		this.handleCreateHouseHoldClose = this.handleCreateHouseHoldClose.bind(this);
		this.handleCreateSensorRequest = this.handleCreateSensorRequest.bind(this);
		this.handleCreateSensorClose = this.handleCreateSensorClose.bind(this);
		this.handleViewHouseHold = this.handleViewHouseHold.bind(this);
		this.handleViewWall = this.handleViewWall.bind(this);
		this.handleViewNotifications = this.handleViewNotifications.bind(this);
		this.handleHome = this.handleHome.bind(this);
		this.handleSignOut = this.handleSignOut.bind(this);

		this.state = {
		  navbarOpen: false,
		  loginOpen: false,
		  createHouseHoldOpen: false,
		  createSensorOpen: false,
		  active: "Home",
		  loggedIn: true,

		};
	}

	/**
	 * NavBar
	 */

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

	/**
	 * Login
	 */

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

	/**
	 * Register
	 */

	handleRegisterTouchTap (event) {
		this.setState({
		  registerOpen: true,
		  anchorEl: event.currentTarget,
		});
	}

	handleRegisterRequestClose() {
		this.setState({
		  registerOpen: false,
		});
	}

	/**
	 * Create HouseHold
	 */

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

	/**
	 * Create Sensor
	 */

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
			active: "HouseHoldList",
		});
	}

	handleViewWall() {
		this.setState({
			navbarOpen: false,	
			active: "Wall",
		});
	}

	handleViewNotifications() {
		this.setState({
			navbarOpen: false,	
			active: "Notifications",
		});
	}

	handleHome() {
		this.setState({
			navbarOpen: false,
			active: "default",
		});
	}

	handleSignOut() {
		this.setState({
			navbarOpen: false,
			active: "Home",
			loggedIn: false,
		});
	}

	render() {

		/**
		 * Create HouseHold Actions
		 */

		const houseHoldActions = [
			<FlatButton style={styles.cancelButton}
				label="Cancel"
				secondary={true}
				onTouchTap={this.handleCreateHouseHoldClose}/>,

			<FlatButton style={styles.submitButton}
				label="Create"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleCreateHouseHoldClose}/>,
		];

		/**
		 * Create Sensor Actions
		 */

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

		/**
		 * The actual components
		 */

		{/* AppBar */}
		let userMenu;
		if (this.state.loggedIn) {
			userMenu = <LeftNav open={this.state.navbarOpen} style={styles.leftnav} docked={false}  onRequestChange={this.handleNavRequestClose} >
						<AppBar title="Menu" onLeftIconButtonTouchTap={this.handleNavRequestClose}/>
						<hr style={styles.horizontalLine} color="white"/>
						<MenuItem onTouchTap={this.handleHome}><b>Home</b></MenuItem>
						<hr style={styles.horizontalLine} color="white"/>
						<MenuItem onTouchTap={this.handleViewHouseHold}>View Households</MenuItem>
						<hr style={styles.horizontalLine} color="white"/>
						<MenuItem onTouchTap={this.handleCreateHouseHoldRequest}>Create Household</MenuItem>
						<MenuItem onTouchTap={this.handleCreateSensorRequest}>Create Sensor</MenuItem>
						<hr style={styles.horizontalLine} color="white"/>
						<MenuItem onTouchTap={this.handleViewWall}>Wall</MenuItem>
						<MenuItem onTouchTap={this.handleViewNotifications}>Notifications</MenuItem>
						<hr style={styles.horizontalLine} color="white"/>
						<MenuItem>Account Options</MenuItem>
						<hr style={styles.horizontalLine} color="white"/>
						<Divider />
						<MenuItem onTouchTap={this.handleSignOut}>Sign Out</MenuItem>
						
					</LeftNav>;
		}
		else {
			userMenu = <LeftNav open={this.state.navbarOpen} style={styles.leftnav} docked={false}  onRequestChange={this.handleNavRequestClose} >
						<AppBar title="Menu" onLeftIconButtonTouchTap={this.handleNavRequestClose}/>
						</LeftNav>;
		}

		let logInBar
		if (!this.state.loggedIn) {
			logInBar = <AppBar
				title="SmartHome"
				iconElementRight={
					<div>
						<FlatButton style={styles.registerButton}
						backgroundColor={"#FFFFFF"}
						hoverColor={"#DDDDDD"}
						rippleColor={"#BBBBBB"}
						label="Register"
						onTouchTap={this.handleRegisterTouchTap}/>
						<FlatButton style={styles.loginButton}
						backgroundColor={green600}
						hoverColor={green700}
						rippleColor={"#BBBBBB"}
						label="Log in"
						onTouchTap={this.handleLoginTouchTap}/>
					</div>
				}

				onLeftIconButtonTouchTap={this.handleNavTouchTap}/>;
		}
		else if (this.state.loggedIn) {
			logInBar = <AppBar
			title="SmartHome"

			onLeftIconButtonTouchTap={this.handleNavTouchTap}/>;
		}

		return (
			<MuiThemeProvider muiTheme={muiTheme}>
			<div style={styles.container}>
				<div style={styles.header}>
					{/* AppBar */}
					
					{logInBar}
					
					{/* Login Popover */}
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

					<Popover
						open={this.state.registerOpen}
						anchorEl={this.state.anchorEl}
						anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
						targetOrigin={{horizontal: 'right', vertical: 'top'}}
						onRequestClose={this.handleRegisterRequestClose}>
						<div style={styles.popover}>
							<RegisterForm/>
						</div>
					</Popover>			

					{/* LeftNav */}

					{userMenu}

				</div>


				{/* Body */}
				<div style={styles.body}>

					{/**
					  * Body
					  * This should become a PageComponent so that it can be switched
					  * (so we dont need to refresh the page)
					  */}

					{(() => {
        				switch (this.state.active) {

          					case "Home": return "shit on the homepage";

          					case "HouseHoldList":   return <HouseHoldList userid={1} rest={rest}/>;
          					case "Wall":   return <Wall userid={1} rest={rest}/>;
          					case "Notifications":   return <Notifications userid={1} rest={rest}/>;

          					default:      return <HouseHoldCard

													title="Naam card (bv Huis van Bart: Vaatwasmachine)"
													subtitle="Subtitle card (bv: verbruik week 21/03/2016)"
													prev="vorige week"
													next="volgende week"

													data={data}/>;
        				}
      				})()}

					{/**
					  * Dialog boxes
					  */}

					{/* Create HouseHold */}

					<Dialog style={styles.dialog}
						title="Create Household"
						open={this.state.createHouseHoldOpen}
						onRequestClose={this.handleCreateHouseHoldClose}
						actions={houseHoldActions}>


						<form className="createHouseHold" style={styles.form}>
							<TextField hintText="" floatingLabelText="Household name"/>
							<br/>
							<TextField hintText="" floatingLabelText="City"/>
							<br/>
							<TextField hintText="" floatingLabelText="Street"/>
							<br/>
							<TextField hintText="" floatingLabelText="House number"/>
						</form>
					</Dialog>

					{/* Create Sensor */}
					<Dialog style={styles.dialog}
						title="Create Sensor"
						open={this.state.createSensorOpen}
						onRequestClose={this.handleCreateSensorClose}
						actions={sensorActions}>

						<form className="createSensor" style={styles.form}>
							<TextField hintText="" floatingLabelText="Sensor name"/>
							<br/>
							<HouseHoldSelect/>
							<br/>
							<TextField floatingLabelText="Description"
								multiLine={true}
								rows={3}
								rowsMax={3}/>
							<br/>
							<PowerUnitSelect/>
							<br/>
							<TextField hintText="" floatingLabelText="Tags"/>
						</form>
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
