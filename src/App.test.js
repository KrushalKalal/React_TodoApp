import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import todoslist from './Components/todoslist';
import edittodoslist from './Components/edit-todoslist';
import createtodoslist from './Components/create-todoslist';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
