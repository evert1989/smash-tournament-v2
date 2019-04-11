// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { GLOBAL, PLAYER } from '../../actions/actionTypes';
import playerReducer from '../playerReducer';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('PlayerReducer', () => {
	const defaultState = [];

	const player = {
		eliminated: false,
		gameID: '__gameID__',
		id: 0,
		imageIndex: 0,
		name: '__name__',
		points: 0,
	};

	test('returns state', () => {
		expect.assertions(1);

		const result = playerReducer();
		expect(result).toEqual(defaultState);
	});

	test('returns state when invalid action', () => {
		expect.assertions(1);

		const action = { type: '__invalid__' };
		const result = playerReducer(undefined, action);

		expect(result).toEqual(defaultState);
	});

	test('resets to defaultState', () => {
		expect.assertions(1);

		const action = { type: GLOBAL.RESET };
		const result = playerReducer(['__player__'], action);

		expect(result).toEqual(defaultState);
	});

	test('adds player', () => {
		expect.assertions(1);

		const action = {
			payload: {
				gameID: '__gameID__',
				id: '__id__',
				imageIndex: '__imageIndex__',
				name: '__name__',
			},
			type: PLAYER.JOIN,
		};

		const result = playerReducer(undefined, action);

		expect(result).toEqual([
			{
				...action.payload,
				eliminated: false,
				points: 0,
			},
		]);
	});

	test('updates player points', () => {
		expect.assertions(1);

		const action = {
			payload: {
				id: 0,
				points: 1,
			},
			type: PLAYER.UPDATE_POINTS,
		};

		const result = playerReducer([player], action);

		expect(result).toEqual([
			{
				...player,
				points: player.points + action.payload.points,
			},
		]);
	});

	test('does not update player points when wrong id', () => {
		expect.assertions(1);

		const action = {
			payload: {
				id: 1,
				points: 1,
			},
			type: PLAYER.UPDATE_POINTS,
		};

		const result = playerReducer([player], action);

		expect(result).toEqual([player]);
	});

	test('does not update player points when no points', () => {
		expect.assertions(1);

		const action = {
			payload: { id: 0 },
			type: PLAYER.UPDATE_POINTS,
		};

		const result = playerReducer([player], action);

		expect(result).toEqual([player]);
	});

	test('eliminates player', () => {
		expect.assertions(1);

		const action = {
			payload: { id: 0 },
			type: PLAYER.ELIMINATED,
		};

		const result = playerReducer([player], action);

		expect(result).toEqual([
			{
				...player,
				eliminated: true,
			},
		]);
	});

	test('does not eliminate player when wrong id', () => {
		expect.assertions(1);

		const action = {
			payload: { id: 1 },
			type: PLAYER.ELIMINATED,
		};

		const result = playerReducer([player], action);

		expect(result).toEqual([player]);
	});

	test('updates player knockout points', () => {
		expect.assertions(1);

		const action = {
			payload: {
				id: 0,
				points: 5,
			},
			type: PLAYER.SET_KNOCKOUT_POINTS,
		};

		const result = playerReducer([{
			...player,
			points: 6,
		}], action);

		expect(result).toEqual([
			{
				...player,
				points: action.payload.points,
			},
		]);
	});

	test('does not update player knockout points when wrong id', () => {
		expect.assertions(1);

		const action = {
			payload: {
				id: 1,
				points: 5,
			},
			type: PLAYER.SET_KNOCKOUT_POINTS,
		};

		const result = playerReducer([player], action);

		expect(result).toEqual([player]);
	});

	test('does not update player knockout points when no points', () => {
		expect.assertions(1);

		const action = {
			payload: { id: 0 },
			type: PLAYER.SET_KNOCKOUT_POINTS,
		};

		const result = playerReducer([player], action);

		expect(result).toEqual([player]);
	});
});
