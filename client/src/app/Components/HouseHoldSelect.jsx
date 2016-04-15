import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

const styles = {
	householdselect: {
		display: "inline-block",
	},
}

const HouseHoldSelect = React.createClass({
	getInitialState: function () {
		const value = '';
		return {value};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	render: function() {
		// Create menuoptions (static atm)
		const MenuItems = [];
		const houseHolds = ["Household 1", "Household 2"]
		for (let k = 0; k < houseHolds.length; k++) {
			MenuItems.push((
				<MenuItem value={houseHolds[k]} primaryText={houseHolds[k]} key={k}/>
			));
		}

		return (
			<SelectField style={styles.householdselect} value={this.state.value} onChange={this.handleChange} floatingLabelText="Household">
				{MenuItems}
			</SelectField>
		)
	},
});

module.exports = {
	HouseHoldSelect: HouseHoldSelect,
};