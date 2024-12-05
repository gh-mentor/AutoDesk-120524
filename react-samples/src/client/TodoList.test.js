import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

test('adds a todo item', () => {
  const { getByText, getByRole, getByPlaceholderText } = render(<TodoList />);
  const input = getByRole('textbox');
  const addButton = getByText(/add todo/i);

  fireEvent.change(input, { target: { value: 'Learn React' } });
  fireEvent.click(addButton);

  expect(getByText('Learn React')).toBeInTheDocument();
});