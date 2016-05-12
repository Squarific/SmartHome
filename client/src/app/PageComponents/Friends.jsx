import React from 'react';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
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
		this.setState({value});
	},
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
		
		let FriendList= [];
		let friend = {};


		if (!this.state.loading) {
			for (let i = 0; i < this.state.friends.length; i++) {
				FriendList.push(friend = {ranking: i+1, name: this.state.friends[i].attributes.first_name+" "+this.state.friends[i].attributes.last_name, usage: "placeholder", households: this.state.friends[i].relationships.owned_homes.meta.count});
			}
		}

		const tableData = FriendList;/*[
			{
				ranking: '1',
				name: 'John Smith',
				usage: 'Employed',
				households: '3',
			},
			{
				ranking: '2',
				name: 'Randal White',
				usage: 'Unemployed',
				households: '4',
			},
			{
				ranking: '3',
				name: 'Stephanie Sanders',
				usage: 'Employed',
				households: '1',
			},
			{
				ranking: '4',
				name: 'Steve Brown',
				usage: 'Employed',
				households: '5',
			},
			{
				ranking: '5',
				name: 'Joyce Whitten',
				usage: 'Employed',
				households: '1',
			},
			{
				ranking: '6',
				name: 'Samuel Roberts',
				usage: 'Employed',
				households: '2',
			},
			{
				ranking: '7',
				name: 'Adam Moore',
				usage: 'Employed',
				households: '2',
			},
		];*/
		
		return (
			<Card>
			<CardHeader
				title="Friends"
				subtitle={this.state.myName}/>
				<div>
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
			          {tableData.map( (row, index) => (
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
			<br/>
			</Card>
		)
	},
});

module.exports = {
	Friends: Friends,
};
