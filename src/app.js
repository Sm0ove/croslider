import React from 'react';
import ReactDOM from 'react-dom';

import {Slider} from './slider/slider';
import Data from './data';

console.log(window.__data);
console.log('Buyakasha!');

var App = React.createClass({
	getInitialState() {
		return {
			colorSet: 0,
			slideSet: 0,
			playing: true
		};
	},
	toggleColorSet() {
		this.setState({
			colorSet: this.state.colorSet === 0 ? 1 : 0
		});
	},
	toggleslideSet() {
		this.setState({
			slideSet: this.state.slideSet === 0 ? 1 : 0
		});
	},
	toggleSlideshow() {
		this.setState({
			playing: !this.state.playing
		});
	},
	render: function () {
		var {slideSets} = this.props;
		var {slideSet, playing} = this.state;

		return (
			<div>
				<Slider slides={slideSets[slideSet]} slideWidth={300} playing={playing}/>
				<button onClick={this.toggleSlideshow}>{playing ? 'Stop' : 'Start'} slideshow</button>
			</div>
		);
	}
});

ReactDOM.render(
	<App slideSets={[window.__data]}/>,
	document.getElementById('container')
);