/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {green700, green600, green500, green300, green100, grey500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import HouseHoldCard from './Components/HouseHoldCard';
import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Snackbar from 'material-ui/Snackbar';

// Own components
import {RegisterForm, LoginForm} from './Components/Authentication'
import {GraphCard} from './Components/Graphing';
import CreateHousehold from './Components/CreateHousehold';
import Divider from 'material-ui/Divider';
import {HouseHoldSelect} from './Components/HouseHoldSelect';
import {PowerUnitSelect} from './Components/PowerUnitSelect';
import {Rest} from './Components/Rest';
import Translations from './Components/Translations';
import {SearchFriends} from './Components/SearchFriends';
import CreateSensor from './Components/CreateSensor';

// Page components
import {HouseHoldList} from './PageComponents/HouseHoldList';
import {Home} from './PageComponents/Home';
import {Wall} from './PageComponents/Wall';
import {Notifications} from './PageComponents/Notifications';
import {AdminInterface} from './PageComponents/AdminInterface';
import {Friends} from './PageComponents/Friends';

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
		minWidth: "100%",
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
	search: {
		margin: "1em",
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
		this.handleViewFriends = this.handleViewFriends.bind(this);
		this.handleViewAdminInterface = this.handleViewAdminInterface.bind(this);
		this.handleHome = this.handleHome.bind(this);
		this.handleSignOut = this.handleSignOut.bind(this);
		this.changeLang = this.changeLang.bind(this);
		this.handleLanguageNotficationSnackbarRequestClose = this.handleLanguageNotficationSnackbarRequestClose.bind(this);
		this.handleLogin = this.handleLogin.bind(this);

		this.state = {
		  navbarOpen: false,
		  loginOpen: false,
		  createHouseHoldOpen: false,
		  createSensorOpen: false,
		  active: "Home",
		  loggedIn: false,
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
		console.log("close");
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

	handleViewFriends() {
		this.setState({
			navbarOpen: false,
			active: "Friends",
		});
	}

	handleViewAdminInterface() {
		this.setState({
			navbarOpen: false,	
			active: "AdminInterface",
		});
	}

	handleHome() {
		this.setState({
			navbarOpen: false,
			active: "Home",
		});
	}

	handleSignOut() {
		// Don't refresh the page
		event.preventDefault();
		
		rest.post(["api", "auth", "logout"], {}, function (data) {
			if (data.error) {
				// If there was an error but no response something went wrong
				if (!data.response || !data.response.errors) {
					console.log(data.error);
				} else {
				// If the server send us an error in the response, display that instead
					let errors = "";
					for (let k = 0; k < data.response.errors.length; k++)
						errors += " " + data.response.errors[k].detail;

					console.log(errors);
				}
			} else {
				console.log("Sucessfully logged out.");
				this.setState({
					navbarOpen: false,
					active: "Home",
					loggedIn: false,
				});
			}
		}.bind(this));

		return false;
	}

	handleLogin () {
		this.setState({
			loggedIn: true,
			active: "HouseHoldList",
			loginOpen: false,
			registerOpen: false,
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
						<SearchFriends style={styles.search} rest={rest}/>
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
						<MenuItem onTouchTap={this.handleViewFriends}>{Translations[this.state.lang].friends}</MenuItem>
						<hr style={styles.horizontalLine} color="white"/>
						<MenuItem onTouchTap={this.handleViewAdminInterface}>{Translations[this.state.lang].adminInterface}</MenuItem>
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
							<LoginForm rest={rest} lang={Translations[this.state.lang]}  onLogin={this.handleLogin}/>
						</div>
					</Popover>		

					<Popover
						open={this.state.registerOpen}
						anchorEl={this.state.anchorEl}
						anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
						targetOrigin={{horizontal: 'right', vertical: 'top'}}
						onRequestClose={this.handleRegisterRequestClose}>
						<div style={styles.popover}>
							<RegisterForm rest={rest} lang={Translations[this.state.lang]} onLogin={this.handleLogin}/>
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

          					case "Home": return <Home lang={Translations[this.state.lang]}/>;
          					case "HouseHoldList":   return <HouseHoldList userid={1} rest={rest} lang={Translations[this.state.lang]}/>;
          					case "Wall":   return <Wall userid={1} rest={rest} lang={Translations[this.state.lang]}/>;
          					case "Notifications":   return <Notifications userid={1} rest={rest} lang={Translations[this.state.lang]}/>;
          					case "Friends":   return <Friends userid={1} rest={rest} lang={Translations[this.state.lang]}/>;
          					case "AdminInterface":   return <AdminInterface rest={rest} lang={Translations[this.state.lang]}/>;
          					default:      return <div>Error: No valid view selected. current state.active: {this.state.active}</div>;

        				}
      				})()}

					{/**
					  * Dialog boxes
					  */}

					{/* Create HouseHold */}

					<CreateHousehold rest={rest}
						lang={Translations[this.state.lang]}
						createHouseHoldOpen={this.state.createHouseHoldOpen}
						handleCreateHouseHoldClose={this.handleCreateHouseHoldClose}/>

					{/* Create Sensor */}
					<CreateSensor rest={rest} lang={Translations[this.state.lang]} createSensorOpen={this.state.createSensorOpen} handleCreateSensorClose={this.handleCreateSensorClose} />
					

				</div>
				<div style={styles.footer}>
					<img id="en" className="flag" src="images/flags/en.png" onClick={this.changeLang}/>
					<img id="nl" className="flag" src="images/flags/nl.png" onClick={this.changeLang}/>
					{Translations[this.state.lang].footerMessage}
				</div>
				<Snackbar
			      open={this.state.languageNotificationOpen}
			      message={Translations[this.state.lang].languageChanged + this.state.lang.toUpperCase()}
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
