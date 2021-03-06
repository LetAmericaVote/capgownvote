import styled, { css, keyframes } from 'styled-components';

import headerLargeDesktop from './assets/header-large-desktop.jpg';
import headerSmallDesktop from './assets/header-small-desktop.jpg';
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
  darkSilver: '#9aa4a4',
  red: '#ff4c4d',
  cyan: '#21c2de',
  darkCyan: '#072c34',
  yellow: '#ffff4c',
  bronze: '#ffa54c',
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

export const HomeContentContainer = styled.div`
  display: block;
  width: 100%;
  max-width: ${maxWidth}px;
  padding-left: ${baseValue / 2}px;
  padding-right: ${baseValue / 2}px;
  margin-left: auto;
  margin-right: auto;

  ${media.tablet`
    padding-left: 0;
    padding-right: 0;
  `}
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
    background-image: url(${headerSmallDesktop});
  `}

  ${media['4k']`
    background-image: url(${headerLargeDesktop});
  `}
`;

export const CardLayout = styled.div`
  display: flex;
  flex-direction: column;

  ${media.tablet`
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  `}
`;

export const Card = styled.article`
  display: block;
  flex: 0 0 100%;
  border: 1px solid ${colors.silver};
  margin-bottom: ${baseValue}px;
  border-radius: 4px;
  cursor: pointer;

  ${media.tablet`
    flex: 0 0 calc(33.3% - ${baseValue}px);
    margin-bottom: 0;
  `}
`;

export const CardContent = styled.div`
  display: block;
  padding: ${baseValue}px;
`;

export const CardImage = styled.div`
  display: block;
  width: 100%;
  padding-bottom: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const CardHeader = styled.h1`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue * 1.5}px;
  line-height: ${baseValue * 1.5}px;
  margin-bottom: ${baseValue}px;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const CardCopy = styled.p`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const MiniHeader = styled.h6`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue * .75}px;
  line-height: ${baseValue * .75}px;
  text-transform: uppercase;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  position: ${props => props.float ? 'absolute' : 'relative'};
  flex-direction: row;
  background-color: ${props => props.transparent ? '' : colors.white};
  padding: ${baseValue / 2}px ${baseValue}px;
  ${props => props.fillPage ? 'height: 100%;' : ''}
`;

export const NavLogo = styled.img`
  height: ${baseValue * 2}px;
  cursor: pointer;
  z-index: ${zIndexes.nav + 1};
`;

export const NavLinkMenu = styled.div`
  display: none;

  ${props => props.open ? `
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
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
  color: ${props => props.invertColors ? colors.white : colors.darkCyan};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  text-transform: uppercase;
  cursor: pointer;
  padding: ${baseValue}px;
  ${primaryFontFamily}
  ${fontKerning}

  ${media.tablet`
    padding: ${baseValue / 4}px ${baseValue / 2}px;
    margin: 0 ${baseValue / 2}px;

    font-size: 14px;
    line-height: 14px;

    ${props => props.active ? `
      position: relative;

      &:after {
        content: '';
        display: block;
        position: absolute;
        width: calc(100% - ${baseValue}px);
        height: ${baseValue / 4}px;
        left: ${baseValue / 2}px;
        bottom: -${baseValue / 8}px;
        background-color: ${colors.red};
      }
    ` : ''}

    &:hover {
      color: ${colors.white};
      background-color: ${colors.red};

      &:after {
        display: none;
      }
    }
  `}
