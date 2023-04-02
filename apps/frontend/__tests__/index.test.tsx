import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Home from '../pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home query="test" sort={null} order={null} />);

    const heading = screen.getByRole('heading', {
      name: /YAGA - Yet Another Github App/i,
    });

    expect(heading).toBeTruthy();
  });
});
