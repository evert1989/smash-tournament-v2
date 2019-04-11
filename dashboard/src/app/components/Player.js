// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
import { AVATAR_PATH } from '../constants/paths';
// $FlowFixMe
import avatars from '../../../../constants/images';
// $FlowFixMe
import styled from 'styled-components';
// $FlowFixMe
import { type TPlayer } from '../../../../constants/global-types';

// Styles
// ---------------------------------------------------------------------------------------------------------------------
const SPlayer = styled.div`
	border: ${props => (props.small ? '2px solid black' : 'none')};
	opacity: ${props => (props.eliminated ? 0.2 : 1)};
	margin: ${props => (props.small ? '10px' : 0)};
	width: ${props => (props.small ? 100 : 200)}

	transition: opacity 0.3s;
`;

const SImage = styled.div`
	width: ${props => (props.small ? 100 : 200)}px;
	height: ${props => (props.small ? 100 : 200)}px;
	background: ${props => (props.small ? 'white' : 'none')};

	img {
		max-height: 100%;
		max-width: 100%;
	}
`;

const STitle = styled.div`
	align-items: center;
	background: black;
	color: white;
	display: flex;
	font-size: 16px;
	height: 30px;
	justify-content: center;
	text-align: center;
`;

// Types
// ---------------------------------------------------------------------------------------------------------------------
type TProps = {
	eliminated?: boolean;
	onClick: (id: string) => void;
	player: TPlayer;
	small?: boolean;
};

// Player
// ---------------------------------------------------------------------------------------------------------------------
const Player = ({
	eliminated,
	onClick,
	player,
	small,
}: TProps): React.Node => (
	<SPlayer eliminated={eliminated} onClick={() => onClick(player.id)} small={small}>
		<SImage small={small}>
			<img src={`${AVATAR_PATH}${avatars[player.imageIndex]}`} />
		</SImage>
		<STitle>{player.name}</STitle>
	</SPlayer>
);

Player.defaultProps = {
	eliminated: false,
	small: false,
};

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Player;
