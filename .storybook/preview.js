import React from 'react';

import { ThemeProvider } from 'styled-components';
import { MQSize } from '../src/theme/sizes';
import { getTheme, themeNames } from '../src/theme/theme';

export const decorators = [
  (Story, { globals }) => (
    <ThemeProvider theme={getTheme(globals.theme)}>
      <div
        style={{ backgroundColor: getTheme(globals.theme).color.background }}
      >
        <div
          style={{
            display: 'flex',
            padding: '2rem',
          }}
        >
          <Story />
        </div>
      </div>
    </ThemeProvider>
  ),
];

const customViewports = {
  iphoneSE: {
    name: 'iPhone SE',
    styles: {
      width: `${MQSize.XS}px`,
      height: '568px',
    },
  },
  iphone7: {
    name: 'iPhone 6/7/8',
    styles: {
      width: `${MQSize.SM}px`,
      height: '667px',
    },
  },
  ipad: {
    name: 'iPad',
    styles: {
      width: `${MQSize.MD}px`,
      height: '1024px',
    },
  },
  large: {
    name: 'Large',
    styles: {
      width: `${MQSize.LG}px`,
      height: '1366px',
    },
  },
  laptop: {
    name: 'Laptop',
    styles: {
      width: `${MQSize.XL}px`,
      height: '768px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  backgrounds: { disable: true },
  viewport: { viewports: customViewports },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'default',
    toolbar: {
      icon: 'beaker',
      // array of plain string values or MenuItem shape (see below)
      items: Object.entries(themeNames).map(([k, v]) => ({
        title: v,
        value: k,
      })),
    },
  },
};

function showCodeSamples() {
  if (!document) {
    return;
  }
  try {
    const openFirstOnly = true;
    let docs = document.querySelectorAll('.sbdocs');
    if (!docs || !docs.length) {
      return;
    }
    if (openFirstOnly) {
      docs = [docs[0]];
    }

    Array.from(docs).forEach((el) => {
      const buttons = el.querySelectorAll('button');
      if (!buttons.length) {
        return;
      }
      const hideButton = [].find.call(
        buttons,
        (el) => el.textContent === 'Hide code',
      );
      if (hideButton && openFirstOnly) {
        return;
      }
      const codeButton = [].find.call(
        buttons,
        (el) => el.textContent === 'Show code',
      );
      if (codeButton) {
        codeButton.click();
      }
    });
  } catch (e) {
    console.warn(e);
  }
}

window.addEventListener('load', () => {
  showCodeSamples();

  let oldHref = document.location.href;
  let bodyList = document.querySelector('body');
  let observer = new MutationObserver(() => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      setTimeout(showCodeSamples, 5);
    }
  });

  observer.observe(bodyList, {
    childList: true,
    subtree: true,
  });
});
