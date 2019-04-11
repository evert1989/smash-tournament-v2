// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
import Button from './Button';
// $FlowFixMe
import styled from 'styled-components';

// Styles
// ---------------------------------------------------------------------------------------------------------------------
const SModal = styled.div`
	background: white;
	border: 2px solid black;
	color: red;
	position: fixed;
	left: 50%;
	padding: 40px;
	top: 100px;
	transform: translateX(-50%);
`;

// Modal
// ---------------------------------------------------------------------------------------------------------------------
const Modal = ({ onClose }: { onClose: () => void }) => (
	<SModal>
		<p>
			{'Please make sure that all eliminations are filled in.'}
		</p>
		<Button copy="Understood" onClick={onClose} />
	</SModal>
);

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Modal;
