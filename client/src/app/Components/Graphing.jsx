import React from 'react';
import Charts from 'react-chartjs';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';

/*
	######################################
	# Graphing Components				#
	######################################
*/

/*
	Graph cards with children
	Can have a title and a subtitle

	Props: {
		data: GRAPHJS data,
		graphType: "Line", //Current graphtype
		graphTypes: ["Line", "Bar", "Doughnut", "Pie", "PolarArea", "Radar"] //Userselectable graph types
	}
*/

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

		return (
			<div style={styles.chart}>
				{selectField}
				<CardMedia>
					<Chart data={this.props.data}/>
				</CardMedia>
			</div>
		)
	},
});

module.exports = {
	GraphCard: GraphCard,
};