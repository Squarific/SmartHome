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
	},
}

const WallPost = React.createClass({
	getInitialState: function () {
		const value = '';
		return {value};
	},
	handleChange: function (event, index, value) {
		this.setState({value});
	},
	render: function() {
		return (
			<Card style={styles.wallpost}>
			<CardHeader
				title={"Post from David"}
				subtitle={"21/04/2016 - 13:57"}/>
			<CardText>
				Hey boys, alles goed met jullie verbruik?
				Ik heb vandaag 2 uur lang mijn wasmachine gebruikt.
				#NiceMeme
			</CardText>
			</Card>
		)
	},
});

module.exports = {
	WallPost: WallPost,
};