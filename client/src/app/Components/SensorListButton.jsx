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
		}
	},
	componentDidMount: function () {
		if (!this.props.rest) throw "SensorListButton Error: No rest client provided!";

		this.props.rest.get(["api", "users", "me", "sensors"], {}, function (data) {
			this.setState({sensors: data.data});
		}.bind(this));

		this.props.rest.get(["api", "tags"], {}, function (data) {
			this.setState({tags: data.data});
		}.bind(this));
	},
	handleChange: function (event, index, value) {
		this.setState({value});
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
		this.setState({editing: selectedRows[0]});
	},
	getSensorTableRows: function () {
		let rows = [];

		rows.push((
			<TableRow>
				<TableRowColumn>Naam</TableRowColumn>
				<TableRowColumn>
					Een paar tags
				</TableRowColumn>
			</TableRow>
		));

		return rows;
	},
	getSensorTable: function () {
		return (
			<Table onRowSelection={this.onRowSelection}>
				<TableHeader>
					<TableRow>
						<TableHeaderColumn>Name</TableHeaderColumn>
						<TableHeaderColumn>Tags</TableHeaderColumn>
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
			<FlatButton style={styles.cancelButton}
				label={this.props.lang.cancel}
				secondary={true}
				onTouchTap={this.handleSensorListClose}/>,
		];

		return (
			<div style={styles.sensorlistbutton}>
				<FlatButton label={this.props.lang.sensors}
					onTouchTap={this.handleSensorListOpen}
					primary={true}/>

				<Dialog style={styles.sensorlistbutton}
					title={this.props.lang.sensors}
					open={this.state.sensorListOpen}
					onRequestClose={this.handleSensorListClose}
					actions={sensorListActions}>
					{this.props.lang.clickToEdit}
					{this.getSensorTable()}
				</Dialog>

				{/* TODO: SHOW A DIALOG IF this.state.editing IS NOT UNDEFINED*/}
			</div>
		)
	},
});

module.exports = {
	SensorListButton: SensorListButton,
};