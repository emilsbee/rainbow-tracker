import styled, { css, keyframes } from 'styled-components';

import { hexToRgba, media } from 'styles/utils';

import { ButtonProps } from './types';

export const buttonLoaderAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
`;

export const StyledButtonLoader = styled.div`
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    width: 6px;
    height: 6px;
    margin-right: 3px;
    background-color: ${({ theme }) => theme.colors.orange};
    border-radius: 100%;
    animation: ${buttonLoaderAnimation} 1.4s infinite ease-in-out both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
`;

export const ButtonIcon = styled.div`
  margin: 0 8px 0 0;
  display: flex;
  align-items: center;
`;

export const StyledButton = styled.button<ButtonProps>`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.orange};
  font-family: ${({ theme }) => theme.fonts.PTSans};
  font-size: 16px;
  font-weight: 600;
  width: auto;
  height: 37px;
  padding: 12px 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  line-height: normal;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  border-radius: 4px;
  border: 0;
  transition: background-color 300ms, color 300ms;

  svg {
    fill: ${({ theme }) => theme.colors.white};
    max-width: 24px;
    max-height: 24px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) =>  theme.colors.orange.dark};
  }

  ${media.desktop`
    transition: background-color .2s, border-color .2s;

    + button {
      margin: 0 0 0 8px;
    }
  `}

  ${({ iconOnly }) => iconOnly && css`
    width: 37px;

    ${ButtonIcon} {
      margin: 0;
    }
  `}

  ${({ iconOnlyOnMobile }) => iconOnlyOnMobile && css`
    width: 37px;

    ${ButtonIcon} {
      margin: 0;
    }

    > span {
      display: none;
    }

    ${media.tablet`
      width: auto;

      > span {
        display: block;
      }
    `}
  `}

  ${({ iconPosition }) => iconPosition === 'right' && css<ButtonProps>`
    flex-direction: row-reverse;

    ${ButtonIcon} {
      margin: 0 0 0 8px;

      ${({ iconOnlyOnMobile }) => iconOnlyOnMobile && css`
        margin: 0;

        ${media.tablet`
          margin: 0 0 0 8px;
        `}
      `}
    }
  `}

  ${({ variant }) => variant === 'secondary' && css`
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.orange};

    &:hover {
      background-color: ${({ theme }) => hexToRgba(theme.colors.orange, '0.5')};
    }
  `}

  ${({ variant }) => variant === 'tertiary' && css`
    background-color: ${({ theme }) => theme.colors.gray.dark};

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray.extraDark};
    }
  `}

  ${({ variant }) => variant === 'warning' && css`
    background-color: ${({ theme }) => theme.colors.red};
  `}

  ${({ size }) => size === 'auto' && css`
    width: auto;
  `}

  ${({ isLoading }) => isLoading && css`
    cursor: not-allowed;

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.colors.gray.dark};
    }
  `}

  ${({ disabled }) => disabled && css`
    color: ${({ theme }) => theme.colors.white}};
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;

    &:focus {
      background-color: ${({ theme }) => theme.colors.gray};
    }

    ${media.desktop`
      transition: none;

      &:hover {
        background-color: ${({ theme }) => theme.colors.gray};;
      }
    `}
  `};
`;
