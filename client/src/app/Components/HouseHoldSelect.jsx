import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
	householdselect: {
		display: "inline-block",
	},
};

const HouseHoldSelect = React.createClass({
	getInitialState: function () {
		const value = '';
		return {
			value, 
			homes: "",
		};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
		this.props.handleHousehold(value);
	},
	componentDidMount: function () {
		this.props.rest.get(["api", "users", "me", "homes"], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
			this.setState({
				homes: data.data,
			});
		}.bind(this));
	},
	render: function() {
		// Create menuoptions (static atm)
		let MenuItems = [];
		//const houseHolds = ["Household 1", "Household 2"]
		for (let k = 0; k < this.state.homes.length; k++) {
			MenuItems.push((
				<MenuItem value={this.state.homes[k].id} primaryText={this.state.homes[k].attributes.name} key={k}/>
			));
		}

		return (
			<SelectField style={styles.householdselect} value={this.state.value} onChange={this.handleChange} floatingLabelText={this.props.lang.household}>
				{MenuItems}
			</SelectField>
		)
	},
});

module.exports = {
	HouseHoldSelect: HouseHoldSelect,
};
