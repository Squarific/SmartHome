import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import {green500, grey500} from 'material-ui/lib/styles/colors';
import {WallPost} from '../Components/WallPost';

const styles = {
	wall: {
		textAlign: "center",
	},
	cancelButton: {
		color: grey500,
	},
	submitButton: {
		color: green500,
	},
}

const Wall = React.createClass({
	getInitialState: function () {
		return {wallPostOpen: false};
	},

	handleChange: function (event, index, value) {
		this.setState({value});
	},

	handleWallPostClose: function () {
		this.setState({
			wallPostOpen: false,
		});
	},

	handleWallPostOpen: function () {
		this.setState({
			wallPostOpen: true,
		});
	},

	render: function() {
		const wallPostActions = [
			<FlatButton style={styles.cancelButton}
				label={this.props.lang.cancel}
				secondary={true}
				onTouchTap={this.handleWallPostClose}/>,

			<FlatButton style={styles.postButton}
				label={this.props.lang.post}
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleWallPostClose}/>,
		];

		return (
			<div style={styles.wall}>
				<Card>
				<CardHeader
					title="Filip Smets"
					subtitle="Ranst"/>
				<CardActions>
					<FlatButton label={this.props.lang.postToWall}
						primary={true}
						onTouchTap={this.handleWallPostOpen}/>
				</CardActions>

				{/* Wall Posts here */}
				<WallPost postid={1} rest={this.props.rest} lang={this.props.lang}/>
				<WallPost postid={2} rest={this.props.rest} lang={this.props.lang}/>
				<br/>
				</Card>

				<Dialog style={styles.wall}
					title={this.props.lang.postToWall}
					open={this.state.wallPostOpen}
					onRequestClose={this.handleWallPostClose}
					actions={wallPostActions}>

					<form className="wallPost" style={styles.form}>
						<TextField hintText="" floatingLabelText={this.props.lang.message}
								multiLine={true}
								rows={5}
								rowsMax={5}/>
					</form>
				</Dialog>
			</div>
		)
	},
});

module.exports = {
	Wall: Wall,
};