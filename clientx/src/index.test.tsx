import { render, screen } from '@testing-library/react';
import { Home } from './pages/home/Home'; 

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Hotthorn/i);
  expect(linkElement).toBeInTheDocument();
});
