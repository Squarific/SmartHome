import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {green500, grey500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

const styles = {
	form: {
		textAlign: "center",
	},
	dialog: {
		textAlign: "center",
		overflow: "auto",
	},
	cancelButton: {
		color: grey500,
	},
	submitButton: {
		color: green500,
	},
};

/*
	Props: {
		rest: new Rest(),
	}
*/
const CreateHousehold = React.createClass({
	getInitialState: function () {
		return {
			name: "",
			country: "",
			city: "",
			zipcode: "",
			street: "",
			housenumber: "",
			me: "",
			gebruikers: [],
		};
	},
	handleName: function (event) {
		this.setState({
			name: event.target.value,
		});
	},
	handleCountry: function (event) {
		this.setState({
			country: event.target.value,
		});
	},
	handleCity: function (event) {
		this.setState({
			city: event.target.value,
		});
	},
	handleZipCode: function (event) {
		this.setState({
			zipcode: event.target.value,
		});
	},
	handleStreet: function (event) {
		this.setState({
			street: event.target.value,
		});
	},
	handleHouseNumber: function (event) {
		this.setState({
			housenumber: event.target.value,
		});
	},
	
	componentDidMount: function () {
		this.props.rest.get(["api", "users", "me"], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
			this.setState({
				me: data.data,
			});
		}.bind(this));
		// this.props.rest.get(["api", "data", "home", this.props.id], {}, function (data) {
		// 	if (data.error) {
		// 		this.setState({error: data.error});
		// 		return;
		// 	}

		// 	if (data.data.length === 0) {
		// 		this.setState({
		// 			loading: false,
		// 			subtitle: "No sensor",
		// 		});
		// 		return;
		// 	}

		// 	const randomElement = data.data[Math.floor(data.data.length * Math.random())];
		// 	let labels = [];
		// 	let values = [];
		// 	console.log(randomElement);

		// 	for (let key = randomElement.values.length - 168;
		// 	     key < randomElement.values.length; key += 6) {
		// 		labels.push(randomElement.values[key].timestamp);
		// 		values.push(randomElement.values[key].usage);
		// 	}

		// 	this.setState({
		// 		loading: false,
		// 		subtitle: randomElement.key,
		// 		labels,
		// 		values,
		// 	});
		// }.bind(this));
	},
	handleSubmit: function () {
		this.props.rest.post(["api", "homes"], {
			name: this.state.name,
			country: this.state.country,
			city: this.state.city,
			zipcode: this.state.zipcode,
			street: this.state.street,
			house_number: this.state.housenumber,
			owner: this.state.me.id,
			users: [],
		}, function (data) {
			if (data.error) {
				// If there was an error but no response something went wrong
				if (!data.response || !data.response.errors) {
					this.setState({error: data.error});
				} else {
				// If the server send us an error in the response, display that instead
					let errors = "";
					for (let k = 0; k < data.response.errors.length; k++)
						errors += " " + data.response.errors[k].detail;

					this.setState({error: errors})
				}
			} else {
				this.props.handleCreateHouseHoldClose();
			}
			this.handleCreateHouseHoldClose();
		}.bind(this));
	},
	render: function () {

		const houseHoldActions = [
			<FlatButton style={styles.cancelButton}
				label={this.props.lang.cancel}
				secondary={true}
				onTouchTap={this.props.handleCreateHouseHoldClose}
				onClick={this.props.handleCreateHouseHoldClose}/>,

			<FlatButton style={styles.submitButton}
				label={this.props.lang.create}
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleSubmit}
				onClick={this.handleSubmit}/>,
		];

		return (<Dialog style={styles.dialog}
				title={this.props.lang.createHousehold}
				open={this.props.createHouseHoldOpen}
				onRequestClose={this.props.handleCreateHouseHoldClose}
				actions={houseHoldActions}>

				<form className="createHouseHold" style={styles.form}>
					{this.state.error || ""}
					<br/>
					<TextField id="name" floatingLabelText={this.props.lang.householdName} onChange={this.handleName}/>
					<br/>
					<TextField id="country" floatingLabelText={this.props.lang.country} onChange={this.handleCountry}/>
					<br/>
					<TextField id="city" floatingLabelText={this.props.lang.city} onChange={this.handleCity}/>
					<br/>
					<TextField id="zipcode" floatingLabelText={this.props.lang.zipCode} onChange={this.handleZipCode}/>
					<br/>
					<TextField id="street" floatingLabelText={this.props.lang.street} onChange={this.handleStreet}/>
					<br/>
					<TextField id="housenumber" floatingLabelText={this.props.lang.houseNumber} onChange={this.handleHouseNumber}/>
				</form>
			</Dialog>
		);
	},
});

export default CreateHousehold;
