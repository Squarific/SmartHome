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
			stateMessage: "",
			dataLoading: false,
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
	requestData: function() {
		if (!this.state.dataLoading) {
			this.setState({
				stateMessage: "The data you requested is being retrieved...",
				dataLoading: true,
			});

			// Create string for parameters
			let parameterString, glueSign;

			parameterString = "";
			glueSign = "?";

			if (this.state.dataCountry !== "") {
				parameterString += "country=%22" + this.state.dataCountry + "%22";
				glueSign = "&"
			}

			if (this.state.dataCity !== "") {
				parameterString += "city=%22" + this.state.dataCity + "%22";
				glueSign = "&"
			}

			if (this.state.dataStreet !== "") {
				parameterString += "street=%22" + this.state.dataStreet + "%22";
				glueSign = "&"
			}

			if (this.state.dataHouseNumber !== "") {
				parameterString += "housenumber=%22" + this.state.dataHouseNumber + "%22";
				glueSign = "&"
			}

			console.log("Parameters to be requested when server works: api/stats/" + parameterString);
		}
	},
	render: function() {
		if (!this.state.loading) {
			console.log(this.state.user);
		}

		let adminInterface;

		if (this.state.loading) {
			adminInterface = <div>Loading...</div>;
		} else if (!this.state.user.is_staff) {
			adminInterface = <div>You need to be an administrator to use this function!</div>;
		} else {
			adminInterface = <div>
				<form className="AdminGetData" style={styles.form}>
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
					<FlatButton label={this.props.lang.getData} primary={true} onTouchTap={this.requestData}/>
				</form>

				{this.state.stateMessage}
			</div>;
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
