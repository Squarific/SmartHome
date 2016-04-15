import React from 'react';

const styles = {
	wall: {
	},
}

const Wall = React.createClass({
	getInitialState: function () {
		const value = '';
		return {value};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	render: function() {
		return (
			<div>WALL</div>
		)
	},
});

module.exports = {
	Wall: Wall,
};