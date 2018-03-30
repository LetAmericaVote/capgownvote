import React from 'react';
import BaseWrapper from './BaseWrapper';
import TextSubscribeForm from './TextSubscribeForm';
import Link from '../routing/Link';
import { selectAuthenticatedUserPdf } from '../selectors';
import {
  FlexColumnLayout, ContentHeader, ContentParagraph,
  NumberedItemContainer, NumberedItemLabel,
  NumberedItemLayout, NumberedItemContent, NumberedItemLink,
} from '../blocks';

const Mail = (props) => {
  const { pdf } = props;

  const SetPasswordLink = Link((props) => (
    <ContentParagraph underlined {...props}>
      Head over to your profile and setup a password
    </ContentParagraph>
  ), '/auth');

  return (
    <FlexColumnLayout>
      <ContentHeader>Mailing your form takes 3 easy steps</ContentHeader>
      <NumberedItemLayout>
        <NumberedItemContainer>
          <NumberedItemLabel>1</NumberedItemLabel>
        </NumberedItemContainer>
        <NumberedItemContent>
          <NumberedItemLink target="_blank" href={pdf}>Download and print your form.</NumberedItemLink>
        </NumberedItemContent>
      </NumberedItemLayout>
      <NumberedItemLayout>
        <NumberedItemContainer>
          <NumberedItemLabel>2</NumberedItemLabel>
        </NumberedItemContainer>
        <NumberedItemContent>Sign the printed form in box 9.</NumberedItemContent>
      </NumberedItemLayout>
      <NumberedItemLayout>
        <NumberedItemContainer>
          <NumberedItemLabel>3</NumberedItemLabel>
        </NumberedItemContainer>
        <NumberedItemContent>Mail your form to the secretary of state office.</NumberedItemContent>
      </NumberedItemLayout>
      <ContentParagraph>
        All of the information you need for each step can be found on the first page of the form you downloaded.
      </ContentParagraph>
      <ContentParagraph>
        If you need access to a printer, talk to someone at your school such as a teacher or a guidance counselor. In order to mail your form, you can buy a first class stamp at almost any store such as Walmart, or you can purchase them directly from the post office.
      </ContentParagraph>
      <ContentParagraph>
        Need to access your completed form later? <SetPasswordLink />
      </ContentParagraph>
      <ContentHeader>Take the next step, help protect voting rights</ContentHeader>
      <ContentParagraph>Join Let America Vote and help protect your community from politicians that want to make it harder to vote.</ContentParagraph>
      <ContentParagraph>Subscribe to text messages from Let America Vote to start getting actions you can take to protect voting rights.</ContentParagraph>
      <TextSubscribeForm ctaCopy="Subscribe" reducedSpacing />
    </FlexColumnLayout>
  );
};

Mail.mapStateToProps = (state) => ({
  pdf: selectAuthenticatedUserPdf(state),
});

export default BaseWrapper(Mail);
