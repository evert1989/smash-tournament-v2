// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
	joinGame,
	playerEliminated,
	setKnockoutPoints,
	updatePoints,
} from '../playerActions';

import { PLAYER } from '../actionTypes';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('PlayerActions', () => {
	describe('joinGame()', () => {
		test('has correct type', () => {
			expect.assertions(1);

			const result = joinGame();
			expect(result.type).toEqual(PLAYER.JOIN);
		});

		test('has correct payload', () => {
			expect.assertions(1);

			const payload = '__payload__';
			const result = joinGame(payload);

			expect(result.payload).toEqual(payload);
		});
	});

	describe('setKnockoutPoints()', () => {
		test('has correct type', () => {
			expect.assertions(1);

			const result = playerEliminated();
			expect(result.type).toEqual(PLAYER.ELIMINATED);
		});

		test('has correct payload', () => {
			expect.assertions(1);

			const payload = '__payload__';
			const result = playerEliminated(payload);

			expect(result.payload).toEqual(payload);
		});
	});

	describe('setKnockoutPoints()', () => {
		test('has correct type', () => {
			expect.assertions(1);

			const result = setKnockoutPoints();
			expect(result.type).toEqual(PLAYER.SET_KNOCKOUT_POINTS);
		});

		test('has correct payload', () => {
			expect.assertions(1);

			const id = '__payload__';
			const points = '__points__';
			const result = setKnockoutPoints(id, points);

			expect(result.payload).toEqual({
				id,
				points,
			});
		});
	});

	describe('updatePoints()', () => {
		test('has correct type', () => {
			expect.assertions(1);

			const result = updatePoints();
			expect(result.type).toEqual(PLAYER.UPDATE_POINTS);
		});

		test('has correct payload', () => {
			expect.assertions(1);

			const id = '__payload__';
			const points = '__points__';
			const result = updatePoints(id, points);

			expect(result.payload).toEqual({
				id,
				points,
			});
		});
	});
});
