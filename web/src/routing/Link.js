import React from 'react';
import PropTypes from 'prop-types';

const LinkWrapper = (Component, to) => {
  const Link = ({ children }, { pushLocation }) => (
    <Component onClick={() => pushLocation(to)}>{children}</Component>
  );

  Link.contextTypes = {
    pushLocation: PropTypes.func,
  };

  return Link;
};

export default LinkWrapper;
