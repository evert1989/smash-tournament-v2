// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { createStore } from 'redux';
import mainReducer from '../mainReducer';
import STATES from '../../../../../constants/states';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('MainReducer', () => {
	test('creates a valid store', () => {
		expect.assertions(1);

		const store = createStore(mainReducer);
		const result = store.getState();

		expect(result).toEqual({
			activeState: STATES.IDLE,
			dashboard: {
				currentRound: 0,
				gameID: null,
				players: [],
				rounds: [],
				winner: null,
			},
			players: [],
		});
	});
});
