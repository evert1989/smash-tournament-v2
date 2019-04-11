// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
// $FlowFixMe
import { type TPlayer } from '../../../../constants/global-types';

// Utils
// ---------------------------------------------------------------------------------------------------------------------
export const getPlayerByID = (players: Array<TPlayer>, id: string): ?TPlayer => (
	players
		? players.find(player => player.id === id)
		: undefined
);

export const getLadderPlayer = (
	index: number,
	players: Array<TPlayer>,
	rounds: Array<Array<string>>,
	targetIndex: number,
	playerIndex: number,
): ?TPlayer => {
	const isValidRound = !!(rounds && rounds[targetIndex] && rounds[targetIndex][playerIndex] && index === 0);

	return isValidRound ? getPlayerByID(players, rounds[targetIndex][playerIndex]) : undefined;
};
