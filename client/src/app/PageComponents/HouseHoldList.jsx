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
		return {loading: true, loadingMsg: "Loading your homes ..."};
	},
	componentDidMount: function () {
		if (!this.props.rest) throw "HouseHoldList Error: No rest client provided!";

		this.props.rest.get(["api", "homes"], {}, function (data) {
			this.setState({
				homes: data.data,
				loading: false,
			});
		}.bind(this));
	},
	render: function() {
		if (this.state.loading) return (<div>{this.state.loadingMsg}</div>);

		let households = this.state.homes.map(function (household, index) {
			return (<HouseHoldCard id={household.id} key={index} />);
		});

		return (<div>
			{households}
		</div>);
	},
});

module.exports = {
	HouseHoldList,
};
