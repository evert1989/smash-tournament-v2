// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { GLOBAL } from '../actions/actionTypes';
// $FlowFixMe
import STATES from '../../../../constants/states';
// $FlowFixMe
import { type TAction } from '../../../../constants/global-types';

// Reducer
// ---------------------------------------------------------------------------------------------------------------------
const stateReducer = (state: string = STATES.IDLE, action: TAction): string => {
	if (!action) {
		return state;
	}

	switch (action.type) {
		case GLOBAL.RESET:
			return STATES.IDLE;

		case GLOBAL.SET_STATE:
			return action.payload || STATES.IDLE;

		default:
			return state;
	}
};

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default stateReducer;
