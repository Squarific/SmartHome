import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

const HouseHoldCard = (args) => (
  <Card>
	<CardHeader
		title={args.title}
		subtitle={args.subtitle}/>
	<CardMedia>
		<img src="http://lorempixel.com/600/337/nature/"/>
	</CardMedia>
	<CardText>

	</CardText>
	<CardActions>
		<FlatButton label={args.prev} />
		<FlatButton label={args.next} />
	</CardActions>
  </Card>
);

export default HouseHoldCard;