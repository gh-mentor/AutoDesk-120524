import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from './Counter';

/*
Test case 1:
Render the Counter component and verify that the initial count is 0
*/
test('initial count is 0', () => {
  const { getByText } = render(<Counter />);
  const count = getByText(/count:/i);
  expect(count).toHaveTextContent('Count: 0');
});

/*
Test case 2:
Render the Counter component.
Click the increment button and verify that the count is 1
Click the decrement button and verify that the count is 0
*/
test('increments and decrements the counter', () => {
  const { getByText } = render(<Counter />);
  const incrementButton = getByText(/increment/i);
  const decrementButton = getByText(/decrement/i);
  const count = getByText(/count:/i);

  fireEvent.click(incrementButton);
  expect(count).toHaveTextContent('Count: 1');

  fireEvent.click(decrementButton);
  expect(count).toHaveTextContent('Count: 0');
});

/*
Test case 3:
Render the Counter component.
Click the increment button 10 times and verify that the count is 10
Verify that the increment button is disabled
*/
test('disables the increment button at 10', () => {
  const { getByText } = render(<Counter />);
  const incrementButton = getByText(/increment/i);
  const count = getByText(/count:/i);

  for (let i = 0; i < 10; i++) {
    fireEvent.click(incrementButton);
  }

  expect(count).toHaveTextContent('Count: 10');
  expect(incrementButton).toBeDisabled();
});

/*
Test case 4:
Render the Counter component.
Click the decrement button 10 times and verify that the count is 0
Verify that the decrement button is disabled
*/
test('disables the decrement button at 0', () => {
  const { getByText } = render(<Counter />);
  const decrementButton = getByText(/decrement/i);
  const count = getByText(/count:/i);

  for (let i = 0; i < 10; i++) {
    fireEvent.click(decrementButton);
  }

  expect(count).toHaveTextContent('Count: 0');
  expect(decrementButton).toBeDisabled();
});

/*
Test case 5:
Render the Counter component.
Click the increment button 10 times and verify that the count is 10 and the increment button is disabled
Click the decrement button 10 times and verify that the count is 0 and the decrement button is disabled
*/
test('disables the increment and decrement buttons at 0 and 10', () => {
  const { getByText } = render(<Counter />);
  const incrementButton = getByText(/increment/i);
  const decrementButton = getByText(/decrement/i);
  const count = getByText(/count:/i);

  for (let i = 0; i < 10; i++) {
    fireEvent.click(incrementButton);
  }

  expect(count).toHaveTextContent('Count: 10');
  expect(incrementButton).toBeDisabled();

  for (let i = 0; i < 10; i++) {
    fireEvent.click(decrementButton);
  }

  expect(count).toHaveTextContent('Count: 0');
  expect(decrementButton).toBeDisabled();
});