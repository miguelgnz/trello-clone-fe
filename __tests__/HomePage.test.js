import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/views/HomePage';

describe('HomePage', () => {
  test('renders SideMenu and ColumnsGrid components', () => {
    render(<HomePage />);

    expect(screen.getByTestId('side-menu')).toBeInTheDocument();
    expect(screen.getByTestId('columns-grid')).toBeInTheDocument();
  });
});
