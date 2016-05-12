import React from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import FlatButton from 'material-ui/FlatButton';
import CardText from 'material-ui/Card/CardText';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {green500, grey500} from 'material-ui/styles/colors';
import {Notification} from '../Components/Notification';

const styles = {
	notifications: {
	},
}

const Notifications = React.createClass({
	getInitialState: function () {
		return {
			loading: true,
			friendRequests: [],
			myName: "Loading...",
		};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	componentDidMount: function () {
		if (!this.props.rest) throw "Notification Error: No rest client provided!";

		this.props.rest.get(["api", "users", "me", "friend_requests", "received"], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			this.setState({
				friendRequests: data.data,
				loading: false,
			});
		}.bind(this));

		this.props.rest.get(["api", "users", "me"], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			console.log(data);

			this.setState({
				myName: data.data.attributes.first_name + " " + data.data.attributes.last_name,
			});
		}.bind(this));
	},
	render: function() {
		let notifications;
		notifications = [];

		if (!this.state.loading) {
			for (let i = 0; i < this.state.friendRequests.length; i++) {
				if (!this.state.friendRequests[i].attributes.read)
					notifications.push(<Notification key={i} rest={this.props.rest} lang={this.props.lang} type="FRIEND REQUEST" request={this.state.friendRequests[i]}/>);
			}
		}

		if (notifications.length === 0) {
			notifications = <div>No notifications!</div>;
		}

		return (
			<Card>
			<CardHeader
				title={this.props.lang.notifications}
				subtitle={this.state.myName}/>
			<CardActions>
				<FlatButton label={this.props.lang.clearAll}
					primary={true}/>
			</CardActions>

			{/* Notifications here */}
			{notifications}

			<br/>
			</Card>
		)
	},
});

module.exports = {
	Notifications: Notifications,
};
