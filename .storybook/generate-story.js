const fs = require('fs')

const SUPPORTED_FILE_EXT = ['tsx', 'jsx']

const fileExists = (path) => {
  return fs.existsSync(path)
}

const getStoryContent = (componentName) => {
  return `import React from 'react';
import { Meta } from '@storybook/react';
import Component from './${componentName}';

export default { component: Component } as Meta;

const Template = (props: React.ComponentProps<typeof Component>) => (
  <Component {...props} />
);
Template.args = undefined as undefined | React.ComponentProps<typeof Component>;

export const Basic = Template.bind({});
Basic.args = {};
`;
}

const writeFile = ({ path, content }) => {
  fs.writeFileSync(path, content);
}

const splitPath = (path) => {
  if (!fileExists(path)) {
    throw new Error(`Can not find ${path}`)
  }
  const relativePath = path.split('/').reverse()[0]
  if (!relativePath.includes('.')) {
    throw new Error('Unsupported file type ""')
  }

  const componentName = relativePath.slice(0, relativePath.lastIndexOf('.'));
  const ext = relativePath.slice(relativePath.lastIndexOf('.') + 1);

  if (!SUPPORTED_FILE_EXT.includes(ext)) {
    throw new Error(`Unsupported file type ${ext}`)
  }
  const basePath = path.split('.').reverse().slice(1).reverse().join('.');
  const storyPath = `${basePath}.stories.${ext}`;
  return {
    storyPath, componentName, ext
  }
}

const generateTemplate = (path, overwrite = false) => {
  if (!fileExists(path)) {
    throw new Error(`Can not find ${path}`)
  }
  const {storyPath, componentName, ext} =  splitPath(path);
  if (fileExists(storyPath && !overwrite)) {
    throw new Error(`Story ${storyPath} already exists`)
  }

  const content = getStoryContent(componentName)
  writeFile({ path: storyPath, content })
  console.log(`Wrote new story ${storyPath}. Remember to specify args`)
}

if (require.main === module) {
  const args = process.argv;

  if (args.length <= 2) {
    throw new Error(`Missing file path argument`);
  }

  const path = args[2];
  const overwrite = args.length > 3 && args.includes('-f')

  generateTemplate(path, overwrite)
}


