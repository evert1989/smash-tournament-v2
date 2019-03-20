"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
class WebsocketServer {
    constructor(server) {
        this.handleSocketConnection = (socket) => {
            console.log('socket connected');
        };
        this.io = socket_io_1.default(server);
        this.io.on('connection', this.handleSocketConnection);
    }
}
exports.WebsocketServer = WebsocketServer;
