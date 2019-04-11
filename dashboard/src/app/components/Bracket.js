// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
// $FlowFixMe
import styled from 'styled-components';
// $FlowFixMe
import { TPlayer } from '../../../../constants/global-types';

// Styles
// ---------------------------------------------------------------------------------------------------------------------
const SBracket = styled.div`
	align-items: ${props => (props.final ? 'center' : 'stretch')};
	border: ${props => (props.final ? 2 : 1)}px solid black;
	flex-direction: ${props => (props.final ? 'row' : 'column')};

	background: white;
	display: flex;
	height: 80px;
	justify-content: space-between;
	margin: 20px 0;
	min-width: 120px;
	padding: 10px 20px;
`;

const SPlayer = styled.div`
	height: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
`;

// Types
// ---------------------------------------------------------------------------------------------------------------------
type TProps = {
	final?: boolean;
	players: Array<{name: string}>;
};

// Bracket
// ---------------------------------------------------------------------------------------------------------------------
// TODO: Bracket player card
const Bracket = ({ final, players }: TProps): React.Node => (
	<SBracket final={final}>
		{players.map((player: TPlayer): React.Node => <SPlayer>{player.name}</SPlayer>)}
	</SBracket>
);

Bracket.defaultProps = {
	final: false,
};

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Bracket;
