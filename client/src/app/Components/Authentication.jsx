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
	handleInputChange: function (event) {
		let newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	},
	handleRegister: function (event) {
		// Don't refresh the page
		event.preventDefault();

		this.props.rest.post(["rest-auth", "registration"], {
			username: this.state.Username,
			password1: this.state.Password1,
			password2: this.state.Password2,
			email: this.state.Email,
		}, function (data) {
			console.log(data);
			if (data.error) {
				this.setState({error: data.error});
			} else {
				this.setState({success: true});
			}
		}.bind(this));

		this.setState({error: "Registering..."});
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
					{this.state.error}
				</div>
			);
		}

		return (
			<form onSubmit={this.handleRegister} className="register">
				{error}
				<TextField id="username" onChange={this.handleInputChange} value={this.state.username} type="username" floatingLabelText={this.props.lang.username}/>
				<br/>
				<TextField id="pass1" onChange={this.handleInputChange} value={this.state.pass1} type="password" floatingLabelText={this.props.lang.password}/>
				<br/>
				<TextField id="pass2" onChange={this.handleInputChange} value={this.state.pass2} type="password" floatingLabelText={this.props.lang.confirmPassword}/>
				<br/>
				<TextField id="email" onChange={this.handleInputChange} value={this.state.email} type="email" floatingLabelText={this.props.lang.email}/>
				<br/>
				<FlatButton type="submit"
				            style={style.submitButton}
				            onTouchStart={this.handleRegister}
				            onclick={this.handleRegister}
				            label={this.props.lang.submit} />
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
		// Don't refresh the page
		event.preventDefault();
		
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
					{this.state.error}
				</div>
			);
		}

		return (
			<form onSubmit={this.handleLogin} className="login">
				{error}
				<TextField onChange={this.handleInputChange} hintText="" floatingLabelText={this.props.lang.username}/>
				<br/>
				<TextField onChange={this.handleInputChange} type="password" hintText="" floatingLabelText={this.props.lang.password}/>
				<br/>
				<FlatButton style={style.submitButton}
				            onTouchStart={this.handleLogin}
				            onclick={this.handleLogin}
				            label={this.props.lang.login} />
			</form>
		);
	},
});

module.exports = {
	RegisterForm: RegisterForm,
	LoginForm: LoginForm,
};