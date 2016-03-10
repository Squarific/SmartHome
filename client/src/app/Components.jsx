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
				<input type="text" name="username" placeholder="Username">
				<label for="password">Password</label>
				<input type="text" name="password" placeholder="Password">
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
			<form className="login">
				<label for="username">Username</label>
				<input type="text" name="username" placeholder="Username">
				<label for="password">Password</label>
				<input type="text" name="password" placeholder="Password">
			</form>
		);
	}
});



/*
	######################################
	# Graphing Components                #
	######################################
*/



/*
	######################################
	# Social Wall Components             #
	######################################
*/

/*
	Post component
	Used to show wall posts
*/

/*
	Wall component
	Shows posts in walls
*/

/*
	Post Form Component
	This can be used to make posts on walls
*/


ReactDOM.render(
	<h1>Hello, world!</h1>,
	document.getElementById('example')
);