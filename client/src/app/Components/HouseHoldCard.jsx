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
import {ShareGraphButton} from './ShareGraphButton';

const style = {
	margin: "2em",
	maxWidth: "64em",
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
		return {loading: true, period: "today"};
	},
	componentDidMount: function () {
		this.props.rest.get(["api", "homes", this.props.id, "data", this.state.period], {}, function (data) {
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

			console.log(data);

			const randomElement = data.data[Math.floor(data.data.length * Math.random())];

			let sdata = this.state.data || {};
			sdata[this.state.period] = data;

			this.setState({
				loading: false,
				selected: randomElement.key,
				data: sdata,
			});
		}.bind(this));
	},
	handleChange: function (event, index, value) {
		this.setState({selected: value});
	},
	handleTimelineChange: function (event, index, value) {
		// Periods we can ask the server
		let periods = {
			"today": ["Last hour", "24 hours"],
			"last_month": ["Last week", "Last month"],
			"last_year": ["Last 6 months", "Last year"],
		};

		// Search the period we can ask
		let period;
		for (let p in periods) {
			if (periods[p].indexOf(value) !== -1) {
				period = p;
				break;
			}
		}

		if (!period)
			throw "Period not present. " + period + " List:" + JSON.stringify(periods);

		// Check if we already have that data
		// If so we can just rerender
		if (this.state.data[period]) return;

		// Otherwise we have to show the loading model
		this.state.loading = true;
		this.setState({
			loading: true,
			period,
		})

		this.props.rest.get(["api", "homes", this.props.id, "data", period], {}, function (data) {
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

			let sdata = this.state.data || {};
			sdata[period] = data;

			this.setState({
				loading: false,
				selected: randomElement.key,
				data: sdata,
			});
		}.bind(this));
	},
	getPeriodSelectField: function () {
		let periods = ["Last hour", "24 hours", "Last week", "Last month","Last 6 months", "Last year"];

		const MenuItems = [];
		for (let k = 0; k < periods.length; k++) {
			MenuItems.push((
				<MenuItem value={periods[k]} primaryText={periods[k]} key={k}/>
			));
		}

		return (
			<div style={{display: "inline-block", width:256, minWidth: "initial"}}>
				<SelectField value={this.state.period} onChange={this.handleTimelineChange}>
					{MenuItems}
				</SelectField>
			</div>
		);
	},
	getSensorSelectField: function () {
		// Create menuoptions if we have multiple graphtypes
		const MenuItems = [];
		for (let k = 0; k < this.state.data[this.state.period].data.length; k++) {
			MenuItems.push((
				<MenuItem value={this.state.data[this.state.period].data[k].key} primaryText={this.state.data[this.state.period].data[k].key} key={k}/>
			));
		}

		// Create selectField
		return (
			<div style={{display: "inline-block", width:256, minWidth: "initial"}}>
				<SelectField value={this.state.selected} onChange={this.handleChange}>
					{MenuItems}
				</SelectField>
			</div>
		);
	},
	getData: function () {
		let labels = [];
		let values = [];
		let targetElement;

		for (let k = 0; k < this.state.data[this.state.period].data.length; k++) {
			if (this.state.data[this.state.period].data[k].key === this.state.selected) {
				targetElement = this.state.data[this.state.period].data[k];
				break;
			}			
		}

		for (let key = targetElement.values.length - 48;
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

		return data;
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

		return (<Card style={style}>
			<CardHeader
				title={this.props.title || this.props.lang.household}
				subtitle={this.state.selected || this.props.lang.loading}/>
			<CardMedia>
				{this.getSensorSelectField()}
				{this.getPeriodSelectField()}
				<GraphCard data={this.getData()}
						graphType="Bar"
						graphTypes={["Line", "Bar", "Radar"]}/>
			</CardMedia>
			<CardText>
			</CardText>
			<CardActions>
				<ShareGraphButton data={data} lang={this.props.lang} rest={this.props.rest}/>
			</CardActions>
			</Card>
		);
	},
});

export default HouseHoldCard;