// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { digit, getNearestPowerOf2 } from './math-utils';
// $FlowFixMe
import { type TPlayer } from '../../../constants/global-types';

// Utils
// ---------------------------------------------------------------------------------------------------------------------
// Calculations
export const calculateTotalRounds = (players: number, playersPerRound: number): number => {
	let total = 0;
	let counter = 0;
	let remainder = players;

	// return 0 when not enough players or invalid arguments
	if (
		players < playersPerRound
		|| players <= 0
		|| playersPerRound < 1
		|| typeof players !== 'number'
		|| typeof playersPerRound !== 'number'
	) {
		return total;
	}

	// Loop through players until remainder is 0 to get correct amount of rounds
	while (remainder !== 0) {
		counter += 1;
		remainder = (playersPerRound * counter) % players;
	}

	// Make sure that there are at least 3 rounds
	while (total < 3) {
		total += counter;
	}

	return total;
};

// Generators
export const generateGame = (): string => `${digit()}${digit()}${digit()}${digit()}`;

const generateSingleRound = (
	players: Array<TPlayer>,
	playersPerRound: number,
	usedPlayers: Array<TPlayer>,
): {used: Array<TPlayer>, round: Array<TPlayer>} => {
	const round = [];
	let used = [...usedPlayers];

	let targetPlayer;
	let usablePlayers;

	for (let i = 0; i < playersPerRound; i += 1) {
		usablePlayers = players.filter(
			// eslint-disable-next-line no-loop-func
			(player: TPlayer): boolean => used.indexOf(player) === -1 && round.indexOf(player) === -1,
		);

		targetPlayer = usablePlayers[Math.round(Math.random() * (usablePlayers.length - 1))];

		round.push(targetPlayer);
		used = used.length + 1 === players.length ? [] : [...used, targetPlayer];
	}

	return {
		round,
		used,
	};
};

const generateRotations = (players: Array<TPlayer>, playersPerRound: number): Array<Array<TPlayer>> => {
	const totalRounds = calculateTotalRounds(players.length, playersPerRound);
	const rounds = [];
	let usedPlayers = [];

	for (let i = 0; i < totalRounds; i += 1) {
		const { used, round } = generateSingleRound(players, playersPerRound, usedPlayers);

		rounds.push(round);
		usedPlayers = used;
	}

	return rounds;
};

export const generateKnockoutLadder = (playerIDs: Array<string>, players: Array<TPlayer>): Array<Array<string>> => {
	const playersInGame = players
		.filter((player: TPlayer): boolean => playerIDs.indexOf(player.id) !== -1 && !player.eliminated)
		.sort((a: TPlayer, b: TPlayer): number => b.points - a.points)
		.map((player: TPlayer): string => player.id);

	const maxPlayers = getNearestPowerOf2(playersInGame.length);
	const knockoutPlayers = playersInGame.slice(0, maxPlayers);

	const rounds = [];
	let counter = 0;

	for (let i = 0; i < maxPlayers / 2; i += 1) {
		rounds.push([
			knockoutPlayers[counter],
			knockoutPlayers[knockoutPlayers.length - counter - 1],
		]);

		counter += 1;
	}

	return rounds;
};

export const generateRounds = (players: Array<TPlayer>): Array<Array<TPlayer>> => generateRotations(players, 4);
