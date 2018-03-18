import { css } from 'styled-components';

export const breakpoints = {
  mobileSmall: `320px`,
  mobileLarge: `425px`,
  tablet: `768px`,
  desktopSmall: `1024px`,
  desktopLarge: `1440px`,
  '4k': `2560px`,
};

export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label]}) {
     ${css(...args)}
    }
  `;

  return acc
}, {});

export const basePixelValue = 24;

// TODO: Disconnect colors from the variable name
export const colors = {
  black: '#111111',
  white: '#FFFFFF',
  silver: '#DDDDDD',
  red: '#ff4c4d',
  lightCyan: '#91e0ed',
  cyan: '#21c2de',
  darkCyan: '#12606d',
};

export const colorBlack = css`
  color: ${colors.black};
`;

export const colorWhite = css`
  color: ${colors.white};
`;

export const colorSilver = css`
  color: ${colors.silver};
`;

export const colorRed = css`
  color: ${colors.red};
`;

export const colorLightCyan = css`
  color: ${colors.lightCyan};
`;

export const colorCyan = css`
  color: ${colors.cyan};
`;

export const colorDarkCyan = css`
  color: ${colors.darkCyan};
`;

export const backgroundColorBlack = css`
  background-color: ${colors.black};
`;

export const backgroundColorWhite = css`
  background-color: ${colors.white};
`;

export const backgroundColorSilver = css`
  background-color: ${colors.silver};
`;

export const backgroundColorRed = css`
  background-color: ${colors.red};
`;

export const backgroundColorCyan = css`
  background-color: ${colors.cyan};
`;

export const backgroundColorDarkCyan = css`
  background-color: ${colors.darkCyan};
`;

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

export const primaryFontSize = css`
  font-size: ${basePixelValue}px;
`;

export const smallFontSize = css`
  font-size: ${basePixelValue * .75}px;
`;

export const mediumFontSize = css`
  font-size: ${basePixelValue * 1.5}px;
`

export const largeFontSize = css`
  font-size: ${basePixelValue * 2}px;
`;

export const jumboFontSize = css`
  font-size: ${basePixelValue * 4}px;
`;

export const primaryFontWeight = css`
  font-weight: 400;
`;

export const secondaryFontWeight = css`
  font-weight: 900;
`;

export const primaryTextMargin = css`
  margin-bottom: ${basePixelValue}px;
`;

export const primaryTextLineHeight = css`
  line-height: ${basePixelValue}px;
`;

export const smallTextLineHeight = css`
  line-height: ${basePixelValue * .75}px;
`;

export const mediumTextLineHeight = css`
  line-height: ${basePixelValue * 1.5}px;
`

export const largeTextLineHeight = css`
  line-height: ${basePixelValue * 2}px;
`;

export const jumboTextLineHeight = css`
  line-height: ${basePixelValue * 4}px;
`;

export const textTransformUppercase = css`
  text-transform: uppercase;
`;

export const textTransformCapitilize = css`
  text-transform: capitalize;
`;

export const textDecorationUnderline = css`
  text-decoration: underline;
`;

export const textAlignCenter = css`
  text-align: center;
`;

export const positionRelative = css`
  position: relative;
`;

export const positionAbsolute = css`
  position: absolute;
`;

export const displayBlock = css`
  display: block;
`;

export const displayInlineBlock = css`
  display: inline-block;
`;

export const displayFlex = css`
  display: flex;
`;

export const flexDirectionRow = css`
  flex-direction: row;
`;

export const flexDirectionColumn = css`
  flex-direction: column;
`;

export const flexWrap = css`
  flex-wrap: wrap;
`;

export const flexFullWidth = css`
  flex: 0 0 100%;
`;

export const flexHalfWidth = css`
  flex: 0 0 50%;
`;

export const flexFourtyWidth = css`
  flex: 0 0 40%;
`;

export const flexSixtyWidth = css`
  flex: 0 0 60%;
`;

export const flexThirdWidth = css`
  flex: 0 0 33.3%;
`;

export const flexTwoThirdWidth = css`
  flex: 0 0 66.6%;
`;

export const width100Percent = css`
  width: 100%;
`;

export const widthAuto = css`
  width: auto;
`;

export const widthBaseSize = css`
  width: ${basePixelValue}px;
`;

export const height100Percent = css`
  height: 100%;
`;

export const minHeight100Percent = css`
  min-height: 100%;
`;

export const heightBaseSize = css`
  height: ${basePixelValue}px;
`;

export const paddingBaseline = css`
  padding: ${basePixelValue}px;
`;

export const paddingHalfBaselineVertical = css`
  padding-top: ${basePixelValue / 2}px;
  padding-bottom: ${basePixelValue / 2}px;
`;

export const paddingDoubleBaseline = css`
  padding: ${basePixelValue * 2}px;
`;

export const paddingDoubleBaselineHorizontal = css`
  padding-left: ${basePixelValue * 2}px;
  padding-right: ${basePixelValue * 2}px;
`;

export const paddingHalfBaseline = css`
  padding: ${basePixelValue / 2}px;
`;

export const paddingLeftIndent = css`
  padding-left: ${basePixelValue / 2}px;
`;

export const marginCenter = css`
  margin-left: auto;
  margin-right: auto;
`;

export const marginRightHalf = css`
  margin-right: ${basePixelValue * .5}px;
`;

export const marginBottomNone = css`
  margin-bottom: 0;
`;

export const cursorPointer = css`
  cursor: pointer;
`;

export const borderSolidSilver = css`
  border: 1px solid ${colors.silver};
`;

export const borderTopSolidRed = css`
  border-top: 4px solid ${colors.red};
`;

export const borderRadius = css`
  border-radius: ${basePixelValue / 4}px;
`;

export const wordBreakWord = css`
  word-break: break-word;
`;

export const contentEmpty = css`
  content: '';
`;

export const verticalAlignTextTop = css`
  vertical-align: text-top;
`;

export const userSelectNone = css`
  user-select: none;
`;

export const boxShadowInset = css`
  box-shadow: inset 0px 2px 4px 0px hsla(0, 0%, 0%, 0.3);
`;
