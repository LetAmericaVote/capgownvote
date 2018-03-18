import React from 'react';
import BaseWrapper from './BaseWrapper';
import { WhiteButton, InviteSubHeader } from '../blocks';
import { postInvite, POST_INVITE } from '../actions';
import { selectApiRequest } from '../selectors';

const InviteSubmit = (props) => {
  const { inviteRequest, postInvite } = props;

  if (inviteRequest && inviteRequest.hasSucceeded) {
    return (
      <InviteSubHeader>Thanks! We'll reach out shortly.</InviteSubHeader>
    );
  }
  // TODO
  // else if (inviteRequest && inviteRequest.hasFailed) {
  //   return (
  //     <ErrorPrompt
  //       message="We had an error submitting your invite request."
  //       onAction={postInvite}
  //     />
  //   );
  // }

  return (
    <WhiteButton
      disabled={inviteRequest && inviteRequest.isPending}
      onClick={postInvite}
    >Request invite</WhiteButton>
  );
};

InviteSubmit.mapStateToProps = (state) => ({
  inviteRequest: selectApiRequest(POST_INVITE, state),
});

InviteSubmit.actionCreators = {
  postInvite,
};

export default BaseWrapper(InviteSubmit);
