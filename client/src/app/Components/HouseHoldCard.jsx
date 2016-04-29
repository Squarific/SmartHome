import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
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

			this.setState({
				loading: false,
				selected: randomElement.key,
				data,
			});
		}.bind(this));
	},
	handleChange: function (event, index, value) {
		this.setState({selected: value});
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
			</CardActions>
			</Card>);

		// Create menuoptions if we have multiple graphtypes
		const MenuItems = [];
		for (let k = 0; k < this.state.data.data.length; k++) {
			MenuItems.push((
				<MenuItem value={this.state.data.data[k].key} primaryText={this.state.data.data[k].key} key={k}/>
			));
		}

		// Create selectField
		let selectField;
		if (MenuItems.length !== 0)
			selectField = (
				<SelectField value={this.state.selected} onChange={this.handleChange}>
					{MenuItems}
				</SelectField>
			);

		let labels = [];
		let values = [];
		let targetElement;

		for (let k = 0; k < this.state.data.data.length; k++) {
			if (this.state.data.data[k].key === this.state.selected)
				targetElement = this.state.data.data[k];
			break;
		}

		for (let key = targetElement.values.length - 24;
		     key < targetElement.values.length; key++) {
			labels.push(targetElement.values[key].timestamp);
			values.push(targetElement.values[key].usage);
		}

		let data = {
			labels: labels,
			datasets: [
				{
					data: values,
				},
			],
		};

		// Put the datastyle into the actual data
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
			</CardActions>
			</Card>
		);
	},
});

export default HouseHoldCard;