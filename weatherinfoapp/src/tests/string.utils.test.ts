import { StringUtils } from "../utils/string.utils";

test('it should return true if variable is undefined', () => {
	let test!: string;

	const result = StringUtils.IsNullOrEmpty(test);
	expect(result).toEqual(true);
});


test('it should return true if variable is falsy', () => {
	let test = 0;

	const result = StringUtils.IsNullOrEmpty(test as unknown as string);
	expect(result).toEqual(true);
});

test('it should return true if variable is null', () => {
	let test = null;

	const result = StringUtils.IsNullOrEmpty(test as unknown as string);
	expect(result).toEqual(true);
});

test('it should return true if variable is empty string', () => {
	let test = "";

	const result = StringUtils.IsNullOrEmpty(test);
	expect(result).toEqual(true);
});


test('it should return true if variable is not an empty string', () => {
	let test = "my so not empty string";

	const result = StringUtils.IsNullOrEmpty(test);
	expect(result).toEqual(false);
});