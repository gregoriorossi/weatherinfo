import { render, screen } from '@testing-library/react';
import React from 'react';
import { Header } from '../components/header';

test('it should render the header with Weather Info App title', () => {
	render(<Header />);
	const linkElement = screen.getByText(/Weather Info App/i);
	expect(linkElement).toBeInTheDocument();
});

test('it should render the header with the app icon', () => {
	render(<Header />);
	const imageElement = screen.getByRole("app-logo");
	expect(imageElement).toBeInTheDocument();
});