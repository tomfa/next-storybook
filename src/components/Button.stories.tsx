import React from 'react';
import { Meta } from '@storybook/react';
import Component from './Button';

export default {
  title: 'components/buttons/Button',
  component: Component,
} as Meta;

const Template = (props: React.ComponentProps<typeof Component>) => (
  <Component {...props} />
);
Template.args = undefined as undefined | React.ComponentProps<typeof Component>;

export const Button = Template.bind({});
Button.args = {
  children: 'Jeg er en knapp',
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  ...Button.args,
  children: 'Jeg er en secondary knapp',
  secondary: true,
};
