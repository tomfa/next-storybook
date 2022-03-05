const branding = {
  green: '#2D9A64',
  lightGreen: '#57AE83',
  dark: '#043734',
  light: '#F3F0ED',
};

export const themeNames = {
  light: 'Light theme',
  dark: 'Dark theme',
};

type ThemeName = keyof typeof themeNames;

const defaultTheme = {
  name: 'light',
  color: {
    primary: branding.green,
    secondary: branding.dark,
    tertiary: branding.lightGreen,
    light: branding.light,
    background: branding.light,
    text: {
      default: branding.green,
      plain: 'black',
      muted: '#818182',
      light: '#F5E79C',
      error: '#d52939',
      warning: '#856404',
      info: '#004085',
      success: '#155724',
    },
    button: {
      border: branding.green,
      ctaBg: branding.green,
      ctaText: branding.light,
      primaryBg: branding.green,
      primaryText: branding.light,
      secondaryBg: branding.dark,
      secondaryText: branding.light,
    },
  },
  transitions: {
    quick: '100ms',
    default: '150ms',
    slow: '300ms',
  },
  spacing: {
    pageGutter: '2.4rem',
    pageWidth: '1152px',
  },
  typography: {
    fontFamily: `"Px Grotesk", sans-serif`,
    sizes: {
      tiny: '1.2rem',
      small: '1.4rem',
      base: '1.6rem',
      button: '1.8rem',
      h1: '3rem',
      h2: '2.6rem',
      h3: '1.8rem',
      h4: '1.8rem',
      h5: '1.8rem',
      h6: '1.8rem',
    },
    lineHeights: {
      link: '2.2rem',
      base: '2.2rem',
      button: '1',
      h1: '3.5rem',
      h2: '3.5rem',
      h3: '3.5rem',
      h4: '2.2rem',
      h5: '2.2rem',
      h6: '2.2rem',
    },
  },
};

export type Theme = typeof defaultTheme & { name: ThemeName };

export const lightTheme: Theme = { ...defaultTheme, name: 'light' };
export const darkTheme: Theme = {
  ...defaultTheme,
  name: 'dark',
  color: {
    ...defaultTheme.color,
    primary: branding.dark,
    secondary: branding.green,
    tertiary: branding.lightGreen,
    background: branding.green,
    text: {
      ...defaultTheme.color.text,
      default: branding.dark,
      plain: 'white',
      error: '#ff3636',
    },
    button: {
      border: branding.dark,
      ctaBg: branding.dark,
      ctaText: branding.green,
      primaryBg: branding.light,
      primaryText: branding.dark,
      secondaryBg: branding.green,
      secondaryText: branding.dark,
    },
  },
};

const themes = [lightTheme, darkTheme];
export const getTheme = (name: ThemeName): Theme => {
  return themes.find((t) => t.name === name) || lightTheme;
};

export default defaultTheme;
