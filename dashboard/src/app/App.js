// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
// $FlowFixMe
import { HOST, PORT } from '../../../constants/settings';
// $FlowFixMe
import styled, { createGlobalStyle } from 'styled-components';
// $FlowFixMe
import { type TDashboard, type TPlayer } from '../../../constants/global-types';
import Idle from './components/Idle';
import Intro from './components/Intro';
import Knockout from './components/Knockout';
import Ladder from './components/Ladder';
import Lobby from './components/Lobby';
import Round from './components/Round';
// $FlowFixMe
import { SERVER } from '../../../constants/events';
// $FlowFixMe
import STATES from '../../../constants/states';
import WebSocketClient from './sockets/WebSocketClient';
import Winner from './components/Winner';

// Styling
// ---------------------------------------------------------------------------------------------------------------------
const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: "Super Smash";
		src: url("http://${HOST}:${PORT}/static/font/super-smash.ttf");
	}
`;

const AppContainer = styled.div`
	display: flex;
	font-family: "Super Smash";
	min-height: 100%;
	width: 100%;
`;

// Types
// ---------------------------------------------------------------------------------------------------------------------
type TApp = {
	wsClient?: WebSocketClient;
};

type TState = {
	dashboard: TDashboard;
	players: Array<TPlayer>;
	activeState: null | string;
};

// Class
// ---------------------------------------------------------------------------------------------------------------------
class App extends React.PureComponent<null, TState> {
	state = {
		activeState: null,
		dashboard: {
			currentRound: -1,
			gameID: null,
			players: [],
			rounds: [],
			winner: null,
		},
		players: [],
	};

	componentDidMount(): void {
		(this: TApp).wsClient = new WebSocketClient({ onSocketMessage: this.handleSocketMessage });

		console.log('PORT', global.PORT, process.env.PORT);
	}

	handleSocketMessage = (event: string, data?: any): void => {
		const isStateEvent = [SERVER.HEARTBEAT, SERVER.STATE, SERVER.PLAYER_JOINS].indexOf(event) !== -1;

		switch (isStateEvent) {
			case true:
				this.setState({ ...data });
				break;

			default:
				break;
		}
	};

	renderContent(): React.Node {
		const { dashboard, players, activeState } = this.state;

		const defaultProps = {
			dashboard,
			players,
			wsClient: (this: TApp).wsClient,
		};

		switch (activeState) {
			case STATES.IDLE:
				return <Idle {...defaultProps} />;

			case STATES.LOBBY:
				return <Lobby {...defaultProps} />;

			case STATES.INTRO:
				return <Intro {...defaultProps} />;

			case STATES.ROUND:
				return <Round {...defaultProps} />;

			case STATES.LADDER:
				return <Ladder {...defaultProps} />;

			case STATES.KNOCKOUT:
				return <Knockout {...defaultProps} />;

			case STATES.WINNER:
				return <Winner {...defaultProps} />;

			default:
				return null;
		}
	}

	render(): React.Node {
		return (
			<React.Fragment>
				<GlobalStyle />
				<AppContainer>
					{this.renderContent()}
				</AppContainer>
			</React.Fragment>
		);
	}
}

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default App;
