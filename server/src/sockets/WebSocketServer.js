// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as stateUtils from '../util/state-utils';
// $FlowFixMe
import { DASHBOARD, PLAYER, SERVER } from '../../../constants/events';
import { setRoundPoints, updateEliminated } from '../util/player-utils';
// $FlowFixMe
import { PORTS } from '../../../constants/settings';
// $FlowFixMe
import STATES from '../../../constants/states';
import { store } from '../state/store';
// $FlowFixMe
import { type TPlayer } from '../../../constants/global-types';
// $FlowFixMe
import WebSocket from 'ws';

// WebSocketServer
// ---------------------------------------------------------------------------------------------------------------------
class WebSocketServer {
	server: any;

	previousState: string;

	constructor(props: any): void {
		this.server = new WebSocket.Server({
			server: props.server,
		});

		// Setup socket listeners
		this.server.on('connection', this.handleConnection);

		// Subscribe to redux store
		this.previousState = store.getState().activeState;
		store.subscribe(this.handleStoreChange);
	}

	handleStoreChange = (): void => {
		const { activeState } = store.getState();

		// Only update if state has actually changed
		if (
			this.previousState !== activeState
			|| activeState === STATES.ROUND
			|| activeState === STATES.KNOCKOUT
		) {
			this.previousState = activeState;
			this.send(SERVER.STATE, store.getState());
		}
	};

	handleConnection = (client: WebSocket): void => {
		// Set current status to connected client
		this.send(SERVER.HEARTBEAT, store.getState());

		// Add listeners to client
		client.on('message', this.handleSocketMessage);
	};

	handleSocketMessage = (message: string): void => {
		if (!message) {
			return;
		}

		const { event, data } = JSON.parse(message);
		const { activeState } = store.getState();

		switch (event) {
			case DASHBOARD.OPEN_LOBBY:
				// create lobby where players can join
				stateUtils.openLobby();
				break;

			case DASHBOARD.START_GAME:
				// create roster
				stateUtils.startGame();
				break;

			case DASHBOARD.START_ROUND:
				// Start first round
				stateUtils.startRound();
				break;

			case DASHBOARD.NEXT_ROUND:
				// Update player points
				setRoundPoints(data);

				// Then, start next round or if all rounds are done, create knockout ladder
				if (store.getState().dashboard.currentRound < store.getState().dashboard.rounds.length - 1) {
					stateUtils.nextRound();
				} else {
					stateUtils.createLadder();
				}

				break;

			case DASHBOARD.START_KNOCKOUT:
				// Start the first knockout round
				stateUtils.startKnockout();
				break;

			case DASHBOARD.NEXT_KNOCKOUT:
				// Updated eliminated players
				updateEliminated(data);

				// Then, start next knockout round, or create next ladder until there is 1 player left
				if (store.getState().dashboard.currentRound < store.getState().dashboard.rounds.length - 1) {
					stateUtils.nextKnockout();
				} else if (
					store.getState().players.filter((player: TPlayer): boolean => !player.eliminated).length !== 1
				) {
					stateUtils.createLadder();
				} else {
					stateUtils.showWinner();
				}

				break;

			case DASHBOARD.END_GAME:
				// Clear game and go back to idle
				stateUtils.endGame();
				break;

			case PLAYER.JOIN:
				// Only allow players joining when lobby is open
				if (activeState === STATES.LOBBY) {
					stateUtils.playerJoins(data);
					this.send(SERVER.PLAYER_JOINS, store.getState());
				}

				break;

			default:
				// Do nothing
				break;
		}
	};

	send(event: string, data: any): void {
		this.server.clients.forEach((client: WebSocket): void => {
			client.send(JSON.stringify({
				data,
				event,
			}));
		});
	}
}

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default WebSocketServer;
