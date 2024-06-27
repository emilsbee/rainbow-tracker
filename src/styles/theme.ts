import 'styled-components';

const theme = {
  colors: {
    orange: Object.assign('#C48852', {
      medium: '#C48852',
      dark: '#976233',
    }),
    gray: Object.assign('#181717', {
      light: '#CCC',
      background: '#2A2C2D',
      dark: '#181717',
      extraDark: '#080808',
    }),
    white: '#FFF',
    red: '#E5193D',
    blue: Object.assign('#2A353C', {
      light: '#314149',
      dark: '#2A353C',
    }),
  },
  fonts: {
    PTSans: 'PT Sans',
  },
} as const;

export default theme;
