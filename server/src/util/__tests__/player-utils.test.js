// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { actions, store } from '../../state/store';
import { setRoundPoints, updateEliminated } from '../player-utils';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('PlayerUtils', () => {
	const storeMockReset = store.getState;

	beforeAll(() => {
		store.getState = jest.fn(() => ({
			dashboard: {
				currentRound: 0,
				rounds: [['a', 'b'], ['c', 'd']],
			},
			players: [
				{
					eliminated: false,
					id: 'a',
				},
				{
					eliminated: false,
					id: 'b',
				},
			],
		}));
	});

	afterAll(() => {
		store.getState.mockRestore();
		store.getState = storeMockReset;
	});

	test('setRoundPoints() calls correct action with correct arguments', () => {
		const spy = jest.spyOn(actions, 'updatePoints');

		setRoundPoints(['a', 'b']);

		expect(spy).toHaveBeenCalledTimes(2);
		expect(spy).nthCalledWith(1, 'a', 0, ['a', 'b']);
		expect(spy).nthCalledWith(2, 'b', 1, ['a', 'b']);

		spy.mockRestore();
	});

	test('updateEliminated() calls correct action to update points with correct arguments', () => {
		const spy = jest.spyOn(actions, 'setKnockoutPoints');

		updateEliminated('a');

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith('b', 2);

		spy.mockRestore();
	});

	test('updateEliminated() calls correct action to eliminate with correct arguments', () => {
		const spy = jest.spyOn(actions, 'playerEliminated');

		updateEliminated('a');

		expect(spy).toHaveBeenCalledTimes(1);

		expect(spy).toHaveBeenCalledWith({
			eliminated: false,
			id: 'a',
		});

		spy.mockRestore();
	});
});
