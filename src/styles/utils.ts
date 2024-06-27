import * as i from 'types';
import { css } from 'styled-components';
import { get as getFromObject } from 'lodash';

import theme from './theme';

export const sizes = {
  large: 1200,
  desktop: 992,
  tablet: 768,
} as const;

export const media = Object.keys(sizes).reduce((accumulator, _label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const label = _label as i.MediaSizes;
  const emSize = sizes[label] / 16;

  //@ts-ignore
  accumulator[label] = (...args: Parameters<typeof css>) => css` @media (min-width: ${emSize}em) { ${css(...args)}; } `;

  return accumulator;
}, {} as i.MediaUtils);

export const getColor = (color: i.ThemeColors | [i.ThemeColors, string]) => {
  if (Array.isArray(color)) {
    return getFromObject(theme.colors[color[0]], color[1]);
  } else {
    return theme.colors[color as i.ThemeColors];
  }
};

export const hexToRgba = (hex: string, alpha = '0.2') => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})` : null;
};
