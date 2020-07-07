import React from 'react';
import { render } from '@testing-library/react';
import DefaultModule from './default.module';

test('renders learn react link', () => {
  const { getByText } = render(<DefaultModule />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
