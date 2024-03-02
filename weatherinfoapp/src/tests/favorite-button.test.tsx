import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { FavoriteButton } from '../components/favorite-button';

test('it should render "remove from favorites" text if it is already a favorite', () => {
	render(<FavoriteButton IsFavorite={true} OnClick={() => { } } />);
	const linkElement = screen.getByTitle(/Remove from favorites/i);
	expect(linkElement).toBeInTheDocument();
});

test('it should render "Add to favorites" text if it is NOT a favorite', () => {
	render(<FavoriteButton IsFavorite={false} OnClick={() => { }} />);
	const linkElement = screen.getByTitle(/Add to favorites/i);
	expect(linkElement).toBeInTheDocument();
});

test('it should render the image with src "/star-selected.png" if it is already a favorite', () => {
	render(<FavoriteButton IsFavorite={true} OnClick={() => { }} />);
	const imageElement = screen.getByAltText(/Remove from favorites/i);
	expect(imageElement).toHaveAttribute('src', "/star-selected.png")
});

test('it should render the image with src "/star-not-selected.svg" if it is NOT a favorite', () => {
	render(<FavoriteButton IsFavorite={false} OnClick={() => { }} />);
	const imageElement = screen.getByAltText(/Add to favorites/i);
	expect(imageElement).toHaveAttribute('src', "/star-not-selected.svg")
});

test('it should call the onClick function with add parameter is clicked and it is NOT a favorite', async () => {
	const onClickMock = jest.fn();
	render(<FavoriteButton IsFavorite={false} OnClick={onClickMock} />);
	const favoriteButtonElement = screen.getByRole("favorite-button");
	fireEvent.click(favoriteButtonElement);

	await waitFor(() => {
		expect(onClickMock).toHaveBeenCalledWith('add');
	});
});

test('it should call the onClick function with add parameter is clicked and it is a favorite', async () => {
	const onClickMock = jest.fn();
	render(<FavoriteButton IsFavorite={true} OnClick={onClickMock} />);
	const favoriteButtonElement = screen.getByRole("favorite-button");
	fireEvent.click(favoriteButtonElement);

	await waitFor(() => {
		expect(onClickMock).toHaveBeenCalledWith('remove');
	});
});