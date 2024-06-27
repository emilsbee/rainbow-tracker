import * as i from 'types';
import styled from 'styled-components';

import { media } from 'styles/utils';

const headingSizes = {
  h1: {
    mobile: '22px',
    desktop: '24px',
  },
  h2: {
    mobile: '24px',
    desktop: '24px',
  },
  h3: {
    mobile: '14px',
    desktop: '16px',
  },
  h4: {
    mobile: '12px',
    desktop: '14px',
  },
};

const lineHeightSizes = {
  h1: '32px',
  h2: '21px',
  h3: '18px',
  h4: '15px',
};

export const Heading = styled.h1<HeadingProps>`
  font-weight: 600;
  line-height: ${({ as }) => lineHeightSizes[as || 'h1']};
  font-family: ${({ theme }) => theme.fonts.PTSans};
  font-size: ${({ as }) => headingSizes[as || 'h1'].mobile};
  color: ${({ theme, color }) => theme.colors[color || 'white']};
  margin: ${({ margin }) => margin || '24px 0'};
  text-align: ${({ isCentered }) => isCentered ? 'center' : 'left'};

  ${media.desktop<HeadingProps>`
    font-size: ${(props) => headingSizes[props.as || 'h1'].desktop};
  `}
`;

type HeadingProps = {
  color?: i.HeadingColors;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  margin?: string;
  isCentered?: boolean;
};
