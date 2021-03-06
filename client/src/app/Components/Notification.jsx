import React from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import FlatButton from 'material-ui/FlatButton';
import CardText from 'material-ui/Card/CardText';
import {green500, grey500} from 'material-ui/styles/colors';

const styles = {
	notification: {
		margin: "16px 16px 0px 16px",
		verticalAlign: "middle",
		textAlign: "left",
		position: "relative",
	},
	inline: {
		display: "inline-block",
		verticalAlign: "middle",
		maxWidth: "25%",
		minwidth: "25%",
	},
	right: {
		verticalAlign: "middle",
		position: "absolute",
		right: "1em",
		top: "25%",
		color: grey500,
	},
	right2: {
		verticalAlign: "middle",
		position: "absolute",
		right: "7.5em",
		top: "25%",
		color: green500,
	},
}

const Notification = React.createClass({
	getInitialState: function () {
		return {
			sender: "Loading...",
			loading: true,
			visible: true,
		}
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	acceptNotification: function () {
		console.log(this.props.request)

		this.props.rest.put(["api", "friend_requests", this.props.request.id], {
			read: true,
			sender: this.props.request.relationships.sender.data.id,
			receiver: this.props.request.relationships.receiver.data.id,
			status: 1,
		}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
		}.bind(this));

		this.setState({
			visible: false,
		});
	},
	componentDidMount: function () {
		if (!this.props.rest) throw "Notification Error: No rest client provided!";

		this.props.rest.get(["api", "users", this.props.request.relationships.sender.data.id], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			this.setState({
				sender: data.data,
				loading: false,
			});
		}.bind(this));
	},
	render: function() {
		let actions;
		if (this.props.type === "FRIEND REQUEST") {
			actions = <FlatButton style={styles.right2}
				label={this.props.lang.accept}
				primary={true}
				onTouchTap={this.acceptNotification}/>;
		} else if (this.props.type === "ALERT") {
			actions = '';
		} else {
			actions = '';
		}

		let message;
		if (this.props.type === "FRIEND REQUEST") {
			if (this.state.loading) {
				message = "Loading...";
			} else {
				message = this.state.sender.attributes.first_name + this.props.lang.wantsToBeFriends;
			}
		} else if (this.props.type === "ALERT") {
			message = "David Danssaert heeft op je wall gepost.";
		} else {
			message = "ERROR: " + this.props.type + " is not a valid notification type.";
		}

		let typeTranslated;
		if (this.props.type === "FRIEND REQUEST") {
			typeTranslated = this.props.lang.friendRequest;
		} else if (this.props.type === "ALERT") {
			typeTranslated = this.props.lang.alert;
		} else {
			typeTranslated = "Error"
		}

		console.log(this.props);

		if (this.state.visible) {
			return (
				<Card style={styles.notification}>
				<CardHeader style={styles.inline}
					title={typeTranslated}
					subtitle={this.props.request.attributes.date_sent}/>
				<CardText  style={styles.inline}>
					{message}
				</CardText>
				{actions}
				<FlatButton style={styles.right}
					label={this.props.lang.clear}
					secondary={true}/>
				</Card>
			)
		} else {
			return (
				<div></div>
			);
		}
	},
});

module.exports = {
	Notification: Notification,
};