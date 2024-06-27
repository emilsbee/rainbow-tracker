import * as React from 'react';

import { ReactComponent as LoaderIcon } from 'icons/spinner.svg';

import { LoaderWrapper } from './styled';

export const Loader: React.FC<LoaderProps> = ({ size, iconOnly }) => {
  if (iconOnly) {
    return (
      <LoaderIcon
        height={size ? size : '80px'}
        width={size ? size : '80px'}
      />
    );
  }

  return (
    <LoaderWrapper>
      <LoaderIcon
        height={size ? size : '80px'}
        width={size ? size : '80px'}
      />
    </LoaderWrapper>
  );
};

type LoaderProps = {
  size?: number;
  iconOnly?: boolean;
}
