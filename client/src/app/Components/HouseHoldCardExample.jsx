import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import CircularProgress from 'material-ui/lib/circular-progress';
import {GraphCard} from './Graphing';


let dataStyle = {
	fillColor: "rgba(220,220,220,0.5)",
	strokeColor: "rgba(220,220,220,0.8)",
	highlightFill: "rgba(220,220,220,0.75)",
	highlightStroke: "rgba(220,220,220,1)",
};

const data = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
			label: "My First dataset",
			fillColor: "rgba(220,220,220,0.5)",
			strokeColor: "rgba(220,220,220,0.8)",
			highlightFill: "rgba(220,220,220,0.75)",
			highlightStroke: "rgba(220,220,220,1)",
			data: [65, 59, 80, 81, 56, 55, 40],
		},
		{
			label: "My Second dataset",
			fillColor: "rgba(76,175,80,0.5)",
			strokeColor: "rgba(151,187,205,0.8)",
			highlightFill: "rgba(151,187,205,0.75)",
			highlightStroke: "rgba(151,187,205,1)",
			data: [28, 48, 40, 19, 86, 27, 90],
		},
	],
};

/*
	Props: {
		rest: new Rest(),
		houseid: INT
		title: "",
		subtitle: "",
		prev: "",
		next: "",
	}
*/
const HouseHoldCardExample = React.createClass({
	
	render: function () {
		

		return (<Card >
			<CardHeader
				title={this.props.lang.exampleGraph}
				/>
			<CardMedia>
				<GraphCard data={data}
						graphType="Bar"
						graphTypes={["Line", "Bar", "Radar"]}/>
			</CardMedia>
			</Card>
		);
	},
});

export default HouseHoldCardExample;
