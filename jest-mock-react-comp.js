import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./MyComponent', () => () => (<div>Hello World</div>));
jest.mock('./components/MyComponent1', () => () => (<div>Hello World</div>));
jest.mock('./components/MyComponent2/MyComponent2', () => () => (<div>Hello Fake2</div>));

test('renders the component myComponent ', () => {
  const { container } = render(<App/>);
  expect(container.textContent)
    .toMatch('Hello World');
});


test('renders the component myComponent1 ', () => {
  const { container } = render(<App/>);
  expect(container.textContent)
    .toMatch('Hello World');
});


test('renders the component myComponent2 ', () => {
  const { container } = render(<App/>);
  expect(container.textContent)
    .toMatch('Hello Fake2');
});
