// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as http from 'http';
// $FlowFixMe
import { HOST, PORT } from '../../constants/settings';
// $FlowFixMe
import bodyParser from 'body-parser';
// $FlowFixMe
import compression from 'compression';
// $FlowFixMe
import cors from 'cors';
// $FlowFixMe
import express from 'express';
import { ROOT_PATH } from './constants/paths';
import WebSocketServer from './sockets/WebSocketServer';

// Server
// ---------------------------------------------------------------------------------------------------------------------
const expressServer = express();
const httpServer = http.createServer(expressServer);

// Enable cors
expressServer.use(
	cors({
		methods: ['GET', 'POST'],
		origin: '*',
	}),
);

// Use compression for all request responses
expressServer.use(compression());

// Parse incoming request bodies as JSON
expressServer.use(bodyParser.json());

expressServer.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);

// Accessible paths
expressServer.use('/', express.static(`${ROOT_PATH}/build/dashboard`, { redirect: true }));
expressServer.use('/player', express.static(`${ROOT_PATH}/build/player`, { redirect: true }));
expressServer.use('/static', express.static(`${ROOT_PATH}/static`, { redirect: true }));

expressServer.set('port', PORT);

// Express listeners
httpServer.listen(PORT, () => console.log('SERVER: ready on port', PORT));

// Websockets
// ---------------------------------------------------------------------------------------------------------------------
new WebSocketServer({ server: httpServer }); // eslint-disable-line no-new

// todo: state-utils tests
