// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
// $FlowFixMe
import bodyParser from 'body-parser';
// $FlowFixMe
import compression from 'compression';
// $FlowFixMe
import cors from 'cors';
// $FlowFixMe
import express from 'express';
// $FlowFixMe
import { PORTS } from '../../constants/settings';
import { ROOT_PATH } from './constants/paths';
import WebSocketServer from './sockets/WebSocketServer';

// Server
// ---------------------------------------------------------------------------------------------------------------------
const expressServer = express();

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

// Express listeners
expressServer.listen(PORTS.EXPRESS_PORT, () => console.log('SERVER: ready on port', PORTS.EXPRESS_PORT));

// Websockets
// ---------------------------------------------------------------------------------------------------------------------
new WebSocketServer(); // eslint-disable-line no-new

// todo: state-utils tests
