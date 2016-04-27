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
import Snackbar from 'material-ui/lib/snackbar';

// Own components
import {RegisterForm, LoginForm} from './Components/Authentication'
import {GraphCard} from './Components/Graphing';
import Divider from 'material-ui/lib/divider';
import {HouseHoldSelect} from './Components/HouseHoldSelect';
import {PowerUnitSelect} from './Components/PowerUnitSelect';
import {Rest} from './Components/Rest';
import Translations from './Components/Translations';


// Page components
import {HouseHoldList} from './PageComponents/HouseHoldList';
import {Home} from './PageComponents/Home';
import {Wall} from './PageComponents/Wall';
import {Notifications} from './PageComponents/Notifications';

//-------------------------------------------------------------

const styles = {
	container: {
		textAlign: 'center',
		maxWidth: "100%",
		minWidth: "100%",
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
		maxWidth:"100%",
		minWidth: "100",
	},
	body2: {
		maxWidth: 1024,
		marginLeft: "auto",
		marginRight: "auto",
		minHeight: "40em",
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
	footer: {
		background:"rgb(60, 60, 60)",
		padding: "5em",
		color: "rgba(255, 255, 255, 0.87)",
		fontSize: "1.2em",
	},
};

const rest = new Rest("http://localhost:8000/", Translations.en);

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
		this.changeLang = this.changeLang.bind(this);
		this.handleLanguageNotficationSnackbarRequestClose = this.handleLanguageNotficationSnackbarRequestClose.bind(this);

		this.state = {
		  navbarOpen: false,
		  loginOpen: false,
		  createHouseHoldOpen: false,
		  createSensorOpen: false,
		  active: "Home",
		  loggedIn: true,
		  lang: "en",
		  languageNotificationOpen: false,
		};
	}

	handleLanguageNotficationSnackbarRequestClose () {
		this.setState({languageNotificationOpen: false});
	}

	changeLang (event) {
		this.setState({lang: event.target.id, languageNotificationOpen: true});
		rest.lang = Translations[event.target.id];
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
			active: "Home",
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
				label={Translations[this.state.lang].cancel}
				secondary={true}
				onTouchTap={this.handleCreateHouseHoldClose}/>,

			<FlatButton style={styles.submitButton}
				label={Translations[this.state.lang].create}
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleCreateHouseHoldClose}/>,
		];

		/**
		 * Create Sensor Actions
		 */

		const sensorActions = [
			<FlatButton style={styles.cancelButton}
				label={Translations[this.state.lang].cancel}
				secondary={true}
				onTouchTap={this.handleCreateSensorClose}/>,

			<FlatButton style={styles.submitButton}
				label={Translations[this.state.lang].create}
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
						<MenuItem onTouchTap={this.handleHome}><b>{Translations[this.state.lang].home}</b></MenuItem>
						<hr style={styles.horizontalLine} color="white"/>
						<MenuItem onTouchTap={this.handleViewHouseHold}>{Translations[this.state.lang].viewHouseholds}</MenuItem>
						<hr style={styles.horizontalLine} color="white"/>
						<MenuItem onTouchTap={this.handleCreateHouseHoldRequest}>{Translations[this.state.lang].createHousehold}</MenuItem>
						<MenuItem onTouchTap={this.handleCreateSensorRequest}>{Translations[this.state.lang].createSensor}</MenuItem>
						<hr style={styles.horizontalLine} color="white"/>
						<MenuItem onTouchTap={this.handleViewWall}>{Translations[this.state.lang].wall}</MenuItem>
						<MenuItem onTouchTap={this.handleViewNotifications}>{Translations[this.state.lang].notifications}</MenuItem>
						<hr style={styles.horizontalLine} color="white"/>
						<Divider />
						<MenuItem onTouchTap={this.handleSignOut}>{Translations[this.state.lang].signOut}</MenuItem>
						
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
							<LoginForm rest={rest} lang={Translations[this.state.lang]}/>
						</div>
					</Popover>		

					<Popover
						open={this.state.registerOpen}
						anchorEl={this.state.anchorEl}
						anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
						targetOrigin={{horizontal: 'right', vertical: 'top'}}
						onRequestClose={this.handleRegisterRequestClose}>
						<div style={styles.popover}>
							<RegisterForm rest={rest} lang={Translations[this.state.lang]}/>
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
          					case "Home": return <Home />;
          					case "HouseHoldList":   return <HouseHoldList userid={1} rest={rest} lang={Translations[this.state.lang]}/>;
          					case "Wall":   return <Wall userid={1} rest={rest}/>;
          					case "Notifications":   return <Notifications userid={1} rest={rest}/>;
          					default:      return <div>Error: No valid view selected. current state.active: {this.state.active}</div>;
        				}
      				})()}

					{/**
					  * Dialog boxes
					  */}

					{/* Create HouseHold */}

					<Dialog style={styles.dialog}
						title={Translations[this.state.lang].createHousehold}
						open={this.state.createHouseHoldOpen}
						onRequestClose={this.handleCreateHouseHoldClose}
						actions={houseHoldActions}>


						<form className="createHouseHold" style={styles.form}>
							<TextField hintText="" floatingLabelText={Translations[this.state.lang].householdName}/>
							<br/>
							<TextField hintText="" floatingLabelText={Translations[this.state.lang].city}/>
							<br/>
							<TextField hintText="" floatingLabelText={Translations[this.state.lang].street}/>
							<br/>
							<TextField hintText="" floatingLabelText={Translations[this.state.lang].houseNumber}/>
						</form>
					</Dialog>

					{/* Create Sensor */}
					<Dialog style={styles.dialog}
						title={Translations[this.state.lang].createSensor}
						open={this.state.createSensorOpen}
						onRequestClose={this.handleCreateSensorClose}
						actions={sensorActions}>

						<form className="createSensor" style={styles.form}>
							<TextField hintText="" floatingLabelText={Translations[this.state.lang].sensorName}/>
							<br/>
							<HouseHoldSelect lang={Translations[this.state.lang]}/>
							<br/>
							<TextField floatingLabelText={Translations[this.state.lang].sensorDescription}
								multiLine={true}
								rows={3}
								rowsMax={3}/>
							<br/>
							<PowerUnitSelect lang={Translations[this.state.lang]}/>
							<br/>
							<TextField hintText="" floatingLabelText={Translations[this.state.lang].sensorTags}/>
						</form>
					</Dialog>

				</div>
				<div style={styles.footer}>
					<img id="en" className="flag" src="images/flags/en.png" onClick={this.changeLang}/>
					<img id="nl" className="flag" src="images/flags/nl.png" onClick={this.changeLang}/>
					{Translations[this.state.lang].footerMessage}
				</div>
				<Snackbar
			      open={this.state.languageNotificationOpen}
			      message={"Language changed to " + this.state.lang.toUpperCase()}
			      autoHideDuration={3000}
			      onRequestClose={this.handleLanguageNotficationSnackbarRequestClose}
			    />
			</div>
			</MuiThemeProvider>
		);
	}
}

/*
  data={data}
*/
export default Main;
