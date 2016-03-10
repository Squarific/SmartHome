import injectTapEventPlugin from 'react-tap-event-plugin';
 
// Needed for onTouchTap 
// Can go away when react 1.0 release 
// Check this repo: 
// https://github.com/zilverline/react-tap-event-plugin 
injectTapEventPlugin();


ReactDOM.render(
	<h1>Hello, world!</h1>,
	document.getElementById('example')
);