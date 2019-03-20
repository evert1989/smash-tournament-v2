
import socketIo from 'socket.io';

export class WebsocketServer {
    private io: any;

    constructor(server: any) {
        this.io = socketIo(server);

        this.io.on('connection', this.handleSocketConnection);
    }

    private handleSocketConnection = (socket: any) => {
        console.log('socket connected');
    }
}