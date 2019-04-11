// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { endSession, setState } from '../globalActions';
import { GLOBAL } from '../actionTypes';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('GlobalActions', () => {
	describe('endSession()', () => {
		test('has correct type', () => {
			expect.assertions(1);

			const result = endSession();
			expect(result.type).toEqual(GLOBAL.RESET);
		});

		test('has no payload', () => {
			expect.assertions(1);

			const payload = '__should_not_be_added__';
			const result = endSession(payload);

			expect(result.payload).not.toBeDefined();
		});
	});

	describe('setState()', () => {
		test('has correct type', () => {
			expect.assertions(1);

			const result = setState();
			expect(result.type).toEqual(GLOBAL.SET_STATE);
		});

		test('has correct payload', () => {
			expect.assertions(1);

			const payload = '__payload__';
			const result = setState(payload);

			expect(result.payload).toEqual(payload);
		});
	});
});
