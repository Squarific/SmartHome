import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

const styles = {
	wallpost: {
		margin: "16px 16px 0px 16px",
		whiteSpace: "pre",
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

		return (
			<Card style={styles.wallpost}>
			<CardHeader
				title={postTitle}
				subtitle={this.props.post.attributes.date_sent.replace("T", " - ")}/>
			<CardText>
				{this.props.post.attributes.content}
			</CardText>
			</Card>
		)
	},
});

module.exports = {
	WallPost: WallPost,
};