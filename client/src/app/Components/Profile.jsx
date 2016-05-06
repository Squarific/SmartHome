import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';
import {green700, green600, green500, green300, green100, grey500} from 'material-ui/lib/styles/colors';
import Dialog from 'material-ui/lib/dialog';

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
			profileOwner: this.props.result,
			deletePopUp: false,
			Me: this.props.me,
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
	/*handleAdd: function () {
		this.props.rest.get(["api", "users", this.state.profileOwner.id, "friend_requests", "received"], {
			status: 'Pending',
			read: false,
		}, function(data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
	}.bind(this));
		this.setState({
			deletePopUp: false,
		});
	},*/
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
		this.props.rest.get(["api", "users", "me", "friends"], {}, function(data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
			data.data.splice(data.data.indexOf(this.state.profileOwner), 1);
		}.bind(this));
		this.props.rest.get(["api", "users", this.state.profileOwner.id, "friends"], {}, function(data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
			data.data.splice(data.data.indexOf(this.state.Me), 1);
		}.bind(this));
	},
	render: function () {
		let profileActions;
		if (this.state.myFriends.length > 0 && this.state.myFriends.indexOf(this.state.profileOwner) > -1) {
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
					title={this.state.profileOwner.attributes.username}
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
