import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UrlPattern from 'url-pattern';

const Route = (props) => {
  const { curentPathName, children, path } = props;
  const pattern = new UrlPattern(path);
  const match = pattern.match(curentPathName);

  if (match === null) {
    return null;
  }

  return React.Children.map(children, child => React.cloneElement(child, { match }));
};

Route.propTypes = {
  path: PropTypes.string.isRequired,
  curentPathName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Route.mapStateToProps = (state) => ({
  curentPathName: state.routing.pathName,
});

export default connect(Route.mapStateToProps)(Route);
