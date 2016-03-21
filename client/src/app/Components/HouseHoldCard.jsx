import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import {GraphCard} from './Graphing';

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

const HouseHoldCard = (args) => (
	<Card>
	<CardHeader
		title={args.title}
		subtitle={args.subtitle}/>
	<CardMedia>
		<GraphCard title="Wasmachine"
				subtitle="Verbruik"
				data={data}
				graphType="Bar"
				graphTypes={["Line", "Bar", "Radar"]}>
			<div>Test lol</div>
			<div>Omg xD</div>
		</GraphCard>
	</CardMedia>
	<CardText>

	</CardText>
	<CardActions>
		<FlatButton label={args.prev} />
		<FlatButton label={args.next} />
	</CardActions>
	</Card>	
);

export default HouseHoldCard;