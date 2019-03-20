import express from 'express';
import http from 'http';
import { WebsocketServer } from './components/WebsocketServer';
import { EXPRESS_PORT } from './constants/settings';

// Express Server
const app = express();
const server = new http.Server(app);

app.get('/', (req, res) => { res.send('Hello, World!')});
server.listen(EXPRESS_PORT, () => { console.log('server started on port:', EXPRESS_PORT)});

// Websocket Server
const websocketServer = new WebsocketServer(server);

// Redux