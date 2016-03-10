import React from 'react';
import Charts from 'react-chartjs';

const Bar = Charts.Bar;
const Doughnut = Charts.Doughnut;
const Line = Charts.Line;
const Pie = Charts.Pie;
const PolarArea = Charts.PolarArea;
const Radar = Charts.Radar;

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class SelectFieldExampleSimple extends React.Component {

  constructor(props) {
	super(props);
	this.state = {value: 2};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
	return (
	  
	);
  }
}

/*
	######################################
	# Graphing Components				#
	######################################
*/

/*
	Graph cards

	Props: {
		data: {
			
		}
	}
*/

const GraphCard = React.createClass({
  render: function() {
	return (
		<Card>
			<CardHeader
				title={this.props.title || "Graph"}
				subtitle={this.props.subtitle || ""}/>
			<CardMedia>
				<LineChart data={this.props.data}/>
			</CardMedia>
			<div>
				<SelectField value={this.state.value} onChange={this.handleChange}>
					<MenuItem value={1} primaryText="Never"/>
					<MenuItem value={2} primaryText="Every Night"/>
					<MenuItem value={3} primaryText="Weeknights"/>
					<MenuItem value={4} primaryText="Weekends"/>
					<MenuItem value={5} primaryText="Weekly"/>
				</SelectField>
				<br />
				<SelectField value={1} disabled={true}>
					<MenuItem value={1} primaryText="Never"/>
					<MenuItem value={2} primaryText="Every Night"/>
				</SelectField>
			  </div>
			<CardText>
				{this.props.children}
			</CardText>
		</Card>
	)
  },
});

module.exports = {
	GraphCard: GraphCard,
};