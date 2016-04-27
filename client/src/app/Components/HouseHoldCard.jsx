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

const style = {
	margin: "2em",
};

let dataStyle = {
	fillColor: "rgba(220,220,220,0.5)",
	strokeColor: "rgba(220,220,220,0.8)",
	highlightFill: "rgba(220,220,220,0.75)",
	highlightStroke: "rgba(220,220,220,1)",
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
const HouseHoldCard = React.createClass({
	getInitialState: function () {
		return {loading: true};
	},
	componentDidMount: function () {
		this.props.rest.get(["api", "data", "home", this.props.id], {}, function (data) {
			if (data.error) {
				this.setState({error: data.error});
				return;
			}

			if (data.data.length === 0) {
				this.setState({
					loading: false,
					subtitle: "No sensor",
				});
				return;
			}

			const randomElement = data.data[Math.floor(data.data.length * Math.random())];
			let labels = [];
			let values = [];
			console.log(randomElement);

			for (let key = randomElement.values.length - 168;
			     key < randomElement.values.length; key += 6) {
				labels.push(randomElement.values[key].timestamp);
				values.push(randomElement.values[key].usage);
			}

			this.setState({
				loading: false,
				subtitle: randomElement.key,
				labels,
				values,
			});
		}.bind(this));
	},
	render: function () {
		if (this.state.error) return (<div>{this.state.error}</div>);
		if (this.state.loading) return (<Card style={style}>
			<CardHeader
				title={this.props.title || this.props.lang.loading}
				subtitle={this.state.subtitle || this.props.lang.loading}/>
			<CardMedia>
				<div><CircularProgress /></div>
			</CardMedia>
			<CardText>
			</CardText>
			<CardActions>
				<FlatButton label={this.props.prev || this.props.lang.previous} />
				<FlatButton label={this.props.next || this.props.lang.next} />
			</CardActions>
			</Card>);

		let data = {
			labels: this.state.labels,
			datasets: [
				{
					data: this.state.values,
				},
			],
		};


		for (let key in dataStyle) {
			data.datasets[0][key] = dataStyle[key];
		}

		return (<Card style={style}>
			<CardHeader
				title={this.props.title || this.props.lang.household}
				subtitle={this.state.subtitle || this.props.lang.loading}/>
			<CardMedia>
				<GraphCard data={data}
						graphType="Bar"
						graphTypes={["Line", "Bar", "Radar"]}/>
			</CardMedia>
			<CardText>
			</CardText>
			<CardActions>
				<FlatButton label={this.props.prev || this.props.lang.previous} />
				<FlatButton label={this.props.next || this.props.lang.next} />
			</CardActions>
			</Card>
		);
	},
});

export default HouseHoldCard;