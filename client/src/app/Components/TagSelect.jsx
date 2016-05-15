import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const styles = {
	tagselect: {
		display: "inline-block",
	},
}

const TagSelect = React.createClass({
	getInitialState: function () {
		return {
			tags: [],			
		};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	componentDidMount: function () {
		this.props.rest.get(["api", "tags"], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}
			this.setState({
				tags: data.data,
			});
		}.bind(this));
	},
	render: function () {
		const TagItems = [];
		for(let i = 0; i<this.state.tags.length; i++) {
			TagItems.push((<MenuItem value={this.state.tags[i].id} primaryText={this.state.tags[i].attributes.name} key={i}/>));
		}
		return(
			<SelectField style={styles.tagselect} value={this.state.value} onChange={this.props.handleTag, this.handleChange} floatingLabelText={this.props.lang.sensorTags}>
			{TagItems}
			</SelectField>
		)
	},
});

module.exports = {
	TagSelect: TagSelect,
};
