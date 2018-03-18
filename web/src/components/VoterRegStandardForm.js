import React from 'react';
import BaseWrapper from './BaseWrapper';
import VoterRegFormBuilder from './VoterRegFormBuilder';
import { selectStandardRegistrationFields } from '../selectors';

const VoterRegStandardForm = (props) => (
  <VoterRegFormBuilder fields={props.standardFields} />
);

VoterRegStandardForm.mapStateToProps = (state) => ({
  standardFields: selectStandardRegistrationFields(state),
});

export default BaseWrapper(VoterRegStandardForm);
