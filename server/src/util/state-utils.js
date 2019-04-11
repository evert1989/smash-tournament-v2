// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { actions, store } from '../state/store';
import { generateGame, generateKnockoutLadder, generateRounds } from './game-utils';
import { generateID } from './math-utils';
// $FlowFixMe
import STATES from '../../../constants/states';
// $FlowFixMe
import { type TPlayer } from '../../../constants/global-types';

// Utils
// ---------------------------------------------------------------------------------------------------------------------
export const openLobby = (): void => {
	// Store game id and open lobby
	actions.createGame(generateGame());
	actions.setState(STATES.LOBBY);
};

export const startGame = (): void => {
	// Store generated rounds and start intro
	actions.setRounds(generateRounds(store.getState().dashboard.players));
	actions.setState(STATES.INTRO);
};

export const startRound = (): void => {
	// Start round
	actions.setState(STATES.ROUND);
};

export const nextRound = (): void => {
	// Next round
	actions.nextRound();
	actions.setState(STATES.ROUND);
};

export const createLadder = (): void => {
	const { dashboard, players } = store.getState();

	// Generate roster
	const knockout = generateKnockoutLadder(dashboard.players, players);
	actions.setRounds(knockout);

	// Eliminate players that are not in roster
	// $FlowFixMe
	const eliminatedPlayers = players.filter((player: TPlayer): boolean => knockout.flat().indexOf(player.id) === -1);
	eliminatedPlayers.forEach(actions.playerEliminated);

	// Show ladder
	actions.setState(STATES.LADDER);
};

export const startKnockout = (): void => {
	// Start knockout round
	actions.setState(STATES.KNOCKOUT);
};

export const nextKnockout = (): void => {
	// Next round
	actions.nextRound();
	actions.setState(STATES.KNOCKOUT);
};

export const showWinner = (): void => {
	const { players } = store.getState();

	// Show winner
	actions.setWinner(players.find(player => !player.eliminated));
	actions.setState(STATES.WINNER);
};

export const endGame = (): void => {
	// Clear session
	actions.endSession();
	actions.setState(STATES.IDLE);
};

export const playerJoins = (player: TPlayer): void => {
	actions.joinGame({
		id: generateID(),
		...player,
	});
};
