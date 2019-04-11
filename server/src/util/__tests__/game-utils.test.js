// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
	calculateTotalRounds,
	generateGame,
	generateKnockoutLadder,
	generateRounds,
} from '../game-utils';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('GameUtils', () => {
	const generatePlayers = n => [...Array(n)].map((a, i) => ({
		eliminated: false,
		id: i,
		points: i,
	}));

	const generatePlayerIds = n => [...Array(n)].map((a, i) => i);

	describe('calculateTotalRounds()', () => {
		test('returns correct amount of rounds', () => {
			expect.assertions(5);

			expect(calculateTotalRounds(17, 4)).toBe(17);
			expect(calculateTotalRounds(16, 4)).toBe(4);
			expect(calculateTotalRounds(12, 3)).toBe(4);
			expect(calculateTotalRounds(4, 4)).toBe(3);
			expect(calculateTotalRounds(6, 1)).toBe(6);
		});

		test('returns 0 when invalid arguments', () => {
			expect.assertions(7);

			expect(calculateTotalRounds(2, 4)).toBe(0);
			expect(calculateTotalRounds('6', 4)).toBe(0);
			expect(calculateTotalRounds(2, '1')).toBe(0);
			expect(calculateTotalRounds(0, 2)).toBe(0);
			expect(calculateTotalRounds(-2, 2)).toBe(0);
			expect(calculateTotalRounds(6, 0)).toBe(0);
			expect(calculateTotalRounds(6, -1)).toBe(0);
		});
	});

	describe('generateGame()', () => {
		test('returns 4 digit string', () => {
			expect.assertions(3);

			expect(typeof generateGame()).toBe('string');
			expect(typeof parseInt(generateGame(), 10)).toBe('number');
			expect(generateGame().length).toBe(4);
		});
	});

	describe('generateKnockoutLadder()', () => {
		test('returns a valid knockout ladder', () => {
			expect.assertions(1);

			const players = generatePlayers(8);
			const playerIDs = generatePlayerIds(8);
			const result = generateKnockoutLadder(playerIDs, players);

			expect(result).toEqual([[7, 0], [6, 1], [5, 2], [4, 3]]);
		});

		test('returns a valid knockout ladder with number that is not power of 2', () => {
			expect.assertions(1);

			const players = generatePlayers(12);
			const playerIDs = generatePlayerIds(12);
			const result = generateKnockoutLadder(playerIDs, players);

			expect(result).toEqual([[11, 4], [10, 5], [9, 6], [8, 7]]);
		});

		test('returns a valid knockout ladder with eliminated players', () => {
			expect.assertions(1);

			const players = generatePlayers(12);
			const playerIDs = generatePlayerIds(12);

			players[10].eliminated = true;
			players[4].eliminated = true;

			const result = generateKnockoutLadder(playerIDs, players);

			expect(result).toEqual([[11, 2], [9, 3], [8, 5], [7, 6]]);
		});
	});

	describe('generateRounds()', () => {
		test('returns valid rounds', () => {
			expect.assertions(1);

			const players = generatePlayers(8);
			const result = generateRounds(players);

			const validPlayer = {
				eliminated: false,
				id: expect.any(Number),
				points: expect.any(Number),
			};

			expect(result).toEqual([
				[
					validPlayer,
					validPlayer,
					validPlayer,
					validPlayer,
				], [
					validPlayer,
					validPlayer,
					validPlayer,
					validPlayer,
				], [
					validPlayer,
					validPlayer,
					validPlayer,
					validPlayer,
				], [
					validPlayer,
					validPlayer,
					validPlayer,
					validPlayer,
				]]);
		});

		test('does not have duplicate players in single round', () => {
			expect.assertions(16);

			const players = generatePlayers(8);

			const result = generateRounds(players);
			const rounds = result.map(round => round.map(player => player.id));

			rounds.forEach(round => round.forEach((player, i, r) => {
				expect(r.filter(p => p === player).length).toBe(1);
			}));
		});
	});
});
