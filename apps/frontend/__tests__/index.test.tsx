import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Home from '../pages/index';
import { wrapper } from './utils';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home query="test" />, { wrapper });

    const heading = screen.getByRole('heading', {
      name: /YAGA - Yet Another Github App/i,
    });

    expect(heading).toBeTruthy();
  });
});
