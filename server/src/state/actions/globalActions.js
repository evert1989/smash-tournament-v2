// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { GLOBAL } from './actionTypes';
// $FlowFixMe
import { type TAction } from '../../../../constants/global-types';

// Actions
// ---------------------------------------------------------------------------------------------------------------------
export const endSession = (): TAction => ({
	type: GLOBAL.RESET,
});

export const setState = (state: string): TAction => ({
	payload: state,
	type: GLOBAL.SET_STATE,
});
