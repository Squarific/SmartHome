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
import {green500, grey500} from 'material-ui/styles/colors';
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
		return {
			wallPostOpen: false,
			posts: [],
			loading: true,
			postMessage: "",
		};
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

	handleTextFieldChange: function (e) {
		this.setState({
            postMessage: e.target.value,
        });
	},

	postMessage: function () {
		if (this.state.postMessage !== "") {
			this.props.rest.post(["api", "posts"], {
	            content: this.state.postMessage,
	            plot: "",
	            read: false,
	            user: this.state.myId,
			}, function (data) {
				if (data.error) {
					console.log(data.error);
					return;
				}
			}.bind(this));

			this.setState({
				wallPostOpen: false,
				postMessage: "",
			});
		}
	},

	componentDidMount: function () {
		if (!this.props.rest) throw "Wall Error: No rest client provided!";

		this.props.rest.get(["api", "users", "me", "friends", "posts"], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			this.setState({
				posts: data.data,
				loading: false,
			});
		}.bind(this));

		this.props.rest.get(["api", "users", "me"], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			this.setState({
				myName: data.data.attributes.first_name + " " + data.data.attributes.last_name,
				myId: data.data.id,
			});
		}.bind(this));
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
				onTouchTap={this.postMessage}/>,
		];

		let posts;
		posts = [];

		if (!this.state.loading) {
			for (let i = 0; i < this.state.posts.length; i++) {
				if (!this.state.posts[i].attributes.read)
					posts.push(<WallPost key={i} rest={this.props.rest} lang={this.props.lang} post={this.state.posts[i]}/>);
			}
		}

		if (posts.length === 0) {
			posts = <div>No posts!</div>;
		}

		return (
			<div style={styles.wall}>
				<Card>
				<CardHeader
					title={this.state.myName}
					subtitle={this.props.lang.friendsPosts}/>
				<CardActions>
					<FlatButton label={this.props.lang.postToWall}
						primary={true}
						onTouchTap={this.handleWallPostOpen}/>
				</CardActions>

				{/* Wall Posts here */}
				{posts}

				<br/>
				</Card>

				<Dialog style={styles.wall}
					title={this.props.lang.postToWall}
					open={this.state.wallPostOpen}
					onRequestClose={this.handleWallPostClose}
					actions={wallPostActions}>

					<form className="wallPost">
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
	Wall: Wall,
};
