// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { DASHBOARD } from './actionTypes';
// $FlowFixMe
import { type TAction } from '../../../../constants/global-types';

// Actions
// ---------------------------------------------------------------------------------------------------------------------
export const createGame = (id: string): TAction => ({
	payload: id,
	type: DASHBOARD.CREATE,
});

export const nextRound = (): TAction => ({
	type: DASHBOARD.NEXT_ROUND,
});

export const setRounds = (rounds: Array<Array<string>>): TAction => ({
	payload: rounds,
	type: DASHBOARD.SET_ROUNDS,
});

export const setWinner = (id: number): TAction => ({
	payload: id,
	type: DASHBOARD.SET_WINNER,
});
