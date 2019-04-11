// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
import Button from './Button';
// $FlowFixMe
import { DASHBOARD } from '../../../../constants/events';
import { SComponentBase } from '../styles/global-styles';
// $FlowFixMe
import styled from 'styled-components';
// $FlowFixMe
import { type TComponentProps } from '../../../../constants/global-types';
import Title from './Title';

// Styles
// ---------------------------------------------------------------------------------------------------------------------
const SIntro = styled(SComponentBase)`
	align-items: center;
	background: rgba(0, 83, 211, 1);
	display: flex;
	flex-direction: column;
	min-height: 100%;
	width: 100%;
`;

// Intro
// ---------------------------------------------------------------------------------------------------------------------
class Intro extends React.PureComponent<TComponentProps> {
	handleClickStart = (): void => {
		const { wsClient } = this.props;
		wsClient.send(DASHBOARD.START_ROUND);
	};

	render(): React.Node {
		return (
			<SIntro>
				<Title copy="Introduction" />
				<Button copy="Start the first round" onClick={this.handleClickStart} />
			</SIntro>
		);
	}
}

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Intro;
