import React from 'react';

export default (props) => {
  const slideStyles = {
    width: `${props.slideWidth}px`,
  };
  return (
    <li style={slideStyles}>
      <img src={props.image} alt="" />
    </li>
  );
};
