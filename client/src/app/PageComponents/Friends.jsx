import React from 'react';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Table from 'material-ui/Table/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableHeader from 'material-ui/Table/TableHeader';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableBody from 'material-ui/Table/TableBody';
import {green500} from 'material-ui/styles/colors';

const styles = {
	friends: {
		color: green500,
		padding: 32,
	},
}


const Friends = React.createClass({



	getInitialState: function () {
		return {
			loading: true,
			friends: [],
			myName: "Loading...",
		};
	},
	handleChange: function (event, index, value) {
		this.setState({value});	},

	componentDidMount: function () {
		if (!this.props.rest) throw "Notification Error: No rest client provided!";

		this.props.rest.get(["api", "users", "me", "friends"], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			this.setState({
				friends: data.data,
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
			});
		}.bind(this));
	},



	render: function() {
		

		const period = [
			<MenuItem key={1} value={1} primaryText="Weekly" />,
			<MenuItem key={2} value={2} primaryText="Monthly" />,
			<MenuItem key={3} value={3} primaryText="Yearly" />,
		];
		let timePeriod;
		
		let FriendList= [];
		let friend = {};


		function makeFriendList (TimePeriod, test) {
			for (let i = 0; i < test.state.friends.length; i++) {
				FriendList.push(friend = {
					ranking: i+1, 
					name: test.state.friends[i].attributes.first_name+" "+test.state.friends[i].attributes.last_name, 
					usage: Math.floor(Math.random()*20), 
					households: test.state.friends[i].relationships.owned_homes.meta.count,
				});
			}
			FriendList.sort(function(a, b){
			    let keyA = new Date(a.usage/a.households),
					keyB = new Date(b.usage/b.households);
				if(keyA < keyB) return -1;
				if(keyA > keyB) return 1;
				return 0;
			});
			return FriendList;
		}
		
		return (
			<Card>
			<CardHeader
				title="Friends"
				subtitle={this.state.myName}/>

				<div>
					<SelectField
						value={this.state.value}
						onChange={this.handleChange}
						autoWidth={true}
						floatingLabelText="Time period"
						timePeriod = {this.state.value}>
						{period}
					</SelectField>
				<br />
					<Table
						height={this.state.height}>
						<TableHeader
							displaySelectAll={false}>
							<TableRow>
								<TableHeaderColumn tooltip="Rank">Ranking</TableHeaderColumn>
								<TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
								<TableHeaderColumn tooltip="Total Usage">Usage</TableHeaderColumn>
								<TableHeaderColumn tooltip="Amount of Households">Households</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody>
							{makeFriendList(timePeriod, this).map( (row, index) => (
								<TableRow key={index} selected={row.selected}>
									<TableRowColumn>{index+1}</TableRowColumn>
									<TableRowColumn>{row.name}</TableRowColumn>
									<TableRowColumn>{row.usage}</TableRowColumn>
									<TableRowColumn>{row.households}</TableRowColumn>
								</TableRow>
			 				))}
						</TableBody>
					</Table>
				</div>
			</Card>
		)
	},
});

module.exports = {
	Friends: Friends,
};
