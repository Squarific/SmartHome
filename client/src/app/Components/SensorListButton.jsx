import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

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
				</Dialog>
			</div>
		)
	},
});

module.exports = {
	SensorListButton: SensorListButton,
};