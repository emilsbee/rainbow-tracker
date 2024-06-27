import * as i from 'types';
import styled, { css } from 'styled-components';

import { getColor } from 'styles/utils';

export const Text = styled.p<i.TextDefaultProps>`
  font-weight: ${({ weight }) => weight || 400};
  line-height: ${({ lineHeight }) => lineHeight || 22}px;
  font-size: ${({ size }) => size || 15}px;
  color: ${({ theme, variant }) => getColor(variant || 'white')};
  margin: 0;

  ${({ $underlineHover }) => $underlineHover && css`
    &:hover {
      text-decoration: underline;
    }
  `};

  ${({ $letterSpacing }) => $letterSpacing && css`
    letter-spacing: 0.05em;
  `};

  ${({ margin }) => margin && css`
    margin: ${margin};
  `};
`;
