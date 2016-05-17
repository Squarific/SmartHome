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
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
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
	download: {
		fontWegiht: 400,
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
			dataPeriod: "",
			stateMessage: "",
			dataLoading: false,
			data: "",
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
	handleDataPeriod: function (event, index, value) {
		this.setState({
			dataPeriod: value,
		});
	},
	requestData: function() {
		if (!this.state.dataLoading) {
			this.setState({
				stateMessage: this.props.lang.adminDataRequest,
				dataLoading: true,
			});

			// Create string for parameters
			let parameters;
			parameters = {};

			if (this.state.dataCountry !== "") {
				parameters.country = this.state.dataCountry;
			}

			if (this.state.dataCity !== "") {
				parameters.city = this.state.dataCity;
			}

			if (this.state.dataStreet !== "") {
				parameters.street = this.state.dataStreet;
			}

			if (this.state.dataHouseNumber !== "") {
				parameters.housenumber = this.state.dataHouseNumber;
			}

			if (this.state.dataPeriod !== "" && this.state.dataPeriod !== "no filter") {
				parameters.period = [this.state.dataPeriod];
			}

			this.props.rest.get(["api", "stats"], parameters, function (data) {
				if (data.error) {
					console.log(data.error);

					this.setState({
						stateMessage: "ERROR: " + data.error,
					});

					return;
				}

				this.setState({
					data: data.data,
					stateMessage: this.props.lang.adminDataComplete,
					dataLoading: false,
				});
			}.bind(this));
		}
	},
	render: function() {
		if (!this.state.loading) {
			console.log(this.state.user);
		}

		let periodMenuItems, periods;
		periodMenuItems = [];
		periods = ["no filter", "today", "last_month", "least_year", "past_years"];

		for (let k = 0; k < periods.length; k++) {
			periodMenuItems.push((
				<MenuItem value={periods[k]} primaryText={periods[k].replace("_", " ")} key={k}/>
			));
		}

		let downloadButton;

		if (!this.state.dataLoading && this.state.stateMessage !== "") {
			downloadButton = <a href={"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.data))}
				download={"data.json"}
				style={styles.download}>
				Download
			</a>
		} else {
			downloadButton = <div></div>
		}

		let adminInterface;

		if (this.state.loading) {
			adminInterface = <div>Loading...</div>;
		} else if (!this.state.user.is_staff) {
			adminInterface = <div>You need to be an administrator to use this function!</div>;
		} else {
			adminInterface = <div>
				<form className="AdminGetLocationData" style={styles.form}>
					<SelectField onChange={this.handleDataPeriod} value={this.state.dataPeriod} floatingLabelText={this.props.lang.period}>
						{periodMenuItems}
					</SelectField>
					<br/>
					<br/>
					<TextField hintText="" floatingLabelText={this.props.lang.country}
						value={this.state.dataCountry}
						onChange={this.handleDataCountry}
						disable={false}/>
					<br/>
					<TextField hintText="" floatingLabelText={this.props.lang.city}
						value={this.state.dataCity}
						onChange={this.handleDataCity}
						disabled={this.state.dataCountry === ""}/>
					<br/>
					<TextField hintText="" floatingLabelText={this.props.lang.street}
						value={this.state.dataStreet}
						onChange={this.handleDataStreet}
						disabled={this.state.dataCity === ""}/>
					<br/>
					<TextField hintText="" floatingLabelText={this.props.lang.houseNumber}
						value={this.state.dataHouseNumber}
						onChange={this.handleDataHouseNumber}
						disabled={this.state.dataStreet === ""}/>
					<br/>
					<br/>
				</form>
				<FlatButton label={this.props.lang.getData} primary={true} onTouchTap={this.requestData}/>
				<br/>
				{this.state.stateMessage}
				<br/>
				{downloadButton}
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
