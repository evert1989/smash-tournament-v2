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
const SRound = styled(SComponentBase)`
	background: rgba(0, 149, 48, 1);
`;

const SPlayerWrapper = styled.div`
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	width: 100%;
`;

// Types
// ---------------------------------------------------------------------------------------------------------------------
type TState = {
	eliminated: Array<string>;
	showModal: boolean;
};

// Round
// ---------------------------------------------------------------------------------------------------------------------
class Round extends React.PureComponent<TComponentProps, TState> {
	state = {
		eliminated: [],
		showModal: false,
	};

	handleClickNext = (): void => {
		const { dashboard, wsClient } = this.props;
		const { eliminated } = this.state;

		const round = dashboard.rounds[dashboard.currentRound];

		if (eliminated.length === round.length) {
			wsClient.send(DASHBOARD.NEXT_ROUND, eliminated);
			this.setState({ eliminated: [] });
		} else {
			this.setState({ showModal: true });
		}
	};

	handlePlayerClick = (id: string): void => {
		const { eliminated } = this.state;
		const eliminatedCopy = [...eliminated];

		const targetIndex = eliminatedCopy.indexOf(id);

		if (targetIndex === -1) {
			// Add
			eliminatedCopy.push(id);
		} else {
			// Remove
			eliminatedCopy.splice(targetIndex, 1);
		}

		this.setState({ eliminated: eliminatedCopy });
	};

	handleModalClose = (): void => {
		this.setState({ showModal: false });
	};

	renderContent = (playerID: string): React.Node => {
		const { players } = this.props;
		const { eliminated } = this.state;

		const player = getPlayerByID(players, playerID);
		const isEliminated = eliminated.indexOf(playerID) !== -1;

		return player
			? (
				<Player
					eliminated={isEliminated}
					key={player.id}
					onClick={this.handlePlayerClick}
					player={player}
				/>
			)
			: 'Could not find player';
	};

	render(): React.Node {
		const { dashboard } = this.props;
		const { showModal } = this.state;

		const round = dashboard.rounds[dashboard.currentRound];

		return (
			<SRound>
				<Title copy="Current round" />
				<SPlayerWrapper>
					{round.map(this.renderContent)}
				</SPlayerWrapper>
				<Button copy="Next round" onClick={this.handleClickNext} />
				{showModal && <Modal onClose={this.handleModalClose} />}
			</SRound>
		);
	}
}

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Round;
