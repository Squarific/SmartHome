import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {green500, grey500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {HouseHoldSelect} from './HouseHoldSelect';
import {PowerUnitSelect} from './PowerUnitSelect';
import {TagSelect} from './TagSelect';
import Snackbar from 'material-ui/Snackbar';


const styles = {
	dialog: {
		textAlign: "center",
	},
	form: {
		textAlign: "center",
	},
	cancelButton: {
		color: grey500,
	},
	submitButton: {
		color: green500,
	},
};


const CreateSensor = React.createClass({
	getInitialState: function () {
		return {
			name: "",
			household: "",
			description: "",
			powerUnit: "",
		};
	},
	componentDidMount: function () {
		/*this.props.rest.get(["api", "users", "me], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
			this.setState({

			});
		}.bind(this));*/
	},
	handleName: function (event) {
		this.setState({
			name: event.target.value,
		});
	},
	handleDescription: function (event) {
		this.setState({
			description: event.target.value,
		});
	},
	handleHousehold: function (value) {
		this.setState({
			household: value,
		});
	},
	handlePowerUnit: function (value) {
		this.setState({
			powerUnit: value,
		});

	},
	handleTag: function (event, index, value) {
		this.setState({
			tags: value,
		});
	},
	handleSubmit: function () {
		this.props.rest.post(["api", "sensors"], {
			name: this.state.name,
			home: this.state.household,
			description: this.state.description,
			tags: 1,
			power_unit: this.state.powerUnit,
		}, function(data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
		}.bind(this));
	},
	render: function () {

		const sensorActions = [
			<FlatButton style={styles.cancelButton}
				label={this.props.lang.cancel}
				secondary={true}
				onTouchTap={this.props.handleCreateSensorClose}/>,

			<FlatButton style={styles.submitButton}
				label={this.props.lang.create}
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleSubmit}/>,
		];

		return (
			<Dialog style={styles.dialog}
				title={this.props.lang.createSensor}
				open={this.props.createSensorOpen}
				//onRequestClose={this.props.handleCreateSensorClose}
				actions={sensorActions}>

				<form className="createSensor" style={styles.form}>
					<TextField hintText="" floatingLabelText={this.props.lang.sensorName} onChange={this.handleName}/>
					<br/>
					<HouseHoldSelect lang={this.props.lang} handleHousehold={this.handleHousehold} rest={this.props.rest}/>
					<br/>
					<TextField floatingLabelText={this.props.lang.sensorDescription}
						multiLine={true}
						rows={3}
						rowsMax={3}
						onChange={this.handleDescription}
					/>
					<br/>
					<PowerUnitSelect lang={this.props.lang} handlePowerUnit={this.handlePowerUnit}/>
					<br/>
					<TagSelect rest={this.props.rest} lang={this.props.lang} handleTag={this.handleTag} />
					</form>
			</Dialog>
			
		);
	},

});

export default CreateSensor;
