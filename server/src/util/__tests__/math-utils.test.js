// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { digit, generateID, getNearestPowerOf2 } from '../math-utils';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('MathUtils', () => {
	test('digit() returns number between 0 and 9', () => {
		expect(digit()).toBeGreaterThanOrEqual(0);
		expect(digit()).toBeGreaterThanOrEqual(0);
		expect(digit()).toBeGreaterThanOrEqual(0);
		expect(digit()).toBeGreaterThanOrEqual(0);
		expect(digit()).toBeGreaterThanOrEqual(0);
		expect(digit()).toBeGreaterThanOrEqual(0);
		expect(digit()).toBeGreaterThanOrEqual(0);
		expect(digit()).toBeGreaterThanOrEqual(0);
		expect(digit()).toBeGreaterThanOrEqual(0);
		expect(digit()).toBeGreaterThanOrEqual(0);
		expect(digit()).toBeLessThanOrEqual(9);
		expect(digit()).toBeLessThanOrEqual(9);
		expect(digit()).toBeLessThanOrEqual(9);
		expect(digit()).toBeLessThanOrEqual(9);
		expect(digit()).toBeLessThanOrEqual(9);
		expect(digit()).toBeLessThanOrEqual(9);
		expect(digit()).toBeLessThanOrEqual(9);
		expect(digit()).toBeLessThanOrEqual(9);
		expect(digit()).toBeLessThanOrEqual(9);
		expect(digit()).toBeLessThanOrEqual(9);
	});

	test('generateID() returns a 16 digit string', () => {
		expect(typeof generateID()).toBe('string');
		expect(generateID().length).toEqual(16);
		expect(generateID().length).toEqual(16);
		expect(generateID().length).toEqual(16);
		expect(generateID().length).toEqual(16);
		expect(generateID().length).toEqual(16);
		expect(generateID().length).toEqual(16);
		expect(generateID().length).toEqual(16);
		expect(generateID().length).toEqual(16);
		expect(generateID().length).toEqual(16);
		expect(generateID().length).toEqual(16);
	});

	test('getNearestPowerOf2() returns power of 2 without going over given number', () => {
		expect(getNearestPowerOf2(16)).toEqual(16);
		expect(getNearestPowerOf2(31)).toEqual(16);
		expect(getNearestPowerOf2(33)).toEqual(32);
		expect(getNearestPowerOf2(0)).toEqual(0);
		expect(getNearestPowerOf2(-2)).toEqual(0);
	});
});
