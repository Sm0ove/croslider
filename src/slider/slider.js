import React from 'react';
import Slide from './slide';

export var Slider = React.createClass({
    getInitialState() {
        return {
            currentSlide: 0
        };
    },
    getDefaultProps() {
        return {
            slideWidth: 300
        };
    },
    componentDidMount() {
        this.startSlideshow();
        document.addEventListener('keyup', this.keyStroke);
    },
    componentWillUnmount() {
        document.removeEventListener('keyup', this.keyStroke);
    },
    startSlideshow() {
        this.slideshowTimer = setInterval(()=> {
            if (this.props.playing) {
                this.nextSlide();
            }
        }, 2000);
    },
    stopSlideshow() {
        clearInterval(this.slideshowTimer);
    },
    keyStroke(event) {
        console.log('hallo');
        if (event.keyCode === 37) {
            this.stopSlideshow();
            this.previousSlide();
        }
        else if(event.keyCode === 39) {
            this.stopSlideshow();
            this.nextSlide();
        }
    },
    previousSlide() {
        var {slides} = this.props;
        var {currentSlide} = this.state;
        var atStart = currentSlide === 0;
        this.setState({
            currentSlide: atStart ? (slides.length - 1) : (currentSlide - 1)
        });
    },
    nextSlide() {
        var {slides} = this.props;
        var {currentSlide} = this.state;
        var atEnd = currentSlide === slides.length - 1;
        this.setState({
            currentSlide: atEnd ? 0 : (currentSlide + 1)
        });
    },
    onClickPrevious() {
        this.stopSlideshow();
        this.previousSlide();
    },
    onClickNext() {
        this.stopSlideshow();
        this.nextSlide();
    },
    render: function () {
        var {slides, slideWidth} = this.props;
        var {currentSlide} = this.state;
        var stageStyles = {
            width: slideWidth + 'px'
        };
        var ulStyles = {
            width: (slides.length * slideWidth) + 'px',
            transform: 'translateX( -' + (currentSlide * slideWidth) + 'px)'
        };
        // do stuff here before the markup gets rendered
        return (
            <div className="croslider" ref="slider">
                <div className="stage" style={stageStyles}>
                    <ul style={ulStyles}>
                        {slides.map((slide, slideIndex) => {
                            return <Slide key={slideIndex} image={slide} slideIndex={slideIndex}
                                          slideWidth={slideWidth}/>;
                        })}
                    </ul>
                    <nav className="direction">
                        <ul>
                            <li className="prev">
                                <i className="fa fa-chevron-left" onClick={this.onClickPrevious}></i>
                            </li>
                            <li className="next">
                                <i className="fa fa-chevron-right" onClick={this.onClickNext}></i>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
});
