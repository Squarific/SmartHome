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
	getInitialState: function () {
		return {};
	},
	handleRegister: function () {
		console.log("Register");
	},
	render: function () {
		return (
			<form submit={this.handleRegister} className="register">
				<TextField hintText="" floatingLabelText="Username"/>
				<br/>
				<TextField type="password" hintText="" floatingLabelText="Password"/>
				<br/>
				<TextField type="password" hintText="" floatingLabelText="Confirm Password"/>
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
	getInitialState: function () {
		return {};
	},
	handleLogin: function () {
		this.props.restClient.get(["rest-auth"], {
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
			return (<div>We are logged in but I am too lazy to already implement something here!</div>);
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
				<TextField hintText="" floatingLabelText="Username"/>
				<br/>
				<TextField type="password" hintText="" floatingLabelText="Password"/>
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