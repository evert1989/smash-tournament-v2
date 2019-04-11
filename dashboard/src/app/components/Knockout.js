// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
import Button from './Button';
// $FlowFixMe
import { DASHBOARD } from '../../../../constants/events';
import { getPlayerByID } from '../utils/player-utils';
import Modal from './Modal';
import Player from './Player';
import { SComponentBase } from '../styles/global-styles';
// $FlowFixMe
import styled from 'styled-components';
// $FlowFixMe
import { type TComponentProps } from '../../../../constants/global-types';
import Title from './Title';

// Styles
// ---------------------------------------------------------------------------------------------------------------------
const SKnockout = styled(SComponentBase)`
	background: rgba(255, 0, 255, 1);
`;

const SPlayerWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 100%;
`;

// Types
// ---------------------------------------------------------------------------------------------------------------------
type TState = {
	eliminated: string | null;
	showModal: boolean;
};

// Knockout
// ---------------------------------------------------------------------------------------------------------------------
class Knockout extends React.PureComponent<TComponentProps, TState> {
	state = {
		eliminated: null,
		showModal: false,
	};

	handleClickNext = (): void => {
		const { wsClient } = this.props;
		const { eliminated } = this.state;

		if (eliminated !== null) {
			wsClient.send(DASHBOARD.NEXT_KNOCKOUT, eliminated);
			this.setState({ eliminated: null });
		} else {
			this.setState({ showModal: true });
		}
	};

	handlePlayerClick = (id: string): void => {
		const { eliminated } = this.state;

		this.setState({ eliminated: eliminated === id ? null : id });
	};

	handleModalClose = (): void => {
		this.setState({ showModal: false });
	};

	renderContent = (playerID: string): React.Node => {
		const { players } = this.props;
		const { eliminated } = this.state;

		const player = getPlayerByID(players, playerID);
		const isEliminated = !!player && eliminated === player.id;

		return player
			? (
				<Player
					eliminated={isEliminated}
					key={player.id}
					onClick={this.handlePlayerClick}
					player={player}
				/>
			)
			: null;
	};

	render(): React.Node {
		const { dashboard } = this.props;
		const { showModal } = this.state;

		const round = dashboard.rounds[dashboard.currentRound];

		return (
			<SKnockout>
				<Title copy="Knockout Round" />
				<SPlayerWrapper>
					{round.map(this.renderContent)}
				</SPlayerWrapper>
				<Button copy="Next knockout" onClick={this.handleClickNext} />
				{showModal && <Modal onClose={this.handleModalClose} />}
			</SKnockout>
		);
	}
}

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Knockout;
