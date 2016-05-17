import React from 'react';
import Charts from 'react-chartjs';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardText from 'material-ui/Card/CardText';

/*
	######################################
	# Graphing Components				#
	######################################
*/

/*
	Graph

	Props: {
		data: GRAPHJS data,
		graphType: "Line", //Current graphtype
		graphTypes: ["Line", "Bar", "Doughnut", "Pie", "PolarArea", "Radar"] //Userselectable graph types
	}
*/

let summedGraph = ["Doughnut", "Pie", "PolarArea"];

const styles = {
	chart: {
		padding: 20,
	},
}

const GraphCard = React.createClass({
	getInitialState: function () {
		const value = this.props.graphType || "Line";
		return {value};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	handleResize: function (event) {
		this.setState({lastResize: Date.now()});
	},
	componentDidMount: function () {
		window.addEventListener("resize", this.handleResize);
	},
	componentWillUnmount: function () {
		window.removeEventListener("resize", this.handleResize);
	},
	sumData: function (data) {
		let newData = [];

		for (let k = 0; k < data.datasets.length; k++) {
			let sum = 0;

			for (let i = 0; i < data.datasets[k].data.length; i++) {
				sum += data.datasets[k].data[i];
			}

			newData.push({
				value: sum,
				color: data.datasets[k].fillColor || "gray",
			});
		}

		return newData;
	},
	render: function() {
		const Chart = Charts[this.state.value];

		// Create menuoptions if we have multiple graphtypes
		const MenuItems = [];
		const graphTypes = this.props.graphTypes || [];
		for (let k = 0; k < graphTypes.length; k++) {
			MenuItems.push((
				<MenuItem value={graphTypes[k]} primaryText={graphTypes[k]} key={k}/>
			));
		}

		// Create selectField
		let selectField;
		if (MenuItems.length !== 0)
			selectField = (
				<SelectField value={this.state.value} onChange={this.handleChange}>
					{MenuItems}
				</SelectField>
			);

		if (!this.props.data) throw "GraphCard no data provided " + JSON.stringify(this.props);

		// Hacky way to force the graph to rerender
		let key = this.state.lastResize;

		let data = this.props.data;
		if (summedGraph.indexOf(this.state.value) !== -1) {
			data = sumData(data);
		}

		let ourChart = (<Chart data={data} key={key} redraw/>);

		return (
			<div style={styles.chart}>
				{selectField}
				<CardMedia>
					{ourChart}
				</CardMedia>
			</div>
		)
	},
});

module.exports = {
	GraphCard: GraphCard,
};