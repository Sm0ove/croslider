import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Slider from 'croslider';
import 'croslider/src/slider/slider.less';
import Data from './data';

class App extends Component {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.object),
  }
  state = {
    autoslide: true,
    sliding: false,
  }
  onSlideStart = (slide, { direction }) => {
    this.setState({
      sliding: true,
    });
  }
  onSlideEnd = (slide, { direction }) => {
    this.setState({
      sliding: false,
    });
  }
  getState = () => {
    const { autoslide, sliding } = this.state;
    if (!autoslide && sliding) {
      return 'Autoslide disabled, slider is in transition.';
    } else if (!autoslide && !sliding) {
      return 'Autoslide disabled, slider transition ended.';
    } else if (autoslide && sliding) {
      return 'Autoslide enabled, slider is in transition.';
    } return 'Autoslide enabled, slider transition ended.';
  }
  toggleSlideshow = () => {
    this.setState({
      autoslide: !this.state.autoslide,
    });
  }
  render() {
    const { slides } = this.props;
    const { autoslide } = this.state;

    return (
      <div>
        <Slider
          slides={slides}
          slideWidth={300}
          autoslide={autoslide}
          onSlideStart={this.onSlideStart}
          onSlideEnd={this.onSlideEnd}
        />
        <div>{this.getState()}</div>
        <button onClick={this.toggleSlideshow}>{autoslide ? 'Stop' : 'Start'} slideshow</button>
      </div>
    );
  }
}
ReactDOM.render(
  <App slides={Data} />,
  document.getElementById('app') // eslint-disable-line no-undef
);
