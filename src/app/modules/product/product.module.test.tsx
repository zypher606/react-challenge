import React from 'react';
import { render } from '@testing-library/react';
import ProductModule from './product.module';

test('renders learn react link', () => {
  const { getByText } = render(<ProductModule />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
