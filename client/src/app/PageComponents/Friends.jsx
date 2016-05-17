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

		this.props.rest.get(["api", "users", "me", "friends", "stats"], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			this.setState({
				stats: data.data,
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
			<MenuItem key={1} value={1} primaryText={this.props.lang.today} />,
			<MenuItem key={2} value={2} primaryText={this.props.lang.lastMonth} />,
			<MenuItem key={3} value={3} primaryText={this.props.lang.lastYear} />,
		];
		let timePeriod;
		
		let FriendList= [];
		let friend = {};


		function makeFriendList (timePeriod, test) {
			if (timePeriod === 1) {
				for (let i = 0; i < test.state.friends.length; i++) {
					let user = test.state.friends[i].id;
					FriendList.push(friend = {
						ranking: i+1, 
						name: test.state.friends[i].attributes.first_name+" "+test.state.friends[i].attributes.last_name, 
						usage: test.state.stats[user].total_usage_today, 
						households: test.state.friends[i].relationships.owned_homes.meta.count,
					});
				}
			}
			else if (timePeriod === 2) {
				for (let i = 0; i < test.state.friends.length; i++) {
					let user = test.state.friends[i].id;
					FriendList.push(friend = {
						ranking: i+1, 
						name: test.state.friends[i].attributes.first_name+" "+test.state.friends[i].attributes.last_name, 
						usage: test.state.stats[user].total_usage_last_month, 
						households: test.state.friends[i].relationships.owned_homes.meta.count,
					});
				}
			}
			else {
				for (let i = 0; i < test.state.friends.length; i++) {
					let user = test.state.friends[i].id;
					FriendList.push(friend = {
						ranking: i+1, 
						name: test.state.friends[i].attributes.first_name+" "+test.state.friends[i].attributes.last_name, 
						usage: test.state.stats[user].total_usage_last_year, 
						households: test.state.friends[i].relationships.owned_homes.meta.count,
					});
				}
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
				title={this.props.lang.friends}
				subtitle={this.state.myName}/>

				<div>
					<SelectField
						value={this.state.value}
						onChange={this.handleChange}
						autoWidth={true}
						floatingLabelText={this.props.lang.period}>
						{period}
					</SelectField>
				<br />
					<Table
						height={this.state.height}>
						<TableHeader
							displaySelectAll={false}>
							<TableRow>
								<TableHeaderColumn tooltip={this.props.lang.rank}>{this.props.lang.ranking}</TableHeaderColumn>
								<TableHeaderColumn tooltip={this.props.lang.name}>{this.props.lang.name}</TableHeaderColumn>
								<TableHeaderColumn tooltip={this.props.lang.totalUsage}>{this.props.lang.usage}</TableHeaderColumn>
								<TableHeaderColumn tooltip={this.props.lang.householdsAmount}>{this.props.lang.households}</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody>
							{makeFriendList(this.state.value, this).map( (row, index) => (
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
