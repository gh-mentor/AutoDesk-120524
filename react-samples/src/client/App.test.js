import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Test the App component
test('renders welcome message and navigation links', () => {
  const { getByText } = render(<App />);

  // Verify the welcome message
  const welcomeElement = getByText(/welcome to my web app/i);
  expect(welcomeElement).toBeInTheDocument();

  // Verify the links
  const counterLink = getByText(/counter/i);
  expect(counterLink).toBeInTheDocument();

  const todoListLink = getByText(/todo list/i);
  expect(todoListLink).toBeInTheDocument();

  const userProfileLink = getByText(/user profile 1/i);
  expect(userProfileLink).toBeInTheDocument();
});