import React from 'react';
import {green700, green600, green500, green300, green100, grey500} from 'material-ui/lib/styles/colors';
import HouseHoldCardExample from '../Components/HouseHoldCardExample';

const bodyStyles = {
	first: {
		color: grey500,
		background: 'white',
		marginLeft: 0,
		marginRight: 0,
		marginTop: 0,
		marginBottom: 0,
		minWidth: "100%",
		overflow: "hidden",
		},

	second: {
		color: 'white',
		background: green300,
		marginLeft: 0,
		marginRight: 0,
		marginTop: -5,
		marginBottom: -20,
		minWidth: "100%",

		},
	text: {
		
		textAlign: "left",
		marginLeft: "auto",
		marginRight: "auto",
		paddingTop: 20,

		maxWidth: 1024,
		minHeight: 100,
		fontSize: 16,

		},
	text2: {
		textAlign: "center",
		marginLeft: "auto",
		marginRight: "auto",
		maxWidth: 1024,
		paddingTop: 50,
		paddingBottom: 10,

		},
	box1: {
		maxWidth: 511,
		marginLeft:0,
		marginRight: "auto",
		float: "left",
		textAlign: "center",
		},
	box2: {
		maxWidth: 511,
		marginRight: 0,
		marginLeft: "auto",
		textAlign: "center",
	},
	
		
};

const Style = {
		
		marginLeft: 0,
		marginRight: 0,
		marginTop: 0,
		marginBottom: 0,
		minWidth: "100%",
		maxWidth: "100%",
 		WebkitTransition: 'all', 
  		msTransition: 'all',
	};



const Home = React.createClass({

	

 	render: function() {
	
		
		return (
			
			<div style={Style}>
				
				<div style={bodyStyles.first}>
					<div style={bodyStyles.text}><img src='http://www.loxone.com/tl_files/loxone/Content_images/illustrations/other/energy-3d-house.png' /></div>
				</div>
				<div style={bodyStyles.second}>
					<div style={bodyStyles.text}>
						<div style={bodyStyles.box1}><b>Welcome to SmartHome</b></div>
						<div style={bodyStyles.box2}>lsqdjhgjqh</div>
					</div>

				</div>
				<div style={bodyStyles.first}>
					<div style={bodyStyles.text}>

						<div style={bodyStyles.box1}>
								<HouseHoldCardExample/>
						</div>
						<div style={bodyStyles.box2}><b>Graphs</b> We are using</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = {
	Home,
};
