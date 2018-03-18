import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
import { setRoutingPathName } from '../actions';

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.history = createHistory();
    this.updateLocation = this.updateLocation.bind(this);
    this.pushLocation = this.pushLocation.bind(this);
  }

  componentDidMount() {
    const { history, updateLocation } = this;

    updateLocation(history.location);
    history.listen(location => updateLocation(location));
  }

  getChildContext() {
    return {
      pushLocation: this.pushLocation,
    };
  }

  updateLocation(location) {
    if (! location || ! location.pathname) {
      console.error('[Routing Provider] Missing pathname');
      return;
    }

    this.props.setRoutingPathName(location.pathname);
    window.scrollTo(0, 0);
  }

  pushLocation(path) {
    if (path.startsWith('http')) {
      window.location = path;
      return;
    }

    this.history.push(path);
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Router.childContextTypes = {
  pushLocation: PropTypes.func,
};

Router.propTypes = {
  children: PropTypes.node.isRequired,
  setRoutingPathName: PropTypes.func.isRequired,
};

Router.actionCreators = {
  setRoutingPathName,
};

export default connect(null, Router.actionCreators)(Router);
