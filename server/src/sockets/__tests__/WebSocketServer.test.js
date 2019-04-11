// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as stateUtils from '../../util/state-utils';
import { DASHBOARD, PLAYER, SERVER } from '../../../../constants/events';
import STATES from '../../../../constants/states';
import { store } from '../../state/store';
import WebSocket from 'ws';
import WebSocketServer from '../WebSocketServer';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('WebSocketServer', () => {
	const resetStoreMock = store.getState;
	const resetWebSocketMock = WebSocket.Server;

	let clients = [];

	let activeState = null;
	let currentRound = 0;
	let players = [];

	beforeAll(() => {
		store.getState = jest.fn(() => ({
			activeState,
			dashboard: {
				currentRound,
				rounds: [[1, 2, 3, 4], [5, 6, 7, 8]],
			},
			players,
		}));

		WebSocket.Server = jest.fn(() => ({
			clients,
			on: jest.fn(() => {}),
		}));
	});

	afterEach(() => {
		clients = [];

		activeState = null;
		currentRound = 0;
		players = [];
	});

	afterAll(() => {
		store.getState = resetStoreMock;
		WebSocket.Server = resetWebSocketMock;
	});

	test('creates a webSocketServer', () => {
		expect.assertions(3);

		const wsServer = new WebSocketServer();

		expect(wsServer).toHaveProperty('server');
		expect(wsServer).toHaveProperty('previousState');
		expect(wsServer).toHaveProperty('handleSocketMessage');
	});

	test('handleStoreChange() sends message when state changes', () => {
		expect.assertions(2);

		const wsServer = new WebSocketServer();
		const spy = jest.spyOn(wsServer, 'send');

		activeState = STATES.LOBBY;
		wsServer.handleStoreChange();

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(SERVER.STATE, store.getState());

		spy.mockRestore();
	});

	test('handleStoreChange() stores previous state', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();

		activeState = STATES.LOBBY;
		wsServer.handleStoreChange();

		expect(wsServer.previousState).toEqual(activeState);
	});

	test('handleStoreChange() does not send message when state is the same', () => {
		expect.assertions(1);

		activeState = STATES.LOBBY;

		const wsServer = new WebSocketServer();
		const spy = jest.spyOn(wsServer, 'send');

		activeState = STATES.LOBBY;
		wsServer.handleStoreChange();

		expect(spy).not.toHaveBeenCalled();

		spy.mockRestore();
	});

	test('handleStoreChange() does send message when state is the same and is round', () => {
		expect.assertions(2);

		activeState = STATES.ROUND;

		const wsServer = new WebSocketServer();
		const spy = jest.spyOn(wsServer, 'send');

		activeState = STATES.ROUND;
		wsServer.handleStoreChange();

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(SERVER.STATE, store.getState());

		spy.mockRestore();
	});

	test('handleStoreChange() does send message when state is the same and is knockout', () => {
		expect.assertions(2);

		activeState = STATES.KNOCKOUT;

		const wsServer = new WebSocketServer();
		const spy = jest.spyOn(wsServer, 'send');

		activeState = STATES.KNOCKOUT;
		wsServer.handleStoreChange();

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(SERVER.STATE, store.getState());

		spy.mockRestore();
	});

	test('handleConnection() sends state when clients connects', () => {
		expect.assertions(2);

		const wsServer = new WebSocketServer();
		const spy = jest.spyOn(wsServer, 'send');

		const client = { on: () => {} };

		wsServer.handleConnection(client);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(SERVER.HEARTBEAT, store.getState());

		spy.mockRestore();
	});

	test('handleSocketMessage() does nothing when no message', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();
		const spy = jest.spyOn(JSON, 'parse');

		wsServer.handleSocketMessage();

		expect(spy).not.toHaveBeenCalled();

		spy.mockRestore();
	});

	test('handleSocketMessage() opens lobby', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();
		const mockRestore = stateUtils.openLobby;

		stateUtils.openLobby = jest.fn();

		wsServer.handleSocketMessage(`{"event":"${DASHBOARD.OPEN_LOBBY}","data":{}}`);

		expect(stateUtils.openLobby).toHaveBeenCalledTimes(1);

		stateUtils.openLobby = mockRestore;
	});

	test('handleSocketMessage() starts game', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();
		const mockRestore = stateUtils.startGame;

		stateUtils.startGame = jest.fn();

		wsServer.handleSocketMessage(`{"event":"${DASHBOARD.START_GAME}","data":{}}`);

		expect(stateUtils.startGame).toHaveBeenCalledTimes(1);

		stateUtils.startGame = mockRestore;
	});

	test('handleSocketMessage() starts round', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();
		const mockRestore = stateUtils.startRound;

		stateUtils.startRound = jest.fn();

		wsServer.handleSocketMessage(`{"event":"${DASHBOARD.START_ROUND}","data":{}}`);

		expect(stateUtils.startRound).toHaveBeenCalledTimes(1);

		stateUtils.startRound = mockRestore;
	});

	test('handleSocketMessage() nextRound', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();
		const mockRestore = stateUtils.nextRound;

		stateUtils.nextRound = jest.fn();

		wsServer.handleSocketMessage(`{"event":"${DASHBOARD.NEXT_ROUND}","data":[]}`);

		expect(stateUtils.nextRound).toHaveBeenCalledTimes(1);

		stateUtils.nextRound = mockRestore;
	});

	test('handleSocketMessage() createLadder', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();
		const mockRestore = stateUtils.createLadder;

		stateUtils.createLadder = jest.fn();
		currentRound = 1;

		wsServer.handleSocketMessage(`{"event":"${DASHBOARD.NEXT_ROUND}","data":[]}`);

		expect(stateUtils.createLadder).toHaveBeenCalledTimes(1);

		stateUtils.createLadder = mockRestore;
	});

	test('handleSocketMessage() start knockout', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();
		const mockRestore = stateUtils.startKnockout;

		stateUtils.startKnockout = jest.fn();

		wsServer.handleSocketMessage(`{"event":"${DASHBOARD.START_KNOCKOUT}","data":{}}`);

		expect(stateUtils.startKnockout).toHaveBeenCalledTimes(1);

		stateUtils.startKnockout = mockRestore;
	});

	test('handleSocketMessage() next knockout', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();
		const mockRestore = stateUtils.nextKnockout;

		stateUtils.nextKnockout = jest.fn();

		wsServer.handleSocketMessage(`{"event":"${DASHBOARD.NEXT_KNOCKOUT}","data":{}}`);

		expect(stateUtils.nextKnockout).toHaveBeenCalledTimes(1);

		stateUtils.nextKnockout = mockRestore;
	});

	test('handleSocketMessage() knockout create ladder', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();
		const mockRestore = stateUtils.createLadder;

		stateUtils.createLadder = jest.fn();
		currentRound = 1;

		wsServer.handleSocketMessage(`{"event":"${DASHBOARD.NEXT_KNOCKOUT}","data":{}}`);

		expect(stateUtils.createLadder).toHaveBeenCalledTimes(1);

		stateUtils.createLadder = mockRestore;
	});

	test('handleSocketMessage() knockout show winner', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();
		const mockRestore = stateUtils.showWinner;

		stateUtils.showWinner = jest.fn();
		currentRound = 1;

		players = [
			{
				eliminated: false,
				id: 1,
				name: '__test__',
			},
		];

		wsServer.handleSocketMessage(`{"event":"${DASHBOARD.NEXT_KNOCKOUT}","data":{}}`);

		expect(stateUtils.showWinner).toHaveBeenCalledTimes(1);

		stateUtils.showWinner = mockRestore;
	});

	test('handleSocketMessage() ends game', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();
		const mockRestore = stateUtils.endGame;

		stateUtils.endGame = jest.fn();

		wsServer.handleSocketMessage(`{"event":"${DASHBOARD.END_GAME}","data":{}}`);

		expect(stateUtils.endGame).toHaveBeenCalledTimes(1);

		stateUtils.endGame = mockRestore;
	});

	test('handleSocketMessage() lets player join', () => {
		expect.assertions(3);

		const wsServer = new WebSocketServer();
		const mockRestore = stateUtils.playerJoins;
		const spy = jest.spyOn(wsServer, 'send');

		stateUtils.playerJoins = jest.fn();
		activeState = STATES.LOBBY;

		wsServer.handleSocketMessage(`{"event":"${PLAYER.JOIN}","data":{}}`);

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(SERVER.PLAYER_JOINS, store.getState());
		expect(stateUtils.playerJoins).toHaveBeenCalledTimes(1);

		stateUtils.playerJoins = mockRestore;
	});

	test('handleSocketMessage() lets player not join if not lobby', () => {
		expect.assertions(1);

		const wsServer = new WebSocketServer();
		const mockRestore = stateUtils.playerJoins;

		stateUtils.playerJoins = jest.fn();

		wsServer.handleSocketMessage(`{"event":"${PLAYER.JOIN}","data":{}}`);

		expect(stateUtils.playerJoins).not.toHaveBeenCalled();

		stateUtils.playerJoins = mockRestore;
	});

	test('handleSocketMessage() does nothing for invalid event', () => {
		expect.assertions(8);

		activeState = STATES.LOBBY;
		const wsServer = new WebSocketServer();

		const spies = [
			jest.spyOn(stateUtils, 'openLobby'),
			jest.spyOn(stateUtils, 'startGame'),
			jest.spyOn(stateUtils, 'startRound'),
			jest.spyOn(stateUtils, 'nextRound'),
			jest.spyOn(stateUtils, 'startKnockout'),
			jest.spyOn(stateUtils, 'nextKnockout'),
			jest.spyOn(stateUtils, 'endGame'),
			jest.spyOn(stateUtils, 'playerJoins'),
		];

		wsServer.handleSocketMessage('{"event":"__INVALID__","data":{}}');

		spies.forEach((spy) => {
			expect(spy).not.toHaveBeenCalled();

			spy.mockRestore();
		});
	});

	test('send() sends message to client', () => {
		expect.assertions(4);

		const client1 = { send: jest.fn() };
		const client2 = { send: jest.fn() };
		clients.push(client1, client2);

		const wsServer = new WebSocketServer();
		const event = '__event__';
		const data = '__data__';

		wsServer.send(event, data);

		expect(client1.send).toHaveBeenCalledTimes(1);
		expect(client1.send).toHaveBeenCalledWith(`{"data":"${data}","event":"${event}"}`);
		expect(client2.send).toHaveBeenCalledTimes(1);
		expect(client2.send).toHaveBeenCalledWith(`{"data":"${data}","event":"${event}"}`);
	});
});
