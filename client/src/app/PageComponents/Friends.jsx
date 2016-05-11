import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import {green500, grey500} from 'material-ui/lib/styles/colors';

const styles = {
	friends: {
		color: green500,
		padding: 32,
	},
	propContainer: {
		width: 200,
		overflow: 'hidden',
		margin: '20px auto 0',
	},
	propToggleHeader: {
		margin: '20px auto 10px',
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
			for (let i = 0; i < 5; i++) {
				/*if (!this.state.friends[i].attributes.read)*/
					FriendList.push(friend = {ranking: i+1, name: 'John Smith', usage: 'Employed'});
			}
		}

		const tableData = FriendList;/*[
		  {
		  	ranking: '1',
		    name: 'John Smith',
		    usage: 'Employed',
		  },
		  {
		  	ranking: '2',
		    name: 'Randal White',
		    usage: 'Unemployed',
		  },
		  {
		  	ranking: '3',
		    name: 'Stephanie Sanders',
		    usage: 'Employed',
		  },
		  {
		  	ranking: '4',
		    name: 'Steve Brown',
		    usage: 'Employed',
		  },
		  {
		  	ranking: '5',
		    name: 'Joyce Whitten',
		    usage: 'Employed',
		  },
		  {
		  	ranking: '6',
		    name: 'Samuel Roberts',
		    usage: 'Employed',
		  },
		  {
		  	ranking: '7',
		    name: 'Adam Moore',
		    usage: 'Employed',
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
			        <TableHeader>
			          <TableRow>
			            <TableHeaderColumn tooltip="The Rank">Ranking</TableHeaderColumn>
			            <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
			            <TableHeaderColumn tooltip="The Usage">Usage</TableHeaderColumn>
			          </TableRow>
			        </TableHeader>
			        <TableBody>
			          {tableData.map( (row, index) => (
			            <TableRow key={index} selected={row.selected}>
			              <TableRowColumn>{row.ranking}</TableRowColumn>
			              <TableRowColumn>{row.name}</TableRowColumn>
			              <TableRowColumn>{row.usage}</TableRowColumn>
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
