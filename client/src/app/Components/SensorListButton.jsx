import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const styles = {
	sharegraphbutton: {
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

		// this.props.rest.get(["api", "users", "me"], {}, function (data) {
		// 	if (data.error) {
		// 		console.log(data.error);
		// 		return;
		// 	}

		// 	this.setState({
		// 		myId: data.data.id,
		// 		loading: false,
		// 	});
		// }.bind(this));
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	handleShareGraphClose: function () {
		this.setState({
			shareGraphOpen: false,
		});
	},
	handleShareGraphOpen: function () {
		this.setState({
			shareGraphOpen: true,
		});
	},
	handleTextFieldChange: function (e) {
		this.setState({
            postMessage: e.target.value,
        });
	},

	postMessage: function () {
		if ((this.state.postMessage !== "") && (!this.state.loading)) {
			this.props.rest.post(["api", "posts"], {
	            content: this.state.postMessage,
	            plot: JSON.stringify(this.props.data),
	            read: false,
	            user: this.state.myId,
			}, function (data) {
				if (data.error) {
					console.log(data.error);
					return;
				}
			}.bind(this));

			this.setState({
				shareGraphOpen: false,
				postMessage: "",
			});
		}
	},

	render: function() {
		const shareGraphActions = [
			<FlatButton style={styles.cancelButton}
				label={this.props.lang.cancel}
				secondary={true}
				onTouchTap={this.handleShareGraphClose}/>,

			<FlatButton style={styles.postButton}
				label={this.props.lang.post}
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.postMessage}/>,
		];

		return (
			<div style={styles.sharegraphbutton}>
				<FlatButton label={this.props.lang.shareGraph}
					onTouchTap={this.handleShareGraphOpen}
					primary={true}/>

				<Dialog style={styles.sharegraphbutton}
					title={this.props.lang.shareGraph}
					open={this.state.shareGraphOpen}
					onRequestClose={this.handleShareGraphClose}
					actions={shareGraphActions}>

					<form className="shareGraph">
						<TextField hintText="" floatingLabelText={this.props.lang.message}
							multiLine={true}
							rows={5}
							rowsMax={5}
							value={this.state.postMessage}
							onChange={this.handleTextFieldChange}/>
					</form>
				</Dialog>
			</div>
		)
	},
});

module.exports = {
	SensorListButton: SensorListButton,
};