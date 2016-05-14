import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
	powerunitselect: {
		display: "inline-block",
	},
}

const PowerUnitSelect = React.createClass({
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
		const PowerUnits = ["kWh", "Wh"]
		for (let k = 0; k < PowerUnits.length; k++) {
			MenuItems.push((
				<MenuItem value={PowerUnits[k]} primaryText={PowerUnits[k]} key={k}/>
			));
		}

		return (
			<SelectField style={styles.powerunitselect} value={this.state.value} onChange={this.props.handlePowerUnit} floatingLabelText={this.props.lang.powerUnit}>
				{MenuItems}
			</SelectField>
		)
	},
});

module.exports = {
	PowerUnitSelect: PowerUnitSelect,
};
