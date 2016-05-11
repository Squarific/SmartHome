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
	admininterface: {
		color: green500,
		padding: 32,
	},
	title: {
		fontWeight: 100,
	}
}

const AdminInterface = React.createClass({
	getInitialState: function () {
		return {
			loading: true,
		};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	componentDidMount: function () {
		if (!this.props.rest) throw "Wall Error: No rest client provided!";

		this.props.rest.get(["api", "users", "me"], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			this.setState({
				user: data.data.attributes,
				loading: false,
			});
		}.bind(this));
	},
	render: function() {
		if (!this.state.loading) {
			console.log(this.state.user);
		}

		let adminInterface;

		if (this.state.loading) {
			adminInterface = <div>Loading...</div>;
		} else if (!this.state.user.is_staff) {
			adminInterface = <div>You need to be an administrator to use this function!</div>
		} else {
			adminInterface = <form className="AdminGetData" style={styles.form}>
				<TextField hintText="" floatingLabelText={this.props.lang.country}/>
				<br/>
				<TextField hintText="" floatingLabelText={this.props.lang.city}/>
				<br/>
				<TextField hintText="" floatingLabelText={this.props.lang.street}/>
				<br/>
				<br/>
				<FlatButton label={this.props.lang.getData} primary={true}/>
			</form>
		}

		return (
			<div>
				<h2 style={styles.title}>Admin Interface</h2>
				{adminInterface}
			</div>
		)
	},
});

module.exports = {
	AdminInterface: AdminInterface,
};
