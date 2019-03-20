"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const WebsocketServer_1 = require("./components/WebsocketServer");
const settings_1 = require("./constants/settings");
// Express Server
const app = express_1.default();
const server = new http_1.default.Server(app);
app.get('/', (req, res) => { res.send('Hello, World!'); });
server.listen(settings_1.EXPRESS_PORT, () => { console.log('server started on port:', settings_1.EXPRESS_PORT); });
// Websocket Server
const websocketServer = new WebsocketServer_1.WebsocketServer(server);
// Redux
