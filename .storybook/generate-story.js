const fs = require('fs')

const SUPPORTED_FILE_EXT = ['tsx', 'jsx']
const EXCLUDED_FILES = [];
const EXCLUDED_FOLDERS = ['src/themes'];

const pathExists = (path) => {
  return fs.existsSync(path)
}

const isDir = (dirPath) => {
  return fs.lstatSync(dirPath).isDirectory();
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

const getStoryPath = (componentPath) => {
  return splitPath(componentPath).storyPath
}

const splitPath = (path) => {
  if (!pathExists(path)) {
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

const generateTemplate = async (path, overwrite = false) => {
  console.log(`Generating story for ${path}`)
  if (!pathExists(path)) {
    throw new Error(`Can not find ${path}`)
  }
  const {storyPath, componentName, ext} =  splitPath(path);
  if (pathExists(storyPath && !overwrite)) {
    throw new Error(`Story ${storyPath} already exists`)
  }

  const content = getStoryContent(componentName)
  writeFile({ path: storyPath, content })
  console.log(`Wrote new story ${storyPath}. Remember to specify args`)
}

const readDir = async (path) => {
  return new Promise((resolve, reject) => fs.readdir(path, (err, data) => err ? reject(err): resolve(data)))
}

const startsWithCapitalLetter = (path) => {
  const filename = path.split('/').reverse()[0];
  const firstLetter = filename[0];
  return firstLetter === firstLetter.toUpperCase();
}

const isSupportedFile = (path) => {
  const ext = path.split('.').reverse()[0];
  const isStory = path.split('.').reverse()[1] === 'stories';

  return !isStory && SUPPORTED_FILE_EXT.includes(ext);
}

const doesNotHaveStory = path => {
  const storyPath = getStoryPath(path);
  return !fs.existsSync(storyPath)
}


const getAllFilesInDir = async (dirPath) => {
  const allFiles = (await readDir(dirPath)).map(dir => `${dirPath}/${dir}`)
  const directories = allFiles.filter(isDir).filter(dir => !EXCLUDED_FOLDERS.includes(dir))
  const subdirFileLists = await Promise.all(directories.map(getAllFilesInDir));
  const filesInSubdir = subdirFileLists.reduce((all, subdir) => all.concat(subdir), []);
  const filesHere = allFiles.filter(isSupportedFile).filter(doesNotHaveStory).filter(startsWithCapitalLetter)
  return filesHere.concat(filesInSubdir).filter(path => !EXCLUDED_FILES.includes(path))
}

const generateTemplateForFilesInDir = async (dirPath) => {
  const files = await getAllFilesInDir(dirPath);
  if (files.length === 0) {
    console.log(`Found 0 files to generate stories for`)
  }
  await files.map(generateTemplate)
}

if (require.main === module) {
  const args = process.argv;

  if (args.length <= 2) {
    throw new Error(`Missing file path argument`);
  }

  const path = args[2];
  if (!isDir(path)) {
    const overwrite = args.length > 3 && args.includes('-f')
    generateTemplate(path, overwrite)
    return
  }
  console.log(`Generating stories for all files in ${path}`)
  generateTemplateForFilesInDir(path);

}


