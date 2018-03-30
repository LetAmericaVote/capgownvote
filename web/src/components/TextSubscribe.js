import React from 'react';
import BaseWrapper from './BaseWrapper';
import TextSubscribeForm from './TextSubscribeForm';
import {
  ContentHeader, FlexColumnLayout,
  TextSubscribePart,
} from '../blocks';

const cta = `Signup to get alerts from Let America Vote and help protect voting rights.`;

const TextSubscribe = (props) => {
  return (
    <FlexColumnLayout>
      <TextSubscribePart>
        <ContentHeader>{cta}</ContentHeader>
      </TextSubscribePart>
      <TextSubscribeForm ctaCopy="Signup" reducedSpacing />
    </FlexColumnLayout>
  );
};

export default BaseWrapper(TextSubscribe);
