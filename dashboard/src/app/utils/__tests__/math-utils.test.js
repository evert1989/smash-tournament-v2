// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { getPowerOf2FromResult, isEven, isOdd } from '../math-utils';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('Math utils', () => {
	test('getPowerOf2FromResult() returns closest power of 2 without going over', () => {
		expect.assertions(2);

		expect(getPowerOf2FromResult(17)).toEqual(4);
		expect(getPowerOf2FromResult(8)).toEqual(3);
	});

	test('getPowerOf2FromResult() returns 0 if 0 or invalid argument', () => {
		expect.assertions(3);

		expect(getPowerOf2FromResult(0)).toEqual(0);
		expect(getPowerOf2FromResult(-10)).toEqual(0);
		expect(getPowerOf2FromResult('abc')).toEqual(0);
	});

	test('isEven() returns true when even', () => {
		expect.assertions(3);

		expect(isEven(0)).toBe(true);
		expect(isEven(2)).toBe(true);
		expect(isEven(-2)).toBe(true);
	});

	test('isEven() returns false when odd', () => {
		expect.assertions(2);

		expect(isEven(1)).toBe(false);
		expect(isEven(-1)).toBe(false);
	});

	test('isEven() returns false when invalid argument', () => {
		expect.assertions(1);

		expect(isEven('abc')).toBe(false);
	});

	test('isOdd() returns true when odd', () => {
		expect.assertions(2);

		expect(isOdd(1)).toBe(true);
		expect(isOdd(-1)).toBe(true);
	});

	test('isOdd() returns false when even', () => {
		expect.assertions(3);

		expect(isOdd(0)).toBe(false);
		expect(isOdd(2)).toBe(false);
		expect(isOdd(-2)).toBe(false);
	});

	test('isOdd() returns false when invalid argument', () => {
		expect.assertions(1);

		expect(isOdd('abc')).toBe(false);
	});
});
