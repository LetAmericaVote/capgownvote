import { connect } from 'react-redux';

const BaseWrapper = (Component) => {
  const params = [Component.mapStateToProps || null];

  ['mapDispatchToProps', 'actionCreators'].forEach(key => {
    const value = Component[key];

    if (!! value) {
      params.push(value);
    }
  });

  return connect(...params)(Component);
};

export default BaseWrapper;
