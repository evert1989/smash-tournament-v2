// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
import Button from './Button';
// $FlowFixMe
import { DASHBOARD } from '../../../../constants/events';
import { getPlayerByID } from '../utils/player-utils';
import Player from './Player';
import { SComponentBase } from '../styles/global-styles';
// $FlowFixMe
import styled from 'styled-components';
// $FlowFixMe
import { type TComponentProps } from '../../../../constants/global-types';
import Title from './Title';

// Styles
// ---------------------------------------------------------------------------------------------------------------------
const SLobby = styled(SComponentBase)`
	background: rgba(255, 170, 5, 1);
`;

const SCode = styled.h2`
	border: 2px solid black;
	font-size: 80px;
	font-weight: bold;
	letter-spacing: 32px;
	margin: 0;
	text-indent: 32px;
`;

const SPlayerWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin-top: 40px;
	max-width: 992px;
`;

const SURL = styled.span`
	font-size: 40px;
	font-weight: bold;
`;

// Lobby
// ---------------------------------------------------------------------------------------------------------------------
class Lobby extends React.PureComponent<TComponentProps> {
	handleClickStart = (): void => {
		const { players, wsClient } = this.props;

		if (players.length >= 4) {
			wsClient.send(DASHBOARD.START_GAME);
		} else {
			// todo: modal
		}
	};

	renderPlayers = (playerID: string): React.Node => {
		const { players } = this.props;
		const player = getPlayerByID(players, playerID);

		return player ? <Player onClick={() => {}} player={player} small /> : 'Could not find player';
	};

	render(): React.Node {
		const { dashboard } = this.props;

		return (
			<SLobby>
				<Title copy="Game lobby" />
				<p>
					<div>{'Go to'}</div>
					<SURL>
						{'http://tiny.cc/424'}
					</SURL>
					<div>{'and enter the following code:'}</div>
				</p>
				<SCode>
					{dashboard.gameID}
				</SCode>
				<Button copy="Start game" onClick={this.handleClickStart} />
				<SPlayerWrapper>
					{dashboard.players.map(this.renderPlayers)}
				</SPlayerWrapper>
			</SLobby>
		);
	}
}

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Lobby;