`;

const hamburgerLength = baseValue * 1.5;

export const NavHamburgerLayout = styled.div`
  position: absolute;
  top: ${baseValue -  (baseValue / 3)}px;
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
  background-color: ${props => props.open ? 'transparent' : (props.invertColors ? colors.white : colors.darkCyan)};
  top: calc(50% - 1px);
  position: absolute;
  transition: transform .15s cubic-bezier(.645,.045,.355,1), background-color 0s cubic-bezier(.645,.045,.355,1) .1s;

  &:after, &:before {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${props => props.invertColors ? colors.white : colors.darkCyan};
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

export const BottomLeftArea = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: flex-end;
  justify-content: flex-start;
`;

export const PaddedArea = styled.div`
  display: block;
  padding: ${baseValue}px;
`;

export const DoublePaddedArea = styled.div`
  display: block;
  padding: ${baseValue * 2}px;
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
  text-align: ${props => props.center ? 'center' : 'left'};
  ${primaryFontFamily}
  ${fontKerning}
`;

export const LargeTitle = styled.h1`
  display: block;
  color: ${colors.white};
  font-size: ${baseValue * 3.5}px;
  line-height: ${baseValue * 3.5}px;
  text-align: ${props => props.center ? 'center' : 'left'};
  text-transform: uppercase;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const DarkLargeTitle = styled(LargeTitle)`
  color: ${colors.black};
  display: inline-block;
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: calc(100% - ${baseValue / 2}px);
    height: ${baseValue / 2}px;
    left: ${baseValue / 4}px;
    bottom: -${baseValue}px;
    background-color: ${colors.black};
  }
`;

export const DarkTitle = styled(LargeTitle)`
  font-size: ${baseValue * 1.5}px;
  line-height: ${baseValue * 1.5}px;
  color: ${colors.black};
`;

export const TitleEmphasize = styled.span`
  display: inline-block;
  color: ${colors.red};
  font-size: ${baseValue * 3}px;
  line-height: ${baseValue * 3}px;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const LargeTitleEmphasize = styled.span`
  display: inline-block;
  color: ${colors.red};
  font-size: ${baseValue * 3.5}px;
  line-height: ${baseValue * 3.5}px;
  text-transform: uppercase;
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

export const Quote = styled(Subtitle)`
  font-style: italic;
  text-align: center;
  color: ${colors.white};
`;

export const QuoteAuthor = styled.p`
  display: block;
  color: ${colors.white};
  font-size: ${baseValue * .75}px;
  line-height: ${baseValue * .75}px;
  text-align: center;
  margin-top: ${baseValue / 2}px;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const QuoteContainer = styled(DoublePaddedArea)`
  background-color: ${colors.darkCyan};
`;

export const Thesis = styled.h4`
  display: block;
  color: ${colors.white};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  text-align: ${props => props.center ? 'center' : 'left'};
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
  margin-left: auto;
  margin-right: auto;
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

export const RedButton = styled.button`
  display: inline-block;
  background: none;
  padding: ${baseValue / 2}px ${baseValue}px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.red};
  border-radius: 4px;
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

export const AltRedButton = styled(RedButton)`
  &:hover {
    color: ${colors.red};
    background-color: ${colors.silver};
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

export const SimpleLink = styled.a`
  display: block;
  color: ${colors.black};
  cursor: pointer;
  margin-bottom: ${baseValue * 2}px;
  ${secondaryFontFamily}
  ${fontKerning}
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  text-decoration: underline;
`;

export const InlineLink = styled(SimpleLink)`
  display: inline;
`;

export const Footer = styled.footer`
  display: flex;
  width: 100%;
  padding: ${baseValue}px;
  flex-direction: column;
  align-items: center;
  bottom: 0;
  border-top: 2px solid ${colors.red};
`;

export const FooterItemLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: 400px;
`;

export const FooterItem = styled.div`
  display: block;
  margin-bottom: ${baseValue}px;
  min-width: 160px;
`;

export const FooterLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

export const FooterLink = styled.span`
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
  margin-top: ${baseValue}px;
`;

export const FooterPaidDisclaimer = styled.h3`
  display: block;
  color: ${colors.red};
  font-size: ${baseValue * 0.75}px;
  line-height: ${baseValue * 0.75}px;
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
  ${props => props.isFading ? `animation: ${fadeAnimation} 0.25s linear;` : ''}

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

export const StepButtonLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${baseValue}px;

  ${media.tablet`
    width: 50%;
  `}
`;

export const StepBackButton = styled.a`
  display: block;
  color: ${colors.darkSilver};
  font-size: ${baseValue * 0.75}px;
  line-height: ${baseValue * 0.75}px;
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
  margin-bottom: ${props => baseValue * (props.multiplier || 3)}px;
`;

export const InputGroupLabelLayout = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${baseValue / 4}px;
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

export const InputGroupHelperLabel = styled.p`
  display: block;
  color: ${colors.darkSilver};
  font-size: ${baseValue - 4}px;
  line-height: ${baseValue - 4}px;
  margin-top: ${baseValue / 4}px;

  ${primaryFontFamily}
  ${fontKerning}
`;

export const InputGroupHelperLabelLink = styled.a`
  display: inline;
  color: ${colors.cyan};
  font-size: ${baseValue - 4}px;
  line-height: ${baseValue - 4}px;
  margin-top: ${baseValue / 4}px;
  cursor: pointer;
  text-decoration: underline;

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
    margin-top: ${baseValue / 4}px;
    &:before {
      position: absolute;
      content: 'Required';
      display: block;
      color: ${props => props.error ? colors.red : colors.black};
      font-size: ${baseValue / 2}px;
      line-height: ${baseValue / 2}px;
      text-transform: uppercase;
      color: ${colors.red};
      bottom: ${baseValue + (baseValue / 4)}px;
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
  padding-left: ${props => props.disableIndent ? 0 : baseValue / 2}px;
  position: relative;

  ${props => props.disableHover ? `
    margin-bottom: 0;
  ` : `
    cursor: pointer;

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
  `}
`;

export const SuggestionPrimaryTitle = styled.h1`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  ${primaryFontFamily}
  ${fontKerning}

  ${props => props.uppercase ? 'text-transform: uppercase;' : ''}
`;

export const SuggestionSecondaryTitle = styled.h3`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue / 2}px;
  line-height: ${baseValue / 2}px;
  margin-top: ${baseValue / 4}px;
  ${secondaryFontFamily}
  ${fontKerning}

  ${props => props.uppercase ? 'text-transform: uppercase;' : ''}
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
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${baseValue / 2}px;
`;

export const BirthdayColumn = styled.div`
  display: block;
  margin-top: ${baseValue / 2}px;
  ${props => props.month ? `
    flex: 0 0 calc(50% - ${baseValue / 2}px);
  ` : `
    flex: 0 0 calc(25% - ${baseValue / 2}px);
  `}

  ${media.tablet`
    margin-top: 0;
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

export const NotificationLayout = styled.div`
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

export const NotificationMessageArea = styled.div`
  display: block;
  flex: 0 0 85%;
  padding: ${baseValue / 2}px;
  background-color: ${props => props.error ? colors.red : colors.cyan};
`;

export const NotificationMessage = styled.h3`
  display: block;
  color: ${colors.white};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const NotificationClose = styled.div`
  flex-grow: 1;
  background-color: ${props => props.error ? colors.red : colors.cyan};
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

export const SignupAuthLayout = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${baseValue * 2}px;
`;

export const SignupAuthCopy = styled.p`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue * .75}px;
  line-height: ${baseValue * .75}px;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const SignupAuthLink = styled.a`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue * .75}px;
  line-height: ${baseValue * .75}px;
  text-decoration: underline;
  cursor: pointer;
  margin-left: ${baseValue / 6}px;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const ContentLayout = styled.section`
  display: block;
  flex-grow: 1;
  width: 100%;
  max-width: ${maxWidth}px;
  padding: ${baseValue}px;
  margin: ${baseValue * 3}px auto;
`;

export const ContentTitle = styled.h1`
  display: block;
  color: ${colors.darkCyan};
  font-size: ${baseValue * 2.5}px;
  line-height: ${baseValue * 2.5}px;
  margin-bottom: ${baseValue}px;
  ${props => props.centered ? 'text-align: center;' : ''}
  ${primaryFontFamily}
  ${fontKerning}
`;

export const ContentHeader = styled.h3`
  display: block;
  color: ${colors.cyan};
  font-size: ${baseValue * 1.5}px;
  line-height: ${baseValue * 1.5}px;
  margin-bottom: ${baseValue}px;
  ${props => props.centered ? 'text-align: center;' : ''}
  ${primaryFontFamily}
  ${fontKerning}
`;

export const ContentParagraph = styled.p`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;

  ${props => props.underlined ? `
    text-decoration: underline;
    cursor: pointer;
  ` : ''}

  ${props => props.reducedSpacing ? `
    margin-bottom: ${baseValue}px;
  ` : `
    margin-bottom: ${baseValue * 2}px;
  `}

  ${secondaryFontFamily}
  ${fontKerning}
`;

export const Warning = styled(ContentParagraph)`
  margin-bottom: 0;
  padding-top: ${baseValue}px;
  padding-left: ${baseValue / 2}px;
  padding-right: ${baseValue / 2}px;

  ${media.tablet`
    padding-left: 0;
    padding-right: 0;
  `}
`;

export const FlexColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexRowLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HomeLeaderboardLayout = styled.div`
  display: flex;
  flex-direction: column;

  ${media.tablet`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

export const TextSubscribePart = styled.div`
  margin-bottom: ${baseValue}px;
`;

export const NumberedItemLayout = styled(FlexRowLayout)`
  margin-bottom: ${baseValue}px;
  align-items: center;
`;

export const NumberedItemContainer = styled.div`
  display: flex;
  width: ${baseValue * 2}px;
  height: ${baseValue * 2}px;
  flex: 0 0 ${baseValue * 2}px;
  border-radius: ${baseValue}px;
  background-color: ${colors.cyan};
  align-items: center;
  justify-content: center;
`;

export const NumberedItemLabel = styled.h3`
  display: block;
  color: ${colors.white};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const NumberedItemContent = styled(ContentParagraph)`
  margin-left: ${baseValue / 2}px;
  margin-bottom: 0;
`;

export const NumberedItemLink = styled.a`
  display: block;
  color: ${colors.black};
  text-decoration: underline;
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  cursor: pointer;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const AuthLayout = styled.section`
  display: flex;
  width: 100%;
  max-width: ${maxWidth / 2}px;
  padding: ${baseValue * 3}px ${baseValue}px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const BorderedBlock = styled.div`
  display: block;
  width: 100%;
  border: 1px solid ${colors.black};
  padding: ${baseValue}px;
  background-color: ${colors.white};
`;

export const DividingLine = styled.div`
  display: block;
  width: 100%;
  height: 1px;
  background-color: ${colors.black};
  margin-top: ${props => baseValue * (props.reducedSpacing ? 1 : 3)}px;
  margin-bottom: ${props => baseValue * (props.reducedSpacing ? 1 : 3)}px;
`;

export const AuthHeader = styled.h1`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue * 1.5}px;
  line-height: ${baseValue * 1.5}px;
  margin-bottom: ${baseValue * 2}px;
  text-align: center;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const AuthSubheader = styled.h3`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  margin-bottom: ${baseValue}px;
  text-align: center;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const ReminderLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${maxWidth - (baseValue * 2)}px;
  margin-top: ${baseValue}px;
  margin-left: auto;
  margin-right: auto;
  padding: ${baseValue}px;
  background-color: ${colors.silver};
`;

export const ReminderHeader = styled.h1`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue * 1.5}px;
  line-height: ${baseValue * 1.5}px;
  margin-bottom: ${baseValue}px;
  text-align: center;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const ReminderButton = styled.button`
  display: block;
  color: ${colors.black};
  font-size: ${baseValue}px;
  line-height: ${baseValue}px;
  text-decoration: underline;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  ${secondaryFontFamily}
  ${fontKerning}
`;

export const ReminderConfigLayout = styled.div`
  display: flex;
  flex-direction: column;

  ${media.tablet`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

export const ReminderConfigPart = styled.div`
  display: block;
  flex: 0 0 100%;
  padding: ${baseValue}px;
  margin-bottom: ${baseValue}px;
  background-color: ${colors.white};

  ${media.tablet`
    flex: 0 0 calc(50% - ${baseValue / 2}px);
    margin-bottom: 0;
  `}
`;

export const ReminderTimeRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ReminderTimeColumn = styled.div`
  display: block;
  flex: 0 0 calc(50% - ${baseValue / 2}px);
  margin-bottom: ${baseValue * 2}px;
`;

export const LeaderboardLayout = styled.section`
  display: block;
  width: 100%;
  max-width: ${maxWidth * 0.75}px;
  padding: ${baseValue}px;
  margin-left: auto;
  margin-right: auto;
`;

export const LeaderboardRowLayout = styled(FlexRowLayout)`
  margin-bottom: ${baseValue}px;
  padding-bottom: ${baseValue}px;
  border-bottom: 1px solid ${colors.silver};
  align-items: center;
  justify-content: space-between;
`;

export const PointTitle = styled.h1`
  display: block;
  color: ${props => props.highlight ? colors.red : colors.cyan};
  font-size: ${baseValue * 1.5}px;
  line-height: ${baseValue * 1.5}px;
  text-align: left;
  ${primaryFontFamily}
  ${fontKerning}
`;

export const PointSubtitle = styled.h3`
  display: block;
  color: ${props => props.highlight ? colors.darkCyan : colors.darkSilver};
  font-size: ${baseValue * 0.75}px;
  line-height: ${baseValue * 0.75}px;
  text-align: center;
  white-space: nowrap;
  ${primaryFontFamily}
  ${fontKerning}
`;
