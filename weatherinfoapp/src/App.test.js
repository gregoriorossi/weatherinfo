import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Weather Info App', () => {
  render(<App />);
	const linkElement = screen.getByText(/Weather Info App/i);
  expect(linkElement).toBeInTheDocument();
});
