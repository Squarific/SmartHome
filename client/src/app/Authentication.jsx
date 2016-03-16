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
				<label for="username">Username</label>
				<TextField hintText="Username" />
				<label for="password">Password</label>
				<TextField type="password" hintText="Password" />
			</form>
		);
	},
});

/*
	Login component
*/

const LoginForm = React.createClass({
	render: function () {
		return (
			<form className="register">
				<label htmlFor="username">Username: </label>
				<TextField hintText="Username" />
				<br/>
				<label htmlFor="password">Password: </label>
				<TextField type="password" hintText="Password" />
			</form>
		);
	},
});

module.exports = {
	RegisterForm: RegisterForm,
	LoginForm: LoginForm,
};