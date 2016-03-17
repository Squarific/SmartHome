import React from 'react';
import HouseHoldCard from '../Components/HouseHoldCard.jsx';

/*
	HouseHoldList Component

	Props: {
		userid: INT,
		rest: new Rest()
	}
*/

const HouseHoldList = React.createClass({
	getInitialState: function () {
		return {loading: true};
	},
	componentDidMount: function () {
		
	},
	render: function() {
		if (this.state.loading) return (<div>Loading...</div>);

		return ();
	},
});

module.exports = {
	HouseHoldList: HouseHoldList,
};