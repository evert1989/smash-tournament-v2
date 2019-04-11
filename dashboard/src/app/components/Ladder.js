// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
import { getPowerOf2FromResult, isOdd } from '../utils/math-utils';
import Bracket from './Bracket';
import Button from './Button';
// $FlowFixMe
import { DASHBOARD } from '../../../../constants/events';
// $FlowFixMe
import finalCopy from '../../../../constants/knockouts';
import { getLadderPlayer } from '../utils/player-utils';
import Row from './Row';
import { SComponentBase } from '../styles/global-styles';
// $FlowFixMe
import styled from 'styled-components';
// $FlowFixMe
import { type TComponentProps } from '../../../../constants/global-types';
import Title from './Title';

// Styles
// ---------------------------------------------------------------------------------------------------------------------
const SLadder = styled(SComponentBase)`
	background: rgba(242,37,0, 1);
`;

const SLadderWrapper = styled.div`
	display: flex;
	margin-bottom: 24px;
	width: 100%;
`;

// Ladder
// ---------------------------------------------------------------------------------------------------------------------
class Ladder extends React.PureComponent<TComponentProps> {
	handleClickStart = (): void => {
		const { wsClient } = this.props;
		wsClient.send(DASHBOARD.START_KNOCKOUT);
	};

	renderKnockout(index: number, depth: number, pos: 'left' | 'right'): React.Node {
		const { dashboard, players } = this.props;

		const brackets = [];
		const size = 2 ** (depth - index);

		let counter = pos === 'left' ? size - 1 : 1;
		let targetIndex = 0;

		let player1;
		let player2;
		let listOfPlayers;

		for (let i = 0; i < size * 0.5; i += 1) {
			switch (pos) {
				case 'left':
					targetIndex = isOdd(i) ? counter : size - 1 - counter;
					counter -= isOdd(i) ? size * 0.5 - 1 : 0;
					break;

				case 'right':
					targetIndex = isOdd(i) ? size - 1 - counter : counter;
					counter += isOdd(i) ? 1 : 0;
					break;

				default:
					break;
			}

			player1 = getLadderPlayer(index, players, dashboard.rounds, targetIndex, 0);
			player2 = getLadderPlayer(index, players, dashboard.rounds, targetIndex, 1);
			listOfPlayers = [];

			if (player1 && player2) {
				listOfPlayers.push(player1, player2);
			}

			brackets.push(<Bracket players={listOfPlayers} />);
		}

		return brackets;
	}

	renderFinal(index: number): React.Node {
		const { dashboard, players } = this.props;

		const player1 = getLadderPlayer(index, players, dashboard.rounds, 0, 0);
		const player2 = getLadderPlayer(index, players, dashboard.rounds, 0, 1);
		const listOfPlayers = [];

		if (player1 && player2) {
			listOfPlayers.push(player1, player2);
		}

		return <Bracket final players={listOfPlayers} />;
	}

	renderLadder(): React.Node {
		const { dashboard } = this.props;
		const ladderDepth = getPowerOf2FromResult(dashboard.rounds.length);
		const ladderLeft = [];
		const ladderRight = [];

		for (let i = 0; i <= ladderDepth; i += 1) {
			if (i !== ladderDepth) {
				// Add to left side
				ladderLeft.push(
					<Row
						copy={finalCopy[ladderDepth - i]}
						direction="left"
					>
						{this.renderKnockout(i, ladderDepth, 'left')}
					</Row>,
				);

				// Add to right side
				ladderRight.push(
					<Row
						copy={finalCopy[ladderDepth - i]}
						direction="right"
					>
						{this.renderKnockout(i, ladderDepth, 'right')}
					</Row>,
				);
			}
		}

		return [
			...ladderLeft,
			<Row copy={finalCopy[0]}>
				{this.renderFinal(ladderDepth)}
			</Row>,
			...ladderRight.reverse(),
		];
	}

	render(): React.Node {
		return (
			<SLadder>
				<Title copy="Knockout Ladder" />
				<SLadderWrapper>
					{this.renderLadder()}
				</SLadderWrapper>
				<Button copy="Start knockouts" onClick={this.handleClickStart} />
			</SLadder>
		);
	}
}

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Ladder;
