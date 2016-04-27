import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import {green500, grey500} from 'material-ui/lib/styles/colors';

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
		const value = '';
		return {value};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	render: function() {
		let actions;
		if (this.props.type === "FRIEND REQUEST") {
			actions = <FlatButton style={styles.right2}
				label="ACCEPT"
				primary={true}/>;
		} else if (this.props.type === "ALERT") {
			actions = '';
		} else {
			actions = '';
		}

		let message;
		if (this.props.type === "FRIEND REQUEST") {
			message = "Nisse Strauven wilt je vriend worden.";
		} else if (this.props.type === "ALERT") {
			message = "David Danssaert heeft op je wall gepost.";
		} else {
			message = "ERROR: " + this.props.type + " is not a valid notification type.";
		}

		return (
			<Card style={styles.notification}>
			<CardHeader style={styles.inline}
				title={this.props.type}
				subtitle={"21/04/2016 - 14:37"}/>
			<CardText  style={styles.inline}>
				{message}
			</CardText>
			{actions}
			<FlatButton style={styles.right}
				label="CLEAR"
				secondary={true}/>
			</Card>
		)
	},
});

module.exports = {
	Notification: Notification,
};