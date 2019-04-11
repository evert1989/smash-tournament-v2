// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { PLAYER } from './actionTypes';
// $FlowFixMe
import { type TAction } from '../../../../constants/global-types';

// Actions
// ---------------------------------------------------------------------------------------------------------------------
export const joinGame = (player: {
	id: string,
	name: string,
	gameID: string,
}): TAction => ({
	payload: player,
	type: PLAYER.JOIN,
});

export const playerEliminated = (player: string): TAction => ({
	payload: player,
	type: PLAYER.ELIMINATED,
});

export const setKnockoutPoints = (id: string, points: number): TAction => ({
	payload: {
		id,
		points,
	},
	type: PLAYER.SET_KNOCKOUT_POINTS,
});

export const updatePoints = (id: string, points: number): TAction => ({
	payload: {
		id,
		points,
	},
	type: PLAYER.UPDATE_POINTS,
});
