import React from 'react';

export default React.createClass({
    render: function () {
        var slideStyles = {
            width: this.props.slideWidth + 'px'
        };
        return (
            <li style={slideStyles}><img src={'/assets/' + this.props.image}/></li>
        );
    }
});

