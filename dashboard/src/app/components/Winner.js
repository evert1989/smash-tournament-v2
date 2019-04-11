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
const SWinner = styled(SComponentBase)`
	background: rgba(255, 255, 0, 1);
`;

// Winner
// ---------------------------------------------------------------------------------------------------------------------
class Winner extends React.PureComponent<TComponentProps> {
	handleClickEnd = (): void => {
		const { wsClient } = this.props;
		wsClient.send(DASHBOARD.END_GAME);
	};

	render(): React.Node {
		const { dashboard, players } = this.props;

		const player = dashboard.winner ? getPlayerByID(players, dashboard.winner) : null;

		return (
			<SWinner>
				<Title copy="And the winner is..." />
				{player && <Player onClick={() => {}} player={player} />}
				<Button copy="End the game" onClick={this.handleClickEnd} />
			</SWinner>
		);
	}
}

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Winner;
