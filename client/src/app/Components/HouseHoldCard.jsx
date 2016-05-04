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
	maxWidth: "64em",
	margin: "2em auto 2em auto",
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
		return {loading: true, period: "today", selectedPeriod: "24 hours"};
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
		if (this.state.data[period]) {
			this.setState({
				period,
				selectedPeriod: value,
			});
			return;
		}

		// Otherwise we have to show the loading model
		this.setState({
			loading: true,
			period,
			selectedPeriod: value,
		});

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
		const periods = ["Last hour", "24 hours", "Last week", "Last month","Last 6 months", "Last year"];

		const MenuItems = [];
		for (let k = 0; k < periods.length; k++) {
			MenuItems.push((
				<MenuItem value={periods[k]} primaryText={periods[k]} key={k}/>
			));
		}

		return (
			<div style={{display: "inline-block", width:256, minWidth: "initial"}}>
				<SelectField value={this.state.selectedPeriod} onChange={this.handleTimelineChange}>
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
	// Give back a label appropriate for the given period
	convertTimestampToLabel: function (timestamp, period) {
		const labelTypes = {
			hourAndMinute: ["Last hour", "24 hours"],
			day: ["Last week", "Last month"],
			month: ["Last 6 months", "Last year"],
		};

		let date = new Date(timestamp);

		if (labelTypes.hourAndMinute.indexOf(period) !== -1) {
			return date.toLocaleTimeString();
		} else if (labelTypes.day.indexOf(period) !== -1) {
			return date.toLocaleDateString();
		}

		return date.toLocaleDateString();
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

		let periods = {
			"Last hour": {
				amount: 60,
				aggregate_per: 1,
			}, 
			"24 hours": {
				amount: 24,
				aggregate_per: 60,
			},
			"Last week": {
				amount: 7,
				aggregate_per: 1,
			},
			"Last month": {
				amount: 31,
				aggregate_per: 1,
			},
			"Last 6 months": {
				amount: 6,
				aggregate_per: 1,
			},
			"Last year": {
				amount: 12,
				aggregate_per: 1,
			},
		};

		const length = Math.min(targetElement.values.length, periods[this.state.selectedPeriod].amount);
		const per = periods[this.state.selectedPeriod].aggregate_per;

		// Select how many values we want
		for (let key = 0; key < length; key++) {

			// Aggregate the values
			let sum = 0;
			for (let i = 0; i < per; i++) {
				// Not enough data?
				if (targetElement.values.length - (key * per) - i - 1 < 0)
					continue;

				sum += targetElement.values[targetElement.values.length - (key * per) - i - 1].usage;
			}

			// Not enough values for this aggregate, time to stop
			if (targetElement.values.length - (key * per) - 1 < 0)
				break

			labels.push(this.convertTimestampToLabel(targetElement.values[targetElement.values.length - (key * per) - 1].timestamp, this.state.selectedPeriod));
			values.push(sum);
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
				<br/>
				{this.getPeriodSelectField()}
				<GraphCard data={this.getData()}
						graphType="Bar"
						graphTypes={["Line", "Bar", "Radar"]}/>
			</CardMedia>
			<CardText>
			</CardText>
			<CardActions>
				<ShareGraphButton data={this.getData()} lang={this.props.lang} rest={this.props.rest}/>
			</CardActions>
			</Card>
		);
	},
});

export default HouseHoldCard;
