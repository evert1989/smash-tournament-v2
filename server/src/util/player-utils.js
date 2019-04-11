// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { actions, store } from '../state/store';

// Utils
// ---------------------------------------------------------------------------------------------------------------------
export const setRoundPoints = (players: Array<string>): void => {
	players.forEach(actions.updatePoints);
};

export const updateEliminated = (id: string): void => {
	const { dashboard } = store.getState();

	// Get winner
	const round = dashboard.rounds[dashboard.currentRound];
	const roundWinner = round.find((player: string): boolean => player !== id);

	// Set points for winner
	actions.setKnockoutPoints(
		roundWinner,
		dashboard.rounds.length - dashboard.currentRound,
	);

	// Eliminate loser
	actions.playerEliminated(store.getState().players.find(player => player.id === id));
};
