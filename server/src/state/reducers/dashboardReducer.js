// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { DASHBOARD, GLOBAL, PLAYER } from '../actions/actionTypes';
// $FlowFixMe
import { type TAction } from '../../../../constants/global-types';

// Types
// ---------------------------------------------------------------------------------------------------------------------
type TState = {
	gameID: string | null,
	players: Array<string>,
	rounds: Array<Array<string>>,
	currentRound: number,
	winner: string | null,
};

// Reducer
// ---------------------------------------------------------------------------------------------------------------------
const defaultState = {
	currentRound: 0,
	gameID: null,
	players: [],
	rounds: [],
	winner: null,
};

const dashboardReducer = (state: TState = defaultState, action: TAction): TState => {
	if (!action) {
		return defaultState;
	}

	switch (action.type) {
		case GLOBAL.RESET:
			return defaultState;

		case DASHBOARD.CREATE:
			return {
				...state,
				gameID: action.payload || null,
			};

		case DASHBOARD.SET_ROUNDS:
			return {
				...state,
				currentRound: 0,
				rounds: action.payload || [],
			};

		case DASHBOARD.NEXT_ROUND:
			return {
				...state,
				currentRound: state.currentRound + 1,
			};

		case DASHBOARD.SET_WINNER:
			return {
				...state,
				winner: action.payload ? action.payload.id : null,
			};

		case PLAYER.JOIN:
			if (!action.payload || !action.payload.id) {
				return state;
			}

			return state.gameID !== action.payload.gameID
				? state
				: {
					...state,
					players: [
						...state.players,
						action.payload.id,
					],
				};

		default:
			return state;
	}
};

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default dashboardReducer;
