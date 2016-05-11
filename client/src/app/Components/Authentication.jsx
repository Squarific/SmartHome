import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

/*
	######################################
	# Authentication Components          #
	######################################
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

/*
	Register component
	Props: {
		rest: new Rest(),
		onLogin: function () {}
	}
*/

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

		this.props.rest.post(["api", "auth", "registration"], {
			username: this.state.username,
			password1: this.state.pass1,
			password2: this.state.pass2,
			email: this.state.email,
		}, this.handleActivate);

		this.setState({error: "Registering..."});
		return false;
	},
	handleActivate: function (data) {
		if (data.error) {
			// If there was an error but no response something went wrong
			if (!data.response || !data.response.errors) {
				this.setState({error: data.error});
			} else {
			// If the server send us an error in the response, display that instead
				let errors = "";
				for (let k = 0; k < data.response.errors.length; k++)
					errors += " " + data.response.errors[k].detail;

				this.setState({error: errors})
			}
		} else {
			this.props.rest.post(["api", "auth", "login"], {
				username: this.state.username,
				password: this.state.pass1,
			}, this.handleLoggedIn);
			this.setState({error: "Registered. Logging in..."});
		}
	},
	handleLoggedIn: function (data) {
		if (typeof this.props.onLogin === "function")
			this.props.onLogin();
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
				            onClick={this.handleRegister}
				            label={this.props.lang.submit} />
			</form>
		);
	},
});

/*
	Login component
	Props: {
		rest: new Rest(),
		onLogin: function () {}
	}
*/

const LoginForm = React.createClass({
	getInitialState: function () {
		return {};
	},
	handleInputChange: function (event) {
		let newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	},
	handleLogin: function () {
		// Don't refresh the page
		event.preventDefault();
		
		this.props.rest.post(["api", "auth", "login"], {
			username: this.state.username,
			password: this.state.password,
		}, function (data) {
			if (data.error) {
				// If there was an error but no response something went wrong
				if (!data.response || !data.response.errors) {
					this.setState({error: data.error});
				} else {
				// If the server send us an error in the response, display that instead
					let errors = "";
					for (let k = 0; k < data.response.errors.length; k++)
						errors += " " + data.response.errors[k].detail;

					this.setState({error: errors})
				}
			} else {
				console.log(data);
				if (typeof this.props.onLogin === "function")
					this.props.onLogin();
			}
		}.bind(this));

		return false;
	},
	render: function () {
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
				<TextField id="username" onChange={this.handleInputChange} hintText="" floatingLabelText={this.props.lang.username}/>
				<br/>
				<TextField id="password" onChange={this.handleInputChange} type="password" hintText="" floatingLabelText={this.props.lang.password}/>
				<br/>
				<FlatButton style={style.submitButton}
				            onTouchStart={this.handleLogin}
				            onClick={this.handleLogin}
				            label={this.props.lang.login} />
			</form>
		);
	},
});

module.exports = {
	RegisterForm: RegisterForm,
	LoginForm: LoginForm,
};