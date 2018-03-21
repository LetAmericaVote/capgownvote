import styled, { css, keyframes } from 'styled-components';

import header4k from './assets/header-4k.jpg';
import headerDesktop from './assets/header-desktop.jpg';
import headerMobile from './assets/header-mobile.jpg';
import headerTablet from './assets/header-tablet.jpg';

export const baseValue = 24;

export const maxWidth = 960;

export const zIndexes = {
  notification: 100,
  nav: 1000,
  hamburger: 1001,
};

export const colors = {
  black: '#111111',
  white: '#FFFFFF',
  silver: '#ebeded',
  darkSilver: '#c3c9c9',
  red: '#ff4c4d',
  cyan: '#21c2de',
  darkCyan: '#072c34',
};

export const primaryFontFamily = css`
  font-family: MrEavesModOT, sans-sans-serif;
`;

export const secondaryFontFamily = css`
  font-family: MrEavesModOTBook, sans-sans-serif;
`;

export const fontKerning = css`
  font-feature-settings: "kern" 1;
  text-rendering: optimizeLegibility;
`;

const breakpoints = {
  mobileSmall: `320px`,
  mobileLarge: `425px`,
  tablet: `768px`,
  desktopSmall: `1024px`,
  desktopLarge: `1440px`,
  '4k': `2560px`,
};

const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label]}) {
     ${css(...args)}
    }
  `;

  return acc
}, {});

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

export const FullPageBackground = styled.section`
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${colors.black};
  background-image: url(${headerMobile});
  background-size: cover;
  background-position: center;

  ${media.tablet`
    background-image: url(${headerTablet});
  `}

  ${media.desktopSmall`
    background-image: url(${headerDesktop});
  `}

  ${media['4k']`
    background-image: url(${header4k});
  `}
`;

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${colors.silver};
  padding: ${baseValue / 2}px ${baseValue}px;
`;

export const NavLogo = styled.img`
  height: ${baseValue * 2}px;
  cursor: pointer;
`;

export const NavLinkMenu = styled.div`
  display: none;

  ${props => props.open ? `
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${zIndexes.nav};
    background-color: ${colors.silver};
  ` : ''}

  ${media.tablet`
    display: block;
    position: relative;
    flex-grow: 1;
  `}
`;

export const NavLinkLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  ${media.tablet`
    margin-left: ${baseValue}px;
    flex-direction: row;
    flex-grow: 1;
    height: 100%;
    justify-content: flex-end;
  `}
`;

export const NavLink = styled.a`
  display: block;
  color: ${colors.darkCyan};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  text-transform: uppercase;
  cursor: pointer;
  padding: ${baseValue}px;
  ${primaryFontFamily}
  ${fontKerning}

  ${media.tablet`
    padding: ${baseValue / 6}px ${baseValue / 2}px;
    margin: 0 ${baseValue / 2}px;

    &:hover {
      background-color: ${colors.white};
    }
  `}
`;

const hamburgerLength = baseValue * 1.5;

export const NavHamburgerLayout = styled.div`
  position: absolute;
  top: ${baseValue / 2}px;
  right: ${baseValue}px;
  width: ${hamburgerLength}px;
  height: ${hamburgerLength}px;
  overflow: visible;
  z-index: ${zIndexes.hamburger};

  ${media.tablet`
    display: none;
  `}
`;

export const NavHamburgerWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const NavHamburger = styled.div`
  display: block;
  width: 100%;
  height: 2px;
  background-color: ${props => props.open ? 'transparent' : colors.darkCyan};
  top: calc(50% - 1px);
  position: absolute;
  transition: transform .15s cubic-bezier(.645,.045,.355,1), background-color 0s cubic-bezier(.645,.045,.355,1) .1s;

  &:after, &:before {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${colors.darkCyan};
    position: absolute;
    transition: transform 0s cubic-bezier(.645,.045,.355,1) .1s;
  }

  &:before {
    top: ${(baseValue / 3) * -1}px;
  }

  &:after {
    top: ${baseValue / 3}px;
  }

  ${props => props.open ? `
    transform: rotateY(180deg);

    &:before {
      transform: translate3d(0, 10px, 0) rotate(45deg);
      top: -10px;
    }

    &:after {
      transform: translate3d(0,-10px,0) rotate(-45deg);
      top: 10px;
    }
  ` : ''}
`;

export const CenteredArea = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const PaddedArea = styled.div`
  display: block;
  padding: ${baseValue}px;
