import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import {green500, grey500} from 'material-ui/lib/styles/colors';
import {Notification} from '../Components/Notification';

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
			<Card>
			<CardHeader
				title={this.props.lang.notifications}
				subtitle="Filip Smets"/>
			<CardActions>
				<FlatButton label={this.props.lang.clearAll}
					primary={true}/>
			</CardActions>

			{/* Notifications here */}
			<Notification notificationid={1} rest={this.props.rest} lang={this.props.lang} type="FRIEND REQUEST"/>
			<Notification notificationid={2} rest={this.props.rest} lang={this.props.lang} type="ALERT"/>
			<br/>
			</Card>
		)
	},
});

module.exports = {
	Notifications: Notifications,
};