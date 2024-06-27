import * as i from 'types';

export type HeadingColors = i.ColorsFromTheme<'gray' | 'white'>;
export type TextColors =
  | i.ColorsFromTheme<'orange' | 'gray' | 'white'>
  | i.SubcolorFromTheme<'orange', 'medium'>
  | i.SubcolorFromTheme<'gray', 'light' | 'background' | 'dark' | 'extraDark'>;

export type TextDefaultProps = {
  weight?: 400 | 600 | 700;
  size?: 12 | 14 | 16 | 18 | 32;
  lineHeight?: number;
  variant?: i.TextColors;
  $underlineHover?: boolean;
  $letterSpacing?: boolean;
  margin?: string;
};
