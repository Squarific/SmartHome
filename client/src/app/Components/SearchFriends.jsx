import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import {green700, green600, green500, green300, green100, grey500} from 'material-ui/lib/styles/colors';
import {Profile} from './Profile';

const Styles = {
	dialog: {
		textAlign: "center",
	},
};


const SearchFriends = React.createClass({
	getInitialState: function () {
		return {
			users: [],
			searcher: '',
			profileOpen: false,
			searchInput: '',
		}
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	handleProfile: function () {
		this.setState({
			profileOpen: true,
		});
	},
	handleProfileClose: function () {
		this.setState({
			profileOpen: false,
		});
	},
	selectedItem: function(chosenRequest, index) {
		this.setState({
			searchInput: chosenRequest,
			profileOpen: true,
		});
	},
	componentDidMount: function () {
		this.props.rest.get(["api", "users"], {}, function(data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
			
			this.setState({
				users: data.data,
			});
			
		}.bind(this));
		
		this.props.rest.get(["api", "users", "me"], {}, function(data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			this.setState({
				searcher: data.data,
			});
		}.bind(this));
	},
	
	render: function() {
		let USERS;
		USERS = [];
		for (let totalusers = 0; totalusers < this.state.users.length; totalusers++) {
			if(this.state.users[totalusers] !== this.state.searcher) {
				USERS.push(this.state.users[totalusers].attributes.username);
			}
		}
		
		let searchedFriend=[];
		for (let totalusers = 0; totalusers < this.state.users.length; totalusers++) {
			if(this.state.users[totalusers].attributes.username.startsWith(this.state.searchInput) && this.state.users[totalusers] !== this.state.searcher) {
				searchedFriend.push(this.state.users[totalusers]);
			}
		}
		
		let searched = [];
		for (let i = 0; i<searchedFriend.length; i++) {
			searched.push(<Profile key={i} rest={this.props.rest} result={searchedFriend[i]} me={this.state.searcher}/>);
		}
		if (searched.length === 0) {
			searched = "no Friends found :("
		}
		return (
			<div>
				<AutoComplete
		  			floatingLabelText="Search Friends"
		  			filter={AutoComplete.fuzzyFilter}
		  			dataSource={USERS}
					onNewRequest={this.selectedItem}
					searchText={this.state.searchInput}
					maxSearchResults={5}

				/>
				
				<Dialog
					title="Search Results"
					open={this.state.profileOpen}
					onRequestClose={this.handleProfileClose}
				>{searched}
				</Dialog>
			</div>
		)	
	},
});

module.exports = {
	SearchFriends: SearchFriends,
};
