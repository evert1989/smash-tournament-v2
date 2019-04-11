// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
// $FlowFixMe
import { HOST, PORTS } from '../../../../constants/settings';

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
		this.socket = new WebSocket(`ws://${HOST}:${PORTS.WS_PORT}`);
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
