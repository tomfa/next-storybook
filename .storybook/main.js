const path = require('path');

const addSupportForRelativeImportsFromSrcFolder = config => {
  if (!config.resolve) {
    config.resolve = {};
  }
  if (!config.resolve.modules) {
    config.resolve.modules = [];
  }
  config.resolve.modules.push(path.resolve(__dirname, '../src'));

  return config;
}

module.exports = {
  stories: ['../src/**/*.stories.mdx', {
    // 👇 The directory field sets the directory your stories
    directory: '../src',
    // 👇 The titlePrefix field will generate automatic titles for your stories
    titlePrefix: '',
    // 👇 Storybook will load all files that contain the stories extension
    files: '**/*.stories.@(js|jsx|ts|tsx)',
  }],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // We don't use this
    // addSupportForRelativeImportsFromSrcFolder(config)

    return config
  },
};
