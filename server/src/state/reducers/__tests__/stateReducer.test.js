// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { GLOBAL } from '../../actions/actionTypes';
import stateReducer from '../stateReducer';
import STATES from '../../../../../constants/states';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('StateReducer', () => {
	const defaultState = STATES.IDLE;

	test('returns state', () => {
		expect.assertions(1);

		const result = stateReducer();
		expect(result).toEqual(defaultState);
	});

	test('returns state when invalid action', () => {
		expect.assertions(1);

		const action = { type: '__invalid__' };
		const result = stateReducer(undefined, action);

		expect(result).toEqual(defaultState);
	});

	test('resets to defaultProps', () => {
		expect.assertions(1);

		const action = { type: GLOBAL.RESET };
		const result = stateReducer('__state__', action);

		expect(result).toEqual(defaultState);
	});

	test('updates state', () => {
		expect.assertions(1);

		const action = {
			payload: '__payload__',
			type: GLOBAL.SET_STATE,
		};

		const result = stateReducer(undefined, action);

		expect(result).toEqual(action.payload);
	});

	test('reset state when no payload', () => {
		expect.assertions(1);

		const action = { type: GLOBAL.SET_STATE };
		const result = stateReducer('__state__', action);

		expect(result).toEqual(defaultState);
	});
});
