import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import {GraphCard} from './Graphing';

const styles = {
	wallpost: {
		margin: "16px auto 0px auto",
		whiteSpace: "pre",
		maxWidth: "64em",
	},
}

const WallPost = React.createClass({
	getInitialState: function () {
		return {
			sender: "Loading...",
			loading: true,
		}
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	componentDidMount: function () {
		if (!this.props.rest) throw "Notification Error: No rest client provided!";

		this.props.rest.get(["api", "users", this.props.post.relationships.user.data.id], {}, function (data) {
			if (data.error) {
				console.log(data.error);
				return;
			}

			this.setState({
				sender: data.data,
				loading: false,
			});
		}.bind(this));
	},
	render: function() {
		console.log(this.state.sender)

		let postTitle;
		if (!this.state.loading) {
			postTitle = this.props.lang.postFrom + this.state.sender.attributes.first_name;
		} else {
			postTitle = "Loading...";
		}

		let graph;
		if (this.props.post.attributes.plot !== "") {
			graph = <GraphCard data={JSON.parse(this.props.post.attributes.plot)}
				graphType="Bar"
				graphTypes={["Line", "Bar", "Radar"]}/>
		} else {
			graph = "";
		}

		return (
			<Card style={styles.wallpost}>
			<CardHeader
				title={postTitle}
				subtitle={Date(this.props.post.attributes.date_sent).toLocaleString()}/>
			<CardText>
				{this.props.post.attributes.content}
			</CardText>
				{graph}
			</Card>
		)
	},
});

module.exports = {
	WallPost: WallPost,
};
