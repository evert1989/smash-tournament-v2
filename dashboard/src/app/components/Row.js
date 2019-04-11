// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
// $FlowFixMe
import styled from 'styled-components';

// Styles
// ---------------------------------------------------------------------------------------------------------------------
const SRow = styled.div`
	flex-grow: 1;
	text-align: ${props => props.direction};
`;

const STitle = styled.h1`
	text-align: center;
`;

const SBracketWrapper = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
`;

// Types
// ---------------------------------------------------------------------------------------------------------------------
type TProps = {
	direction?: 'left' | 'right';
	copy: string;
	children: React.Node;
};

// Exports
// ---------------------------------------------------------------------------------------------------------------------
const Row = ({ direction, copy, children }: TProps): React.Node => (
	<SRow direction={direction}>
		<STitle>{copy}</STitle>
		<SBracketWrapper>
			{children}
		</SBracketWrapper>
	</SRow>
);

Row.defaultProps = {
	direction: 'left',
};

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Row;
