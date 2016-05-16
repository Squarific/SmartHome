import React from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import FlatButton from 'material-ui/FlatButton';
import {green700, green600, green500, green300, green100, grey500} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';

const Styles = {
	addButton: {
		color: green500,
	},
	deleteButton: {
		color: 'red',
	},
	Button: {
		color: grey500,
	},
	profile: {
		margin: "16px auto 0px auto",
		whiteSpace: "pre",
		maxWidth: "64em",
	},
};


const Profile = React.createClass({
	getInitialState: function () {
		return {
			myFriends: [],
			deletePopUp: false,
			sent: [],
			visible: true,
			friends: false,
		};
	},
	componentDidMount: function () {
		this.props.rest.get(["api", "users", "me", "friends"], {}, function(data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			this.setState({
				myFriends: data.data,
			});
		}.bind(this));
		this.props.rest.get(["api", "friend_requests"], {}, function(data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
			for (let i = 0; i < data.data.length; i++) {
				if(((data.data[i].relationships.sender.data.id === this.props.me.id && data.data[i].relationships.receiver.data.id === this.props.result.id) || (data.data[i].relationships.sender.data.id === this.props.result.id && data.data[i].relationships.receiver.data.id === this.props.me.id)) && data.data[i].attributes.status === 1) {
					this.setState({
						visible: false,
						friends: true,
					});
				}
				else if(((data.data[i].relationships.sender.data.id === this.props.me.id && data.data[i].relationships.receiver.data.id === this.props.result.id) || (data.data[i].relationships.sender.data.id === this.props.result.id && data.data[i].relationships.receiver.data.id === this.props.me.id)) && data.data[i].attributes.status === 0) {
					this.setState({
						visible: false,

					});

				}
			}
		}.bind(this));
	},
	handleAdd: function () {
		this.props.rest.post(["api", "friend_requests"], {
			status: 0,
			read: false,
			sender: this.props.me.id,
			receiver: this.props.result.id,
		}, function(data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
		}.bind(this));
		this.setState({
			visible: false,
		});

	},
	handleDeletePopUp: function () {
		this.setState({
			deletePopUp: true,
		});
	},
	handleClose: function () {
		this.setState({
			deletePopUp: false,
		});
	},
	handleDelete: function () {
		this.props.rest
	},
	render: function () {
		let profileActions;
		if (this.state.myFriends.length > 0 && this.state.myFriends.id === this.props.result.id) {
				profileActions = [<FlatButton 
								style={Styles.Button}
								label={'Friends'}
								primary={true} />,
						
							<FlatButton 
								style={Styles.deleteButton}
								label={'Delete Friend'}
								secondary={true} 
								onTouchTap={this.handleDeletePopUp} />,
							];

			}

		else if (!this.state.visible && !this.state.friends) {
			profileActions = <FlatButton 
					style={Styles.Button}
					label={'Request Send'}
					primary={true} />;
		}
		else if (!this.state.visible && this.state.friends) {
			profileActions = <FlatButton 
					style={Styles.Button}
					label={'Friends'}
					primary={true} />;
		}
		else {
			
			profileActions = <FlatButton style={Styles.addButton}
					label={'Add Friend'}
					secondary={true}
					onTouchTap={this.handleAdd}/>;
		}
		let response = [<FlatButton style={Styles.addButton}
									label={'No'}
									primary={true}
									onTouchTap={this.handleClose}/>, 

						<FlatButton style={Styles.deleteButton}
									label={'yes'}
									secondary={true}
									 />,
						];
		return (
			<div>
				<Card style={Styles.profile}>
				<CardHeader
					title={this.props.result.attributes.username}
				/>
				<CardActions>
					{profileActions}
				</CardActions>
				</Card>

				<Dialog
					title="You are about to delete a friend. Are you sure?"
					open={this.state.deletePopUp}
					onRequestClose={this.handleClose}
					actions={response} />
			</div>
		)
	},
});

module.exports = {
	Profile: Profile,
};
