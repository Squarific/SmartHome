import React from 'react';
import TextField from 'material-ui/lib/text-field';

/*
	######################################
	# Authentication Components          #
	######################################
*/

/*
	Register component
*/
const RegisterForm = React.createClass({
	render: function () {
		return (
			<form className="register">
				<label htmlFor="username">Username</label>
				<TextField hintText="Username" />
				<label htmlFor="password">Password</label>
				<TextField type="password" hintText="Password" />
			</form>
		);
	},
});


/*
	Login component

	Props: {
		restClient: new Rest()
	}
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
			<form className="login">
				{error}
				<label htmlFor="username">Username</label>
				<TextField hintText="Username" />
				<br/>
				<label htmlFor="password">Password</label>
				<TextField type="password" hintText="Password" />
			</form>
		);
	},
});

module.exports = {
	RegisterForm: RegisterForm,
	LoginForm: LoginForm,
};