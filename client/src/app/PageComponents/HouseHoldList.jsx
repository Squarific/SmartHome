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
		if (!this.props.rest) throw "HouseHoldList Error: No rest client provided!";

		this.props.rest.get(["api", "users", "me", "homes"], {}, function (data) {
			if (data.error) {
				this.setState({error: data.error});
				return;
			}

			this.setState({
				homes: data.data,
				loading: false,
			});
		}.bind(this));
	},
	render: function() {
		if (this.state.loading) return (<div>{this.props.lang.loadingHomes}</div>);
		if (this.state.error) return (<div>{this.state.error}</div>);

		let households = this.state.homes.map(function (household, index) {
			console.log(household);
			return (<HouseHoldCard id={household.id} rest={this.props.rest} title={household.attributes.name} lang={this.props.lang} key={index} />);
		}.bind(this));

		if (this.state.homes.length === 0) {
			households = (<div>You don't have any households!</div>);
		}

		return (<div>
			{households}
		</div>);
	},
});

module.exports = {
	HouseHoldList,
};
