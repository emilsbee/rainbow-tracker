import * as i from 'types';

export type ButtonType =
  React.ButtonHTMLAttributes<HTMLButtonElement>
  & React.AnchorHTMLAttributes<HTMLAnchorElement>
  & {
    as?: any;
    children?: React.ReactNode;
    disabled?: boolean;
    href?: string;
    iconOnly?: boolean;
    iconOnlyOnMobile?: boolean;
    isLoading?: boolean;
    onClick?: i.OnClick<HTMLButtonElement>;
    ref?: React.RefObject<HTMLButtonElement>;
    to?: string;
    urlTarget?: 'blank' | 'self' | 'parent' | 'top';
  };

export type IconType = {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};

export type ButtonVariantsType = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'warning';
};

export type ButtonSizeType = {
  size?: 'auto';
};

export type ButtonProps =
  ButtonType
  & ButtonSizeType
  & ButtonVariantsType
  & IconType;
