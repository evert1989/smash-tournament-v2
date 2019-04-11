// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { DASHBOARD, GLOBAL, PLAYER } from '../../actions/actionTypes';
import dashboardReducer from '../dashboardReducer';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('DashboardReducer', () => {
	const defaultState = {
		currentRound: 0,
		gameID: null,
		players: [],
		rounds: [],
		winner: null,
	};

	test('returns state', () => {
		expect.assertions(1);

		const result = dashboardReducer();
		expect(result).toEqual(defaultState);
	});

	test('returns state when invalid action', () => {
		expect.assertions(1);

		const action = { type: '__invalid__' };
		const result = dashboardReducer(undefined, action);

		expect(result).toEqual(defaultState);
	});

	test('resets to defaultState', () => {
		expect.assertions(1);

		const action = { type: GLOBAL.RESET };

		const result = dashboardReducer({
			currentRound: 1,
			gameID: 1,
			players: 1,
			rounds: 1,
			winner: 1,
		}, action);

		expect(result).toEqual(defaultState);
	});

	test('sets gameID from payload', () => {
		expect.assertions(1);

		const action = {
			payload: '__payload__',
			type: DASHBOARD.CREATE,
		};

		const result = dashboardReducer(undefined, action);

		expect(result).toEqual({
			...defaultState,
			gameID: action.payload,
		});
	});

	test('sets gameID to null if no payload', () => {
		expect.assertions(1);

		const action = { type: DASHBOARD.CREATE };

		const result = dashboardReducer({
			...defaultState,
			gameID: '__ID__',
		}, action);

		expect(result).toEqual({
			...defaultState,
			gameID: null,
		});
	});

	test('sets rounds from payload', () => {
		expect.assertions(1);

		const action = {
			payload: '__payload__',
			type: DASHBOARD.SET_ROUNDS,
		};

		const result = dashboardReducer(undefined, action);

		expect(result).toEqual({
			...defaultState,
			rounds: action.payload,
		});
	});

	test('sets rounds to [] if no payload', () => {
		expect.assertions(1);

		const action = { type: DASHBOARD.SET_ROUNDS };

		const result = dashboardReducer({
			...defaultState,
			rounds: '__ROUNDS__',
		}, action);

		expect(result).toEqual({
			...defaultState,
			rounds: [],
		});
	});

	test('updates currentRound by 1', () => {
		expect.assertions(1);

		const action = { type: DASHBOARD.NEXT_ROUND };

		const result = dashboardReducer(undefined, action);

		expect(result).toEqual({
			...defaultState,
			currentRound: defaultState.currentRound + 1,
		});
	});

	test('sets winner from payload', () => {
		expect.assertions(1);

		const action = {
			payload: { id: '__payload__' },
			type: DASHBOARD.SET_WINNER,
		};

		const result = dashboardReducer(undefined, action);

		expect(result).toEqual({
			...defaultState,
			winner: action.payload.id,
		});
	});

	test('sets winner to null if no payload', () => {
		expect.assertions(1);

		const action = { type: DASHBOARD.SET_WINNER };

		const result = dashboardReducer({
			...defaultState,
			winner: '__WINNER__',
		}, action);

		expect(result).toEqual({
			...defaultState,
			winner: null,
		});
	});

	test('adds player from payload', () => {
		expect.assertions(1);

		const gameID = '1234';

		const action = {
			payload: {
				gameID,
				id: '__ID__',
			},
			type: PLAYER.JOIN,
		};

		const result = dashboardReducer({
			...defaultState,
			gameID,
		}, action);

		expect(result.players).toEqual([action.payload.id]);
	});

	test('does not add player from payload when wrong gameID', () => {
		expect.assertions(1);

		const gameID = '1234';

		const action = {
			payload: {
				gameID: '4567',
				id: '__ID__',
			},
			type: PLAYER.JOIN,
		};

		const result = dashboardReducer({
			...defaultState,
			gameID,
		}, action);

		expect(result.players).toEqual([]);
	});

	test('does not add player from payload when no id', () => {
		expect.assertions(1);

		const gameID = '1234';

		const action = {
			payload: { gameID },
			type: PLAYER.JOIN,
		};

		const result = dashboardReducer({
			...defaultState,
			gameID,
		}, action);

		expect(result.players).toEqual([]);
	});

	test('does not add player when no payload', () => {
		expect.assertions(1);

		const action = { type: PLAYER.JOIN };

		const result = dashboardReducer({
			...defaultState,
			gameID: '1234',
		}, action);

		expect(result.players).toEqual([]);
	});
});
