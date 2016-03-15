/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import {green500} from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

import {RegisterForm, LoginForm} from './Authentication'
import AppBar from 'material-ui/lib/app-bar';
import HouseHoldCard from './HouseHoldCard';
import {GraphCard} from './Graphing';

const styles = {
  container: {
	textAlign: 'center',
  },
  header: {
  },
};

const muiTheme = getMuiTheme({
  palette: {
	primary1Color: green500,
  },
});

class Main extends React.Component {
  constructor(props, context) {
	super(props, context);
	this.handleRequestClose = this.handleRequestClose.bind(this);
	this.handleTouchTap = this.handleTouchTap.bind(this);

	this.state = {
	  open: false,
	};
  }

  handleRequestClose() {
	this.setState({
	  open: false,
	});
  }

  handleTouchTap() {
	this.setState({
	  open: true,
	});
  }

  render() {
	const standardActions = (
	  <FlatButton
		label="Okey"
		secondary={true}
		onTouchTap={this.handleRequestClose}/>
	);

  const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(220,220,220,0.5)",
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
              label: "My Second dataset",
              fillColor: "rgba(76,175,80,0.5)",
              strokeColor: "rgba(151,187,205,0.8)",
              highlightFill: "rgba(151,187,205,0.75)",
              highlightStroke: "rgba(151,187,205,1)",
              data: [28, 48, 40, 19, 86, 27, 90],
          },
      ],
  };

	return (
	  <MuiThemeProvider muiTheme={muiTheme}>
		<div style={styles.container}>
			<div style={styles.header}>
				<AppBar
				title="SmartHome"/>
			</div>
			<div>
				<HouseHoldCard
				title="Naam card (bv Huis van Bart: Vaatwasmachine)"
				subtitle="Subtitle card (bv: verbruik week 21/03/2016)"
				prev="vorige week"
				next="volgende week"/>
			</div>
      <div>
        <GraphCard title="Wasmachine"
                   subtitle="Verbruik"
                   data={data}
                   graphType="Bar"
                   graphTypes={["Line", "Bar", "Radar"]}>
          <div>Test lol</div>
          <div>Omg xD</div>
        </GraphCard>
      </div>
		</div>
	  </MuiThemeProvider>
	);
  }
}
/*
  data={data}
*/
export default Main;
