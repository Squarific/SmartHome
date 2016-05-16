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

/*
	global stats zijn te vinden op /api/stats/ met
	'country', 'city', 'street', en 'housenumber'
	als get parameters voor de filters.
*/

const styles = {
	admininterface: {
		color: green500,
		padding: 32,
	},
	title: {
		fontWeight: 400,
	},
}

const AdminInterface = React.createClass({
	getInitialState: function () {
		return {
			loading: true,
			dataCountry: "",
			dataCity: "",
			dataStreet: "",
			dataHouseNumber: "",
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
	handleDataCountry: function (e) {
		this.setState({
			dataCountry: e.target.value,
		});
	},
	handleDataCity: function (e) {
		this.setState({
			dataCity: e.target.value,
		});
	},
	handleDataStreet: function (e) {
		this.setState({
			dataStreet: e.target.value,
		});
	},
	handleDataHouseNumber: function (e) {
		this.setState({
			dataHouseNumber: e.target.value,
		});
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
				<TextField hintText="" floatingLabelText={this.props.lang.country}
					value={this.state.dataCountry}
					onChange={this.handleDataCountry}/>
				<br/>
				<TextField hintText="" floatingLabelText={this.props.lang.city}
					value={this.state.dataCity}
					onChange={this.handleDataCity}/>
				<br/>
				<TextField hintText="" floatingLabelText={this.props.lang.street}
					value={this.state.dataStreet}
					onChange={this.handleDataStreet}/>
				<br/>
				<TextField hintText="" floatingLabelText={this.props.lang.houseNumber}
					value={this.state.dataHouseNumber}
					onChange={this.handleDataHouseNumber}/>
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
