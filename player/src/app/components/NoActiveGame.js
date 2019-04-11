// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
// $FlowFixMe
import styled from 'styled-components';

// Styling
// ---------------------------------------------------------------------------------------------------------------------
const SNoActiveGame = styled.div`
	display:flex;
	flex-direction: column;
	height: 100%;
	background: rgba(255, 170, 5, 1);
	align-items: center;
	justify-content: center;
`;

const STitle = styled.h1`
	text-align: center;
`;

const SInfo = styled.p`
	width: 80%;
	text-align: center;
`;

// NoActiveGame
// ---------------------------------------------------------------------------------------------------------------------
// TODO: flush this out
const NoActiveGame = (): React.Node => (
	<SNoActiveGame>
		<STitle>
			{'No Active Game available'}
		</STitle>
		<SInfo>
			{'Please wait for a game to be created'}
		</SInfo>
	</SNoActiveGame>
);

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default NoActiveGame;
