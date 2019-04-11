// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
// $FlowFixMe
import styled from 'styled-components';

// Styling
// ---------------------------------------------------------------------------------------------------------------------
const SButton = styled.button`
	background-color: rgba(0,0,0,1);
	border: none;
	color: rgba(255,255,255,1);
	cursor: pointer;
	font-family: 'Super Smash';
	font-size: 20px;
	font-weight: bold;
	letter-spacing: 2px;
	margin-top: 40px;
	min-width: 400px;
	outline: 0;
	padding: 20px;
	text-transform: uppercase;
	transform: scale(1);
	transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

	&:hover {
		background-color: rgba(255,255,255,1);
		color: rgba(0,0,0,1);
		transform: scale(1.05);
	}
`;

// Types
// ---------------------------------------------------------------------------------------------------------------------
type TProps = {
	copy: string;
	onClick: () => void;
};

// Button
// ---------------------------------------------------------------------------------------------------------------------
const Button = ({ copy, onClick }: TProps): React.Node => <SButton onClick={onClick} type="button">{copy}</SButton>;

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Button;