`;

export const TitleBarContainer = styled.header`
  display: block;
  width: 100%;
  max-width: ${maxWidth}px;
  margin-left: auto;
  margin-right: auto;

  ${media.tablet`
    padding-left: ${baseValue}px;
    padding-right: ${baseValue}px;
    margin-top: ${baseValue * 3}px;
  `}
`;

export const TitleBar = styled.div`
  display: block;
  width: 100%;
  background-color: ${colors.darkCyan};
  padding: ${baseValue * 3}px ${baseValue}px;
  text-align: center;
`;

export const Title = styled.h1`
  display: block;
  color: ${colors.white};
  font-size: ${baseValue * 3}px;
  line-height: ${baseValue * 3}px;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const TitleEmphasize = styled.span`
  display: inline-block;
  color: ${colors.red};
  font-size: ${baseValue * 3}px;
  line-height: ${baseValue * 3}px;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const Subtitle = styled.h3`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const ClearButton = styled.button`
  display: block;
  background: none;
  border: 1px solid ${colors.white};
  width: 100%;
  max-width: ${breakpoints.mobileLarge};
  padding: ${baseValue / 2}px ${baseValue}px;
  text-align: center;
  color: ${colors.white};
  font-size: ${baseValue}px;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  transition-property: background-color;
  transition-duration: 0.25s;
  ${secondaryFontFamily}
  ${fontKerning}

  &:hover {
    color: ${colors.red};
    background-color: ${colors.white};
  }
`;

export const HomeNavItemWrapper = styled.div`
  display: block;
`;

export const HomeNavItem = styled.a`
  display: inline-block;
  color: ${colors.white};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  cursor: pointer;
  user-select: none;
  position: relative;
  margin-bottom: ${baseValue / 2}px;
  ${secondaryFontFamily}
  ${fontKerning}

  &:after {
    position: absolute;
    content: '';
    bottom: -2px;
    left: 0;
    width: 24px;
    height: 2px;
    background-color: ${colors.white};
    transition-property: width;
    transition-duration: 0.25s;
  }

  &:hover:after {
    width: 100%;
    background-color: ${colors.red};
  }
`;

export const Footer = styled.footer`
  display: flex;
  width: 100%;
  padding: ${baseValue}px;
  flex-direction: column;
  bottom: 0;
  border-top: 2px solid ${colors.red};
`;

export const FooterItemLayout = styled.div`
  display: flex;
  flex-direction: column;

  ${media.tablet`
    flex-direction: row;
    justify-content: center;
  `}
`;

export const FooterItem = styled.div`
  display: block;
  margin-bottom: ${baseValue}px;
`;

export const FooterLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${baseValue}px;

  ${media.tablet`
    margin-bottom: 0;
  `}
`;

export const FooterSubtextWrapper = styled.div`
  display: block;
  line-height: ${baseValue / 2}px;
`;

export const FooterSubtext = styled.h4`
  display: inline-block;
  color: ${colors.black};
  font-size: ${baseValue / 2}px;
  line-height: ${baseValue / 2}px;
  text-transform: uppercase;
  padding-bottom: 2px;
  margin-bottom: ${baseValue / 4}px;
  position: relative;
  ${primaryFontFamily}
  ${fontKerning}

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${colors.black};
  }
`;

export const FooterLink = styled.a`
  display: block;
  color: ${colors.red};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  cursor: pointer;
  user-select: none;
  ${secondaryFontFamily}
  ${fontKerning}

  &:hover, &:focus {
    opacity: 1;
  }

  ${media.tablet`
    margin-top: 0;
    margin-right: ${baseValue}px;
  `}
`;

export const FooterPaidDisclaimerLayout = styled.div`
  width: 100%;
  max-width: ${maxWidth / 2}px;
  margin-left: auto;
  margin-right: auto;

  ${media.tablet`
    margin-top: ${baseValue}px;
  `}
`;

export const FooterPaidDisclaimer = styled.h3`
  display: block;
  color: ${colors.red};
  font-size: ${baseValue / 2}px;
  line-height: ${baseValue / 2}px;
  border: 1px solid ${colors.red};
  padding: ${baseValue}px;
  text-align: center;
  ${secondaryFontFamily}
  ${fontKerning}
`;

const fadeAnimation = keyframes`
  100% {
    opacity: 0;
  }

  50% {
    opacity: 50%;
  }
`;

export const StepFrameLayout = styled.section`
  display: flex;
  width: 100%;
  max-width: ${maxWidth}px;
  margin: ${baseValue * 4}px auto;
  flex-direction: column;
  flex-grow: 1;
  ${props => props.isFading ? `animation: ${fadeAnimation} 0.5s linear;` : ''}

  ${media.tablet`
    flex-direction: row;
  `}
