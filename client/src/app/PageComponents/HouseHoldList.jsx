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
		return {loading: true, loadingMsg: "Loading homes..."};
	},
	componentDidMount: function () {
		if (!this.props.rest) throw "HouseHoldList Error: No rest client provided!";
		this.props.rest.get(["api", "homes"], {}, function (data) {
			console.log(data);
			this.setState({loadingMsg: "Loading homes data..."});
		}.bind(this));
	},
	render: function() {
		if (this.state.loading) return (<div>{this.state.loadingMsg}</div>);

		return (<div></div>);
	},
});

module.exports = {
	HouseHoldList: HouseHoldList,
};