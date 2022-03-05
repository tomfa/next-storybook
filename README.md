# Minimal effort Storybook for NextJS

I like Storybook, but I don't like maintaining docs or making a big fuzz about it.
This repo demonstrates how to make a minimal viable storybook.

### Setup storybook
```
yarn install
```

### Run storybook 
```js
// Runs in development mode
yarn storybook
```

```
// For production, static files can be generated with 
yarn storybook:build
```

### Deploy storybook to gh-pages
A Github CI [action](https://github.com/tomfa/next-storybook/blob/main/.github/workflows/deploy.yml) is added to automatically deploy the design system to [tomfa.github.io/next-storybook](https://tomfa.github.io/next-storybook/) when `main` brnach is updated.

I recommend doing this for your project too! :)

## Generating stories automatically

A template story can be generated with **`yarn storybook:generate [path]`**, which uses [`.storybook/generate-story.js`](https://github.com/tomfa/next-storybook/blob/main/.storybook/generate-story.js).

### Generates a dummy story for a component
```
yarn storybook:generate src/components/Dropdown.tsx
```
_Note: This assumes the component is default exported._

_Note: Any **required** props to the component must be specified manually in the newly generated file._

### Generating stories in bulk

Generate dummy stories for all components in folder, ignoring those already having a story.
```
yarn storybook:generate src/components
```
_Note: This will generate dummy stories for all files starting with a capital letter, whether or not they are React components._ 
