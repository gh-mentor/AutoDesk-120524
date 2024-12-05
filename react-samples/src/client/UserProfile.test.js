import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserProfile from './UserProfile';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    userId: '1', // Mock userId
  }),
}));

test('renders user profile', async () => {
  const { findByLabelText } = render(
    <Router>
      <UserProfile />
    </Router>
  );

  const nameInput = await findByLabelText(/name/i);
  expect(nameInput.value).toBe('Leanne Graham'); // Example name from JSONPlaceholder

  const emailInput = await findByLabelText(/email/i);
  expect(emailInput.value).toBe('Sincere@april.biz'); // Example email from JSONPlaceholder

  const phoneInput = await findByLabelText(/phone/i);
  expect(phoneInput.value).toBe('1-770-736-8031 x56442'); // Example phone from JSONPlaceholder
});