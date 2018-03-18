import React from 'react';
import Link from '../routing/Link';
import {
  Footer, FooterLink, FooterItem, FooterSubtext,
  FooterLinkWrapper, FooterSubtextWrapper,
  FooterPaidDisclaimer, FooterItemLayout,
  FooterPaidDisclaimerLayout,
} from '../blocks';

const disclaimer = `Paid for by Let America Vote (www.letamericavote.org). Not authorized by any candidate or candidate’s committee.`;

const PageFooter = () => {
  const RTVLink = Link(FooterLink, 'https://rockthevote.org');
  const LAVLink = Link(FooterLink, 'https://letamericavote.org');

  return (
    <Footer>
      <FooterItemLayout>
        <FooterItem>
          <FooterLinkWrapper>
            <FooterSubtextWrapper>
              <FooterSubtext>Created By</FooterSubtext>
            </FooterSubtextWrapper>
            <LAVLink>Let America Vote</LAVLink>
          </FooterLinkWrapper>
        </FooterItem>
        <FooterItem>
          <FooterLinkWrapper>
            <FooterSubtextWrapper>
              <FooterSubtext>In Partnership With</FooterSubtext>
            </FooterSubtextWrapper>
            <RTVLink>Rock The Vote</RTVLink>
          </FooterLinkWrapper>
        </FooterItem>
      </FooterItemLayout>
      <FooterPaidDisclaimerLayout>
        <FooterPaidDisclaimer>{disclaimer}</FooterPaidDisclaimer>
      </FooterPaidDisclaimerLayout>
    </Footer>
  );
};

export default PageFooter;
