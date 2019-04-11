// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
	createGame,
	nextRound,
	setRounds,
	setWinner,
} from '../dashboardActions';

import { DASHBOARD } from '../actionTypes';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('DashboardActions', () => {
	describe('createGame()', () => {
		test('has correct type', () => {
			expect.assertions(1);

			const result = createGame();
			expect(result.type).toEqual(DASHBOARD.CREATE);
		});

		test('has correct payload', () => {
			expect.assertions(1);

			const payload = '__payload__';
			const result = createGame(payload);

			expect(result.payload).toEqual(payload);
		});
	});

	describe('nextRound()', () => {
		test('has correct type', () => {
			expect.assertions(1);

			const result = nextRound();
			expect(result.type).toEqual(DASHBOARD.NEXT_ROUND);
		});

		test('has no payload', () => {
			expect.assertions(1);

			const payload = '__should_not_be_added__';
			const result = nextRound(payload);

			expect(result.payload).not.toBeDefined();
		});
	});

	describe('setRounds()', () => {
		test('has correct type', () => {
			expect.assertions(1);

			const result = setRounds();
			expect(result.type).toEqual(DASHBOARD.SET_ROUNDS);
		});

		test('has correct payload', () => {
			expect.assertions(1);

			const payload = '__payload__';
			const result = setRounds(payload);

			expect(result.payload).toEqual(payload);
		});
	});

	describe('setWinner()', () => {
		test('has correct type', () => {
			expect.assertions(1);

			const result = setWinner();
			expect(result.type).toEqual(DASHBOARD.SET_WINNER);
		});

		test('has correct payload', () => {
			expect.assertions(1);

			const payload = '__payload__';
			const result = setWinner(payload);

			expect(result.payload).toEqual(payload);
		});
	});
});
