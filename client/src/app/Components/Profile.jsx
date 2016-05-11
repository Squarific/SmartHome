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
	},
	handleAdd: function () {
		this.props.rest.get(["api", "friend_requests"], {
			
		}, function(data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
		}.bind(this));
		/*this.props.rest.post(["api", "users", this.props.result.id, "friend_requests", "received"], {
			status: 'Pending',
			read: false,
			sender: this.props.me,
			receiver: this.props.result,
		}, function(data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
		}.bind(this));*/
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
	/*handleDelete: function () {
		
	},*/
	render: function () {
		let profileActions;
		if (this.state.myFriends.length > 0 && this.state.myFriends.indexOf(this.props.result) > -1) {
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
				return;
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
