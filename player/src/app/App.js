// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
// $FlowFixMe
import { HOST, PORT } from '../../../constants/settings';
// $FlowFixMe
import styled, { createGlobalStyle } from 'styled-components';
import Join from './components/Join';
import NoActiveGame from './components/NoActiveGame';
// $FlowFixMe
import { SERVER } from '../../../constants/events';
// $FlowFixMe
import STATES from '../../../constants/states';
import WebSocketClient from './sockets/WebSocketClient';

// Styles
// ---------------------------------------------------------------------------------------------------------------------
const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: "Super Smash";
		src: url("${window.location.origin}/static/font/super-smash.ttf");
	}
`;

const SApp = styled.div`
	background: black;
	height: 100%;
	font-family: "Super Smash";
	width: 100%;
`;

// Types
// ---------------------------------------------------------------------------------------------------------------------
type TApp = {
	wsClient?: WebSocketClient;
};

type TState = {
	activeState: string | null;
	dashboard: {
		gameID: string | null;
	};
};

// Class
// ---------------------------------------------------------------------------------------------------------------------
class App extends React.PureComponent<null, TState> {
	state = {
		activeState: null,
		dashboard: {
			gameID: null,
		},
	};

	componentDidMount(): void {
		(this: TApp).wsClient = new WebSocketClient({ onSocketMessage: this.handleSocketMessage });
	}

	handleSocketMessage = (event: string, data?: any): void => {
		const isStateEvent = [SERVER.HEARTBEAT, SERVER.STATE].indexOf(event) !== -1;

		switch (isStateEvent) {
			case true:
				this.setState({ ...data });
				break;

			default:
				break;
		}
	};

	renderContent(): React.Node {
		const { dashboard, activeState } = this.state;

		const defaultProps = {
			dashboard,
			wsClient: (this: TApp).wsClient,
		};

		switch (activeState) {
			case STATES.IDLE:
				return <NoActiveGame />;

			case STATES.LOBBY:
				return <Join {...defaultProps} />;

			default:
				return null;
		}
	}

	render(): React.Node {
		return (
			<React.Fragment>
				<GlobalStyle />
				<SApp>
					{this.renderContent()}
				</SApp>
			</React.Fragment>
		);
	}
}

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default App;
