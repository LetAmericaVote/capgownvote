import React from 'react';
import {
  Footer, FooterLink, FooterItem, FooterSubtext,
  FooterLinkWrapper, FooterSubtextWrapper,
  FooterPaidDisclaimer, FooterItemLayout,
  FooterPaidDisclaimerLayout,
} from '../blocks';

const disclaimer = `Paid for by Let America Vote (www.letamericavote.org). Not authorized by any candidate or candidate’s committee.`;

const PageFooter = () => {
  return (
    <Footer>
      <FooterItemLayout>
        <FooterItem>
          <FooterLinkWrapper>
            <FooterSubtextWrapper>
              <FooterSubtext>Created By</FooterSubtext>
            </FooterSubtextWrapper>
            <a href="https://letamericavote.org" target="_blank" rel="noopener noreferrer">
              <FooterLink>Let America Vote</FooterLink>
            </a>
          </FooterLinkWrapper>
        </FooterItem>
        <FooterItem>
          <FooterLinkWrapper>
            <FooterSubtextWrapper>
              <FooterSubtext>In Partnership With</FooterSubtext>
            </FooterSubtextWrapper>
            <a href="https://rockthevote.org" target="_blank" rel="noopener noreferrer">
              <FooterLink>Rock The Vote</FooterLink>
            </a>
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
