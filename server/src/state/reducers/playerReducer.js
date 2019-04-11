// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { GLOBAL, PLAYER } from '../actions/actionTypes';
// $FlowFixMe
import { type TAction, type TPlayer } from '../../../../constants/global-types';

// Reducer
// ---------------------------------------------------------------------------------------------------------------------
const playerReducer = (state: Array<TPlayer> = [], action: TAction): Array<TPlayer> => {
	if (!action) {
		return state;
	}

	switch (action.type) {
		case GLOBAL.RESET:
			return [];

		case PLAYER.JOIN:
			return [
				...state,
				{
					...action.payload,
					eliminated: false,
					points: 0,
				},
			];

		case PLAYER.UPDATE_POINTS:
			return state.map((player: TPlayer) => {
				const updatedPlayer = { ...player };

				if (action.payload && player.id === action.payload.id) {
					updatedPlayer.points += action.payload.points ? parseInt(action.payload.points, 10) : 0;
				}

				return updatedPlayer;
			});

		case PLAYER.ELIMINATED:
			return state.map((player: TPlayer) => {
				const updatedPlayer = { ...player };

				if (action.payload && player.id === action.payload.id) {
					updatedPlayer.eliminated = true;
				}

				return updatedPlayer;
			});

		case PLAYER.SET_KNOCKOUT_POINTS:
			return state.map((player: TPlayer) => {
				const updatedPlayer = { ...player };

				if (action.payload && player.id === action.payload.id) {
					updatedPlayer.points = action.payload.points ? parseInt(action.payload.points, 10) : 0;
				}

				return updatedPlayer;
			});

		default:
			return state;
	}
};

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default playerReducer;
