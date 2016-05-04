import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import {green500, grey500} from 'material-ui/lib/styles/colors';
import {FriendTable} from '../Components/FriendTable';

const styles = {
	friends: {
		color: green500,
		padding: 32,
	},
}

const Friends = React.createClass({
	getInitialState: function () {
		const value = '';
		return {value};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	componentDidMount: function () {
		if (!this.props.rest) throw "Notification Error: No rest client provided!";

		this.props.rest.get(["api", "users", "me", "friends"], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			this.setState({
				friends: data.data,
				loading: false,
			});
		}.bind(this));

		this.props.rest.get(["api", "users", "me"], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			this.setState({
				myName: data.data.attributes.first_name + " " + data.data.attributes.last_name,
			});
		}.bind(this));
	},
	render: function() {
		return (
			<Card>
			<CardHeader
				title="Friends"
				subtitle={this.state.myName}/>

			{FriendTable}

			<br/>
			</Card>
		)
	},
});

module.exports = {
	Friends: Friends,
};
