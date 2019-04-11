// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { getLadderPlayer, getPlayerByID } from '../player-utils';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('Player utils', () => {
	const players = [
		{
			id: 'a',
			name: 'abc',
		},
		{
			id: 'b',
			name: 'def',
		},
	];

	const rounds = [
		[
			'a',
			'b',
		],
		[
			'c',
			'd',
		],
	];

	test('getLadderPlayer() returns correct player', () => {
		expect.assertions(1);

		const playerIndex = 0;
		const player = getLadderPlayer(0, players, rounds, 0, playerIndex);

		expect(player).toEqual(players[playerIndex]);
	});

	test('getLadderPlayer() returns undefined if not current round', () => {
		expect.assertions(1);

		const playerIndex = 0;
		const player = getLadderPlayer(1, players, rounds, 0, playerIndex);

		expect(player).not.toBeDefined();
	});

	test('getLadderPlayer() returns undefined if player in round is not found', () => {
		expect.assertions(1);

		const player = getLadderPlayer(0, players, rounds, 0, 3);

		expect(player).not.toBeDefined();
	});

	test('getLadderPlayer() returns undefined if round is not found', () => {
		expect.assertions(1);

		const player = getLadderPlayer(0, players, rounds, 3, 0);

		expect(player).not.toBeDefined();
	});

	test('getLadderPlayer() returns undefined if rounds is undefined', () => {
		expect.assertions(1);

		const player = getLadderPlayer(0, players, undefined, 0, 0);

		expect(player).not.toBeDefined();
	});

	test('getPlayerByID() returns player object when id matches', () => {
		expect.assertions(1);

		const id = 'a';
		const result = getPlayerByID(players, id);

		expect(result).toEqual(players[0]);
	});

	test('getPlayerByID() returns undefined when id does not match', () => {
		expect.assertions(1);

		const id = '__invalid__';
		const result = getPlayerByID(players, id);

		expect(result).not.toBeDefined();
	});

	test('getPlayerByID() returns undefined when players is not valid', () => {
		expect.assertions(1);

		const id = '__invalid__';
		const result = getPlayerByID(undefined, id);

		expect(result).not.toBeDefined();
	});
});
