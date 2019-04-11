// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
// $FlowFixMe
import styled, { keyframes } from 'styled-components';
import Button from './Button';
// $FlowFixMe
import { DASHBOARD } from '../../../../constants/events';
// $FlowFixMe
import { type TComponentProps } from '../../../../constants/global-types';

// Styling
// ---------------------------------------------------------------------------------------------------------------------
const zoomIn = keyframes`
	to { transform: scale(1); }
`;

const SIdle = styled.div`
	align-items: center;
	background: url(${window.location.origin}/static/idle.jpg) center center no-repeat;
	background-size: cover;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	width: 100%;
`;

const Logo = styled.img`
	animation: ${zoomIn} 120s linear;
	filter: drop-shadow(0 0 15px #fff);
	transform: scale(0.7);
`;

// Idle
// ---------------------------------------------------------------------------------------------------------------------
class Idle extends React.PureComponent<TComponentProps> {
	handleClickStart = (): void => {
		const { wsClient } = this.props;
		wsClient.send(DASHBOARD.OPEN_LOBBY);
	};

	render(): React.Node {
		return (
			<SIdle>
				<Logo src={`${window.location.origin}/static/logo.png`} />
				<Button copy="Start game" onClick={this.handleClickStart} />
			</SIdle>
		);
	}
}

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Idle;
