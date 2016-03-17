import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

const styles = {
	powerunitselect: {
		display: "inline-block",
	},
}

const PowerUnitSelect = React.createClass({
	getInitialState: function () {
		const value = 'kWh';
		return {value};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	render: function() {
		// Create menuoptions (static atm)
		const MenuItems = [];
		const PowerUnits = ["kWh", "Wh"]
		for (let k = 0; k < PowerUnits.length; k++) {
			MenuItems.push((
				<MenuItem value={PowerUnits[k]} primaryText={PowerUnits[k]} key={k}/>
			));
		}

		return (
			<SelectField style={styles.powerunitselect} value={this.state.value} onChange={this.handleChange}>
				{MenuItems}
			</SelectField>
		)
	},
});

module.exports = {
	PowerUnitSelect: PowerUnitSelect,
};