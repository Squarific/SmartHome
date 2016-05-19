import React from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CardText from 'material-ui/Card/CardText';
import CircularProgress from 'material-ui/CircularProgress';
import {GraphCard} from './Graphing';
import {ShareGraphButton} from './ShareGraphButton';
import {SensorListButton} from './SensorListButton';
import Toggle from 'material-ui/Toggle';

const style = {
	maxWidth: "64em",
	margin: "2em auto 2em auto",
};

const styles = {
  checkbox: {
    margin: 8,
    display: "inline-block",
    width: 250,
  },
  euroToggle: {
  	maxWidth: 256,
  	minWidth: "initial",
  	display: "inline-block",
  	verticalAlign: "middle",
  },
};

// Helper function to generate an attractive color from a string.
// Returns an array in the form [h, s, l]
function string2Color (str) {
    let h = 2348;
    let s = 0.9;
    let l = 0.4;
    
    for(let j = Math.max(str.length - 1, 2); j >= 0; j--)
        for(let i = str.length-1; i >= 0; i--) {
            h = ((h << 5) - h) + ~ str.charCodeAt(i);
        }
    
    if(h < 0) {
        h = -h;
        l = 0.35;
    }
    
    if(h > 360) {
        let c = parseInt(h / 360.0);
        h -= c * 360;
        
        if(c % 3 === 0) {
            s = 1;
        } else if(c % 2 === 0) {
            s = 0.95;
        }
    }
    
    return [h, s*100, l*70];
}

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
		return {loading: true, period: "today", selectedPeriod: "24 hours", convertToEuro: false, clusterGroup: false, euroFactor: 0.0003};
	},
	componentDidMount: function () {
		// Put to force a recalculation
		this.props.rest.put(["api", "homes", this.props.id, "sensors", "clusters"], {}, function () {
			this.props.rest.get(["api", "homes", this.props.id, "sensors", "clusters"], {}, function (data) {
				let high = [], medium = [], low = [];

				for (let k = 0; k < data.data.high.length; k++) {
					high.push(data.data.high[k].name);
				}

				for (let k = 0; k < data.data.medium.length; k++) {
					medium.push(data.data.medium[k].name);
				}

				for (let k = 0; k < data.data.low.length; k++) {
					low.push(data.data.low[k].name);
				}

				this.setState({
					clusters: {
						high,
						medium,
						low,
					},
				});
			}.bind(this));
		}.bind(this));

		this.props.rest.get(["api", "users", "me", "homes"], {}, function (data) {
			for (let k = 0; k < data.data.length; k++) {
				if (data.data[k].id.toString() === this.props.id.toString()) {
					this.setState({convertToEuro: data.data[k].attributes.price_per_kwh || this.state.convertToEuro});
					console.log("Price set to " + data.data[k].attributes.price_per_kwh);
				}
			}
		}.bind(this));

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

			let selected = {};
			for (let k = 0; k < data.data.length; k++) {
				selected[data.data[k].key] = false;
			}
			selected[randomElement.key] = true;
			this.setState({
				loading: false,
				selected,
				data: sdata,
			});
		}.bind(this));
	},
	handleChange: function (event, isChecked) {
		let currentSelected = this.state.selected;
		currentSelected[event.target.id] = isChecked;
		this.setState({selected: currentSelected});
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

			let selected = this.state.selected;
			for (let k = 0; k < data.data.length; k++) {
				selected[data.data[k].key] = false;
			}
			selected[randomElement.key] = true;

			this.setState({
				loading: false,
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
			let c = string2Color(this.state.data[this.state.period].data[k].key);

			MenuItems.push((
				<Toggle
					id={this.state.data[this.state.period].data[k].key}
					label={this.state.data[this.state.period].data[k].key}
					labelStyle={{color: "hsl("+ c[0] +", "+ c[1] +"%, "+ (c[2] + 5) +"%)"}}
					style={styles.checkbox}
					key={k}
					toggled={this.state.selected[this.state.data[this.state.period].data[k].key]}
					onToggle={this.handleChange}
				/>
			));
			//Syntax highlight fix
		}

		// Create selectField
		return (
			<div style={{"textAlign": "left", padding: "1em", boxSizing: "border-box"}}>
				{MenuItems}
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
	getGroups: function () {
		if (!this.state.clusters || !this.state.clusterGroup) return (<div></div>);
		let data = this.getClusteredData();
		return (
			<div>
				<div style={{margin: "1em"}}>
					{this.props.lang.highUsage}: {this.state.clusters.high.join(", ")} ({Math.round(data[0].value * 100) / 100} {this.state.convertToEuro ? "Euro" : "Wh"})
				</div>
				<div style={{margin: "1em"}}>
					{this.props.lang.mediumUsage}: {this.state.clusters.medium.join(", ")} ({Math.round(data[1].value * 100) / 100} {this.state.convertToEuro ? "Euro" : "Wh"})
				</div>
				<div style={{margin: "1em"}}>
					{this.props.lang.lowUsage}: {this.state.clusters.low.join(", ")} ({Math.round(data[2].value * 100) / 100} {this.state.convertToEuro ? "Euro" : "Wh"})
				</div>
			</div>
		);
	},
	getData: function (element) {
		let data = {
			labels: [],
			datasets: [],
		};

		for (let element in this.state.selected) {
			if (!this.state.selected[element] && !this.state.clusterGroup) continue;
			let sensorData = this.getDataForElement(element);
			sensorData[0].reverse();
			sensorData[1].reverse();
			
			data.labels = sensorData[0];

			let c = string2Color(element);

			data.datasets.push({
				label: element,
				data: sensorData[1],
				fillColor: "hsla("+ c[0] +", "+ c[1] +"%, "+ (c[2] + 5) +"%, .5)", // Generate a random color based on the name
				strokeColor: "hsla("+ c[0] +", "+ c[1] +"%, "+ (c[2] + 12) +"%, .5)",
				highlightFill: "hsla("+ c[0] +", "+ c[1] +"%, "+ (c[2] + 7) +"%, .5)",
				highlightStroke: "hsla("+ c[0] +", "+ c[1] +"%, "+ (c[2] + 18) +"%, .5)",
			});
		}

		return data;
	},
	getClusteredData: function (element) {
		let data = this.getData();
		let clustered = [{
			label: "High",
			value: 0,
			color: "#B71C1C",
		}, {
			label: "Medium",
			value: 0,
			color: "#E65100",
		}, {
			label: "Low",
			value: 0,
			color: "#33691E",
		}];

		for (let i = 0; i < data.datasets.length; i++) {
			let sum = 0;
			for (let k = 0; k < data.datasets[i].data.length; k++) {
				sum += data.datasets[i].data[k];
			}

			if (this.state.clusters.high.indexOf(data.datasets[i].label) !== -1) {
				clustered[0].value += sum;
			}

			if (this.state.clusters.medium.indexOf(data.datasets[i].label) !== -1) {
				clustered[1].value += sum;
			}

			if (this.state.clusters.low.indexOf(data.datasets[i].label) !== -1) {
				clustered[2].value += sum;
			}
		}

		console.log(clustered);

		return clustered;
	},
	getDataForElement: function (element) {
		let labels = [];
		let values = [];
		let targetElement;

		for (let k = 0; k < this.state.data[this.state.period].data.length; k++) {
			if (this.state.data[this.state.period].data[k].key === element) {
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
			values.push(Math.round(sum * (this.state.convertToEuro ? this.state.euroFactor : 1) * 100) / 100);
		}

		return [labels, values];
	},
	toggleConversion: function (event, isChecked) {
		this.setState({convertToEuro: isChecked});
	},
	toggleClusterGrouping: function (event, isChecked) {
		this.setState({clusterGroup: isChecked});
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

		let data = this.state.clusterGroup ? this.getClusteredData() : this.getData();

		return (<Card style={style}>
			<CardHeader
				title={this.props.title || this.props.lang.household}
				subtitle={"Graphs" || this.props.lang.loading}/>
			<CardMedia>
				{this.getSensorSelectField()}
				<br/>
				{this.getPeriodSelectField()}
				<Toggle
					label={this.props.lang.toggleEuroConversion}
					onToggle={this.toggleConversion}
					style={styles.euroToggle}
					toggled={this.state.convertToEuro}
				/>
				<Toggle
					label={this.props.lang.toggleClusterGrouping}
					onToggle={this.toggleClusterGrouping}
					style={styles.euroToggle}
					toggled={this.state.clusterGroup}
				/>
				<br/>
				<GraphCard data={data}
					graphType={this.state.clusterGroup ? "Pie" : "Bar"}
					graphTypes={this.state.clusterGroup ? [] : ["Line", "Bar", "Radar", "Doughnut", "Pie", "PolarArea"]}
					key={Date.now()}/>
				<br/>
				{this.getGroups()}
			</CardMedia>
			<CardText>
			</CardText>
			<CardActions>
				<ShareGraphButton data={data} lang={this.props.lang} rest={this.props.rest}/>
				<SensorListButton household={this.props.id} lang={this.props.lang} rest={this.props.rest}/>
			</CardActions>
			</Card>
		);
	},
});

export default HouseHoldCard;
