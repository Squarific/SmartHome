import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import {green500, grey500} from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';

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
		return {};
	},
	handleInputChange: function (event) {
		let newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	},
	componentDidMount: function () {
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
		this.props.rest.put(["api", "homes"], {
			name: this.state.name,
			country: this.state.country,
			city: this.state.city,
			zipcode: this.state.zipcode,
			street: this.state.street,
			housenumber: this.state.housenumber,
		}, function (data) {
			if (data.error) {
				this.setState({error: data.error});
			} else {
				this.props.handleCreateHouseHoldClose();
			}
		});
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
					<TextField id="name" hintText="" floatingLabelText={this.props.lang.householdName}/>
					<br/>
					<TextField hintText="country" floatingLabelText={this.props.lang.country}/>
					<br/>
					<TextField hintText="city" floatingLabelText={this.props.lang.city}/>
					<br/>
					<TextField hintText="zipcode" floatingLabelText={this.props.lang.zipCode}/>
					<br/>
					<TextField hintText="street" floatingLabelText={this.props.lang.street}/>
					<br/>
					<TextField hintText="housenumber" floatingLabelText={this.props.lang.houseNumber}/>
				</form>
			</Dialog>
		);
	},
});

export default CreateHousehold;