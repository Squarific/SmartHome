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
	handleInputChange: function (inputname, event) {

	}.
	handleRegister: function (event) {
		this.props.rest.get(["rest-auth"], {
			username,
			password,
		}, function (data) {
			if (data.error) {
				this.setState({error: data.error});
			} else {
				this.setState({success: true});
			}
		});

		this.setState({error: "Uh this is akward, there actually is nothing implemented yet."});

		// Don't refresh the page
		event.preventDefault();
		return false;
	},
	render: function () {
		if (this.state.success) {
			return (<div>You are successfully logged in.</div>);
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
			<form onSubmit={this.handleRegister} className="register">
				{error}
				<TextField type="username" floatingLabelText="Username"/>
				<br/>
				<TextField type="password" floatingLabelText="Password"/>
				<br/>
				<TextField type="password" floatingLabelText="Confirm Password"/>
				<br/>
				<TextField type="email" floatingLabelText="Email"/>
				<br/>
				<FlatButton type="submit"
				            style={style.submitButton}
				            onTouchStart={this.handleRegister}
				            onclick={this.handleRegister}
				            label="Submit" />
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
		this.props.rest.get(["rest-auth"], {
			username,
			password,
		}, function (data) {
			if (data.error) {
				this.setState({error: data.error});
			} else {
				this.setState({success: true});
			}
		});

		// Don't refresh the page
		event.preventDefault();
		return false;
	},
	render: function () {
		if (this.state.success) {
			return (<div>You are successfully logged in.</div>);
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
			<form onSubmit={this.handleLogin} className="login">
				{error}
				<TextField hintText="" floatingLabelText="Username"/>
				<br/>
				<TextField type="password" hintText="" floatingLabelText="Password"/>
				<br/>
				<FlatButton style={style.submitButton}
				            onTouchStart={this.handleLogin}
				            onclick={this.handleLogin}
				            label="Submit" />
			</form>
		);
	},
});

module.exports = {
	RegisterForm: RegisterForm,
	LoginForm: LoginForm,
};