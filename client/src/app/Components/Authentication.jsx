import React from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

/*
	######################################
	# Authentication Components          #
	######################################
*/

/*
	Register component
*/

const style = {
	submitButton: {
		display: "block",
		width: "100%",
	},
	label: {
		display: "block",
	},
}

const RegisterForm = React.createClass({
	handleRegister: function () {
		console.log("Register");
	},
	render: function () {
		return (
			<form submit={this.handleRegister} className="register">
				<label style={style.label} for="username">Username</label>
				<TextField hintText="username" />
				<br/>
				<label style={style.label} for="password">Password</label>
				<TextField type="password" hintText="password" />
				<br/>
				<label style={style.label} for="password">Password again</label>
				<TextField type="password" hintText="password again" />
				<br/>
				<FlatButton style={style.submitButton} onTouchStart={this.handleRegister} label="Submit" />
			</form>
		);
	},
});

/*
	Login component
*/

const LoginForm = React.createClass({
	handleLogin: function () {
		this.props.restClient.request("GET", ["rest-auth"], {
			username,
			password,
		}, function (data) {
			if (data.error) {
				this.setState({error: data.error});
			} else {
				this.setState({success: true});
			}
		});
	},
	render: function () {
		if (this.state.success) {
			return (<div>We are logged in but I am to lazy to already implement something here!</div>);
		}

		let error;
		if (this.state.error) {
			error = (
				<div>
					Error: 
					{this.state.error}
					<br/>
				</div>
			);
		}

		return (
			<form submit={this.handleLogin} className="login">
				{error}
				<label style={style.label} htmlFor="username">Username: </label>
				<TextField hintText="Username" />
				<br/>
				<label style={style.label} htmlFor="password">Password: </label>
				<TextField type="password" hintText="Password" />
				<br/>
				<FlatButton style={style.submitButton} onclick={this.handleLogin} label="Submit" />
			</form>
		);
	},
});

module.exports = {
	RegisterForm: RegisterForm,
	LoginForm: LoginForm,
};