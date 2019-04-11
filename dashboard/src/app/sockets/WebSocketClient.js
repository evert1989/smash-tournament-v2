// @flow

// WebSocketClient
// ---------------------------------------------------------------------------------------------------------------------
type TProps = {
	onSocketMessage: (event: string, data?: any) => void;
};

class WebSocketClient {
	props: TProps;

	socket: WebSocket;

	constructor(props: TProps): void {
		this.props = props;
		this.connect();
	}

	connect(): void {
		console.log(window);

		this.socket = new WebSocket(window.location.origin.replace(/http:|https:/, 'wss:'));
		this.socket.onmessage = this.handleMessage;
		this.socket.onclose = this.handleClose;
	}

	handleMessage = (msg: MessageEvent): void => {
		if (msg.data && typeof msg.data === 'string') {
			const { data, event } = JSON.parse(msg.data);
			this.props.onSocketMessage(event, data);
		} else {
			console.warn('Could not parse incoming message', msg);
		}
	};

	handleClose = (): void => {
		this.connect();
	};

	send(event: string, data?: Object): void {
		this.socket.send(JSON.stringify({
			data,
			event,
		}));
	}
}

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default WebSocketClient;
