import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UrlPattern from 'url-pattern';

class Route extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      component: null
    };
  }

  async componentDidMount() {
    const { importComponent } = this.props;
    const { default: RouteComponent } = await importComponent();

    this.setState({ RouteComponent });
  }

  render() {
    const { RouteComponent } = this.state;
    const { currentPathName, path } = this.props;
    const pattern = new UrlPattern(path);
    const match = pattern.match(currentPathName);

    if (! currentPathName) {
      return null;
    }

    if (match === null) {
      return null;
    }

    return RouteComponent ? (
      <RouteComponent match={match} />
    ) : null;
  }
}

Route.propTypes = {
  path: PropTypes.string.isRequired,
  currentPathName: PropTypes.string.isRequired,
};

Route.mapStateToProps = (state) => ({
  currentPathName: state.routing.pathName,
});

export default connect(Route.mapStateToProps)(Route);
