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
			values: {},
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
		this.props.rest.put(["api", "users", "me", "sensors"], {
			name: this.state.values.name,
			power_unit: this.state.values.powerunit,
			tags: this.state.values.tags,
		}, function (data) {
			this.setState({editing: false});
		});
	},
	handleSensorEditClose: function () {
		this.setState({editing: false});
	},
	handleSensorEditFieldChange: function (event, value) {
		let values = this.state.values;

		values[event.target.id] = value;

		this.setState({values});
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
	getTagsFromTagIdList: function (tags) {
		let ourTags = [];

		for (let j = 0; j < tags.length; j++) {
			for (let i = 0; i < this.state.tags.length; i++) {
				if (this.state.tags[i].id === tags[j].id) {
					ourTags.push(this.state.tags[i].attributes.name);
					break;
				}
			}
		}

		return ourTags
	},
	onRowSelection: function (selectedRows) {
		this.setState({editing: selectedRows[0], values: {
			name: this.state.sensors[selectedRows[0]].attributes.name,
			powerunit: this.state.sensors[selectedRows[0]].attributes.power_unit,
			tags: this.getTagsFromTagIdList(this.state.sensors[selectedRows[0]].relationships.tags.data),
		}});
	},
	getSensorTableRows: function () {
		let rows = [];
		for (let k = 0; k < this.state.sensors.length; k++) {
			let tags = this.state.sensors[k].relationships.tags.data;
			let ourTags = this.getTagsFromTagIdList(tags);

			let home = "Household not found";
			for (let j = 0; j < this.state.households.length; j++) {
				if (this.state.households[j].id === this.state.sensors[k].relationships.home.data.id) {
					home = this.state.households[j].attributes.name;
				}
			}

			rows.push((
				<TableRow key={k}>
					<TableRowColumn>{this.state.sensors[k].attributes.name}</TableRowColumn>
					<TableRowColumn>{this.state.sensors[k].attributes.power_unit}</TableRowColumn>
					<TableRowColumn>{ourTags.join("\n")}</TableRowColumn>
					<TableRowColumn>{home}</TableRowColumn>
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
						<TableHeaderColumn>{this.props.lang.household}</TableHeaderColumn>
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
						<br/>
						<TextField id="powerunit" value={this.state.values.powerunit} floatingLabelText={this.props.lang.powerUnit} onChange={this.handleSensorEditFieldChange} />
						<br/>
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