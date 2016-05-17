import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const styles = {
	sensorlistbutton: {
		display: "inline-block",
		textAlign: "center",
	},
}

const SensorListButton = React.createClass({
	getInitialState: function () {
		return {
			sensorListOpen: false,
			loading: true,
			sensors: [],
			tags: [],
		}
	},
	componentDidMount: function () {
		if (!this.props.rest) throw "SensorListButton Error: No rest client provided!";

		this.props.rest.get(["api", "users", "me", "sensors"], {}, function (data) {
			this.setState({sensors: data.data});
		}.bind(this));

		this.props.rest.get(["api", "users", "me", "homes"], {}, function (data) {
			this.setState({households: data.data});
		}.bind(this));

		this.props.rest.get(["api", "tags"], {}, function (data) {
			this.setState({tags: data.data});
		}.bind(this));
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	handleSensorEditSave: function () {
		console.log("TODO: implement sensor save");
	},
	handleSensorEditClose: function () {
		this.setState({editing: false});
	},
	handleSensorListClose: function () {
		this.setState({
			sensorListOpen: false,
		});
	},
	handleSensorListOpen: function () {
		this.setState({
			sensorListOpen: true,
		});
	},
	onRowSelection: function (selectedRows) {
		this.setState({editing: selectedRows[0], values: {}});
	},
	getSensorTableRows: function () {
		let rows = [];
		for (let k = 0; k < this.state.sensors.length; k++) {
			let tags = this.state.sensors[k].relationships.tags.data;
			let ourTags = [];

			for (let k = 0; k < tags.length; k++) {
				for (let i = 0; i < this.state.tags.length; i++) {
					if (this.state.tags[i].id === tags[k].id) {
						ourTags.push(this.state.tags[i].attributes.name);
						break;
					}
				}
			}

			rows.push((
				<TableRow key={k}>
					<TableRowColumn>{this.state.sensors[k].attributes.name}</TableRowColumn>
					<TableRowColumn>{this.state.sensors[k].attributes.power_unit}</TableRowColumn>
					<TableRowColumn>{ourTags.join("\n")}</TableRowColumn>
				</TableRow>
			));
		}

		return rows;
	},
	getSensorTable: function () {
		return (
			<Table onRowSelection={this.onRowSelection}>
				<TableHeader>
					<TableRow>
						<TableHeaderColumn>{this.props.lang.sensorName}</TableHeaderColumn>
						<TableHeaderColumn>{this.props.lang.powerUnit}</TableHeaderColumn>
						<TableHeaderColumn>{this.props.lang.sensorTags}</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
					{this.getSensorTableRows()}
				</TableBody>
			</Table>
		);
	},
	render: function() {
		const sensorListActions = [
			<FlatButton
				label={this.props.lang.cancel}
				secondary={true}
				onTouchTap={this.handleSensorListClose}/>,
		];

		const sensorEditActions = [
			<FlatButton
				label={this.props.lang.cancel}
				secondary={true}
				onTouchTap={this.handleSensorEditClose}/>,
			<FlatButton
				label={this.props.lang.save}
				secondary={true}
				onTouchTap={this.handleSensorEditSave}/>,
		];

		console.log(this.state.sensors, this.state.tags);

		return (
			<div style={styles.sensorlistbutton}>
				<FlatButton label={this.props.lang.sensors}
					onTouchTap={this.handleSensorListOpen}
					primary={true}/>

				<Dialog
					title={this.props.lang.sensors}
					open={this.state.sensorListOpen}
					onRequestClose={this.handleSensorListClose}
					actions={sensorListActions}>
					{this.props.lang.clickToEdit}
					{this.getSensorTable()}
				</Dialog>

				<Dialog
					title={this.props.lang.editSensor}
					open={typeof this.state.editing === "number"}
					onRequestClose={this.handleSensorEditClose}
					actions={sensorEditActions}>
					<form>
						<TextField id="name" value={this.state.values.name} floatingLabelText={this.props.lang.sensorName} onChange={this.handleSensorEditFieldChange} />
						<TextField id="powerunit" value={this.state.values.powerunit} floatingLabelText={this.props.lang.powerUnit} onChange={this.handleSensorEditFieldChange} />
						<TextField id="tags" value={this.state.values.tags} floatingLabelText={this.props.lang.sensorTags} onChange={this.handleSensorEditFieldChange} />
					</form>
				</Dialog>
			</div>
		)
	},
});

module.exports = {
	SensorListButton: SensorListButton,
};