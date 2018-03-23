import React from 'react';
import BaseWrapper from './BaseWrapper';
import { selectAuthenticatedUserPdf } from '../selectors';
import { Subtitle } from '../blocks';

const Mail = (props) => {
  const { pdf } = props;

  return (
    <div>
      <Subtitle>TODO...</Subtitle>
      <Subtitle>Steps on how to mail the form for your state</Subtitle>
      <Subtitle>SMS subscribe option</Subtitle>
      <Subtitle>Voter Reg Form: {pdf}</Subtitle>
    </div>
  );
};

Mail.mapStateToProps = (state) => ({
  pdf: selectAuthenticatedUserPdf(state),
});

export default BaseWrapper(Mail);
