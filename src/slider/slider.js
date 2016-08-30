import React, { Component, PropTypes } from 'react';
import Slide from './slide';
import './slider.less';

export default class Slider extends Component {
  static propTypes = {
    slideWidth: PropTypes.number,
    slides: PropTypes.array,
    autoslide: PropTypes.bool,
    onSlideStart: PropTypes.func,
    onSlideEnd: PropTypes.func,
  }
  static defaultProps = {
    slideWidth: 300,
    slides: [],
  }
  state = {
    currentSlide: 0,
    direction: null,
  }
  componentDidMount() {
    this.startSlideshow();
    this.slideList.addEventListener('transitionend', this.transitionEnd);
    this.slideList.addEventListener('webkitTransitionEnd', this.transitionEnd);
    document.addEventListener('keyup', this.keyStroke); // eslint-disable-line no-undef
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyStroke); // eslint-disable-line no-undef
  }
  onClickPrevious = () => {
    this.pauseSlideshow();
    this.previousSlide();
  }
  onClickNext = () => {
    this.pauseSlideshow();
    this.nextSlide();
  }
  pauseSlideshow = () => {
    this.stopSlideshow();
    // TODO set timeout for restarting slideshow
    if (this.timeOut) clearTimeout(this.timeOut);
    this.timeOut = setTimeout(this.startSlideshow, 5000);
  }
  transitionEnd = () => {
    const { slides, onSlideEnd } = this.props;
    const { currentSlide, direction } = this.state;
    const slide = slides[currentSlide];
    onSlideEnd(slide, { direction });
  }
  cancelSlideStart = (direction, slideIndex) => {
    const { slides, onSlideStart } = this.props;
    const slide = slides[slideIndex];
    if (onSlideStart && onSlideStart(slide, { direction }) === false) return true;
    return false;
  }
  previousSlide() {
    const { slides } = this.props;
    const { currentSlide } = this.state;
    const atStart = currentSlide === 0;
    const newCurrentSlide = atStart ? (slides.length - 1) : (currentSlide - 1);
    if (this.cancelSlideStart('left', newCurrentSlide)) return;
    this.setState({
      currentSlide: newCurrentSlide,
      direction: 'left',
    });
  }
  nextSlide() {
    const { slides } = this.props;
    const { currentSlide } = this.state;
    const atEnd = currentSlide === slides.length - 1;
    const newCurrentSlide = atEnd ? 0 : (currentSlide + 1);
    if (this.cancelSlideStart('right', newCurrentSlide)) return;
    this.setState({
      currentSlide: newCurrentSlide,
      direction: 'right',
    });
  }
  keyStroke = (event) => {
    if (event.keyCode === 37) {
      this.stopSlideshow();
      this.previousSlide();
    } else if (event.keyCode === 39) {
      this.stopSlideshow();
      this.nextSlide();
    }
  }
  startSlideshow = () => {
    this.slideshowTimer = setInterval(() => {
      if (this.props.autoslide) {
        this.nextSlide();
      }
    }, 2000);
  }
  stopSlideshow = () => {
    clearInterval(this.slideshowTimer);
  }
  renderSlide = (slide, slideIndex) => {
    const { slideWidth } = this.props;
    return (
      <Slide key={slideIndex} image={slide.image} slideIndex={slideIndex} slideWidth={slideWidth} />
    );
  }
  render() {
    const { slides, slideWidth } = this.props;
    const { currentSlide } = this.state;
    const stageStyles = {
      width: `${slideWidth}px`,
    };
    const ulStyles = {
      width: `${slides.length * slideWidth}px`,
      transform: `translateX(-${currentSlide * slideWidth}px`,
    };
    // do stuff here before the markup gets rendered
    return (
      <div className="croslider">
        <div className="stage" style={stageStyles}>
          <ul style={ulStyles} ref={node => { this.slideList = node; }}>
            {slides.map(this.renderSlide)}
          </ul>
          <nav className="direction">
            <ul>
              <li className="prev" onClick={this.onClickPrevious}>
                <i className="fa fa-chevron-left" />
              </li>
              <li className="next" onClick={this.onClickNext}>
                <i className="fa fa-chevron-right" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
