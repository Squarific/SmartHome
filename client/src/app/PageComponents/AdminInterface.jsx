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
}

const AdminInterface = React.createClass({
	getInitialState: function () {
		const value = '';
		return {value};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	render: function() {
		return (
			<form className="AdminGetData" style={styles.form}>
				<TextField hintText="" floatingLabelText={this.props.lang.city}/>
				<br/>
				<TextField hintText="" floatingLabelText={this.props.lang.street}/>
				<br/>
				<br/>
				<FlatButton label={this.props.lang.getData} primary={true}/>
			</form>
		)
	},
});

module.exports = {
	AdminInterface: AdminInterface,
};