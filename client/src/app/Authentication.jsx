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

var RegisterForm = React.createClass({
	render: function () {
		return (
			<form className="register">
				<label for="username">Username</label>
				<TextField hintText="Username">
				<label for="password">Password</label>
				<TextField hintText="Password">
			</form>
		);
	}
});


/*
	Login component
*/

var LoginForm = React.createClass({
	render: function () {
		return (
			<form className="register">
				<label for="username">Username</label>
				<TextField hintText="Username">
				<label for="password">Password</label>
				<TextField hintText="Password">
			</form>
		);
	}
});

module.exports = {
	RegisterForm: RegisterForm,
	LoginForm: LoginForm
};