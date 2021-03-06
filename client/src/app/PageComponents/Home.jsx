import React from 'react';
import {green700, green600, green500, green300, green100, grey500} from 'material-ui/styles/colors';
import HouseHoldCardExample from '../Components/HouseHoldCardExample';




const bodyStyles = {
	first: {
		color: grey500,
		background: 'white',
		marginLeft: 0,
		marginRight: 0,
		marginTop: 0,
		marginBottom: 0,
	},
	second: {
		color: 'white',
		background: green300,
		marginLeft: 0,
		marginRight: 0,
		marginTop: -5,

		minWidth: "100%",
	},

	text: {
		
		textAlign: "center",
		marginLeft: "auto",
		marginRight: "auto",
		paddingTop: 32,
		paddingBottom: 32,
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
		textAlign: "center",
		whiteSpace: "pre",

	},
	table: {
		width: "100%",
		textAlign: "center",
	},
	tableData: {
		width: "50%",
		padding: "1em",
	},
	tableDataText: {
		maxWidth: "50em",
		margin: "auto",
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

						<div style={bodyStyles.box2}>
							{this.props.lang.introMessage}
							<br/><br/>
							<b>{this.props.lang.welcomeMessage}</b>

						</div>

					</div>

				</div>
				<div style={bodyStyles.first}>


					<table style={bodyStyles.table}>
						<tbody>
							<tr>
								<td style={bodyStyles.tableData}>
									<HouseHoldCardExample lang={this.props.lang}/>
								</td>
								<td style={bodyStyles.tabelData}>
									<div style={bodyStyles.tableDataText}>
										<b>{this.props.lang.graphs}</b>
										<br/><br/>
										{this.props.lang.graphsMessage}
									</div>
								</td>
							</tr>
						</tbody>
					</table>


				</div>

			</div>
		);
	},
});

module.exports = {
	Home,
};
