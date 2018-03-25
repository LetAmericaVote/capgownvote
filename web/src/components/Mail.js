import React from 'react';
import BaseWrapper from './BaseWrapper';
import TextSubscribeForm from './TextSubscribeForm';
import { selectAuthenticatedUserPdf } from '../selectors';
import {
  FlexColumnLayout, ContentHeader, ContentParagraph,
} from '../blocks';

const Mail = (props) => {
  const { pdf } = props;

  return (
    <FlexColumnLayout>
      <ContentHeader>Mailing your form requires 3 easy steps</ContentHeader>
      <ContentParagraph>{pdf}</ContentParagraph>
      <ContentHeader>Take the next step, help protect voting rights.</ContentHeader>
      <ContentParagraph>Join Let America Vote and help protect your community from politicians that want to make it harder to vote.</ContentParagraph>
      <ContentParagraph>Subscribe to text messages from Let America Vote to start getting actions you can take to protect voting rights.</ContentParagraph>
      <TextSubscribeForm ctaCopy="Subscribe" />
    </FlexColumnLayout>
  );
};

Mail.mapStateToProps = (state) => ({
  pdf: selectAuthenticatedUserPdf(state),
});

export default BaseWrapper(Mail);