`;

export const StepFrameLayoutPart = styled.div`
  display: block;
  flex: 0 0 100%;
  padding: ${baseValue}px;

  ${media.tablet`
    flex: 0 0 50%;
    ${props => props.spaced ? `margin-top: ${baseValue * 2}px;` : ''}
  `}
`;

export const StepSticky = styled.div`
  display: block;
  width: 100%;

  ${media.tablet`
    position: sticky;
    top: ${baseValue}px;
  `}
`;

export const StepTitle = styled.h2`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue * 2}px;
  line-height: ${baseValue * 2}px;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const StepBackButton = styled.a`
  display: block;
  color: ${colors.darkSilver};
  font-size: ${baseValue * 0.75}px;
  line-height: ${baseValue * 0.75}px;
  margin-top: ${baseValue / 2}px;
  cursor: pointer;
  text-transform: uppercase;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const TextInput = styled.input`
  display: block;
  width: 100%;
  padding-bottom: 2px;
  border-bottom: 1px solid ${props => props.hasError ? colors.red : colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const InputGroupLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SpacedInputGroupLayout = styled(InputGroupLayout)`
  margin-bottom: ${baseValue * 3}px;
`;

export const InputGroupLabelLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputGroupLabel = styled.span`
  display: block;
  color: ${props => props.error ? colors.red : colors.black};
  font-size: ${baseValue / 2}px;
  line-height: ${baseValue / 2}px;
  text-transform: uppercase;
  ${primaryFontFamily}
  ${fontKerning}

  ${props => props.error && ! props.hideDot ? `
    padding-left: ${baseValue / 2}px;
    position: relative;

    &:before {
      position: absolute;
      display: block;
      content: '\00B7';
      font-size: ${baseValue / 2}px;
      line-height: ${baseValue / 2}px;
      left: ${baseValue / 4}px;
      top: 0;
    }
  ` : ''}
`;

export const InputGroupHelperLabel = styled.span`
  display: block;
  color: ${colors.darkSilver};
  font-size: ${baseValue - 4}px;
  line-height: ${baseValue - 4}px;
  margin-top: ${baseValue / 4}px;

  ${primaryFontFamily}
  ${fontKerning}
`;

export const WhiteButton = styled.button`
  display: block;
  width: 100%;
  padding: ${baseValue / 2}px ${baseValue}px;
  border: 1px solid ${colors.black};
  color: ${colors.black};
  text-align: center;
  text-transform: uppercase;
  font-size: ${baseValue}px;
  cursor: pointer;
  user-select: none;
  transition: border-color 0.25s, color 0.25s;
  ${secondaryFontFamily}
  ${fontKerning}

  ${props => props.topSpacing ? `margin-top: ${baseValue}px;` : '' }

  &:disabled, &:disabled:hover {
    border: 1px solid ${colors.silver};
    color: ${colors.silver};
  }

  &:hover {
    color: ${colors.red};
    border-color: ${colors.red};
  }
`;

export const SelectInputCarrot = styled.div`
  display: block;
  width: 100%;
  position: relative;

  ${props => props.required ? `
    &:before {
      position: absolute;
      content: 'Required';
      display: block;
      color: ${props => props.error ? colors.red : colors.black};
      font-size: ${baseValue / 2}px;
      line-height: ${baseValue / 2}px;
      text-transform: uppercase;
      color: ${colors.red};
      bottom: ${baseValue}px;
      ${primaryFontFamily}
      ${fontKerning}
    }
  ` : ''}

  &:after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border-left: ${baseValue / 4}px solid transparent;
    border-right: ${baseValue / 4}px solid transparent;
    border-top: ${baseValue / 4}px solid ${colors.black};
    top: ${baseValue / 2}px;
    right: 0;
  }
`;

export const SelectInput = styled.select`
  display: block;
  width: 100%;
  padding-bottom: 2px;

  background-image: linear-gradient(to right, ${props => props.hasError ? colors.red : colors.black} 33%, rgba(255,255,255,0) 0%);
  background-position: bottom;
  background-size: 12px 1px;
  background-repeat: repeat-x;

  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  cursor: pointer;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const TertiaryButtonWrapper = styled.div`
  display: block;
  width: 100%;
`;

export const TertiaryButton = styled.a`
  display: inline-block;
  color: ${colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  cursor: pointer;
  user-select: none;
  position: relative;
  margin-bottom: ${baseValue / 2}px;
  ${props => props.topSpacing ? `margin-top: ${baseValue}px;` : ''}
  ${secondaryFontFamily}
  ${fontKerning}

  &:after {
    position: absolute;
    content: '';
    bottom: -2px;
    left: 0;
    width: 24px;
    height: 2px;
    background-color: ${colors.black};
    transition-property: width;
    transition-duration: 0.25s;
  }

  &:hover:after {
    width: 100%;
  }
`;

const checkmark = css`
  content: '';
  position: absolute;
  background-color: ${colors.white};
  left: 7px;
  top: 11px;
  width: 2px;
  height: 2px;
  box-shadow:
    2px 0 0 white,
    4px 0 0 white,
    4px -2px 0 white,
    4px -4px 0 white,
    4px -6px 0 white,
    4px -8px 0 white;
  transform: rotate(45deg);
`;

export const CheckboxInput = styled.label`
  position: relative;
  cursor: pointer;
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  color: ${colors.black};
  ${primaryFontFamily}
  ${fontKerning}

  &:before {
    content: '';
    display: inline-block;
    margin-right: ${baseValue / 2}px;
    vertical-align: text-top;
    width: ${baseValue}px;
    height: ${baseValue}px;

    background-color: ${props => props.checked ? colors.red : colors.silver};
  }

  &:after {
    ${props => props.checked ? checkmark : ''}
  }

  &:hover:before {
    background-color: ${colors.red};
  }

  &:focus:before {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  }
`;

export const CheckboxLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;

  ${props => props.spacing ? `margin: ${baseValue}px 0;` : ''}
`;

export const CheckboxTitleLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const CheckboxTitle = styled.p`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const SuggestionColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${baseValue}px;
`;

export const Suggestion = styled.div`
  display: block;
  width: 100%;
  margin-bottom: ${baseValue}px;
  cursor: pointer;
  padding-left: ${baseValue / 2}px;
  position: relative;

  &:before {
    position: absolute;
    content: '';
    height: 50%;
    width: 1px;
    top: 25%;
    left: 0;
    background-color: ${colors.black};
    transition: height 0.25s, top 0.25s;
  }

  &:hover:before {
    height: 100%;
    top: 0;
  }
`;

export const SuggestionPrimaryTitle = styled.h1`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const SuggestionSecondaryTitle = styled.h3`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue / 2}px;
  line-height: ${baseValue / 2}px;
  margin-top: ${baseValue / 4}px;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const InviteLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InviteHeader = styled.h1`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  margin-bottom: ${baseValue * 2}px;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const InviteSubHeader = styled.p`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const RulesLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const RuleItem = styled.p`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  margin-bottom: ${baseValue}px;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const BirthdayLayout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: ${baseValue / 2}px;

  ${media.tablet`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

export const BirthdayColumn = styled.div`
  display: block;
  flex: 0 0 100%;
  margin-top: ${baseValue / 2}px;

  ${media.tablet`
    margin-top: 0;
    flex: 0 0 calc(33.3% - ${baseValue / 2}px);
  `}
`;

export const ErrorMessage = styled.h1`
  display: block;
  color: ${colors.red};
  font-size: ${baseValue }px;
  line-height: ${baseValue}px;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const ErrorNotificationLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: ${breakpoints.mobileLarge};
  padding: ${baseValue / 2}px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: ${zIndexes.notification};

  ${media.mobileLarge`
    margin-left: auto;
    margin-right: auto;
  `}
`;

export const ErrorNotificationMessageArea = styled.div`
  display: block;
  flex: 0 0 85%;
  padding: ${baseValue / 2}px;
  background-color: ${colors.red};
`;

export const ErrorNotificationMessage = styled.h3`
  display: block;
  color: ${colors.white};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const ErrorNotificationClose = styled.div`
  flex-grow: 1;
  background-color: ${colors.red};
  position: relative;
  cursor: pointer;

  &:before, &:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 50%;
    top: 50%;
    left: calc(50% - (50% / 2));
    margin-top: -1px;
    background-color: ${colors.white};
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export const SignupLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentLayout = styled.section`
  display: block;
  flex-grow: 1;
  width: 100%;
  max-width: ${maxWidth}px;
  padding: ${baseValue}px;
  margin: ${baseValue * 3}px auto;
`;

export const ContentHeader = styled.h1`
  display: block;
  color: ${colors.cyan};
  font-size: ${baseValue * 1.5}px;
  line-height: ${baseValue * 1.5}px;
  margin-bottom: ${baseValue}px;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const ContentParagraph = styled.p`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue * 1}px;
  line-height: ${baseValue * 1}px;
  margin-bottom: ${baseValue * 2}px;
  ${secondaryFontFamily}
  ${fontKerning}
`;
