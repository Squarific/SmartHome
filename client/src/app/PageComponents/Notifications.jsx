import React from 'react';

const styles = {
	notifications: {
	},
}

const Notifications = React.createClass({
	getInitialState: function () {
		const value = '';
		return {value};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	render: function() {
		return (
			<div>NOTIFICATIONS</div>
		)
	},
});

module.exports = {
	Notifications: Notifications,
};