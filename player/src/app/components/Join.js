// @flow

// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as React from 'react';
// $FlowFixMe
import avatars from '../../../../constants/images';
// $FlowFixMe
import { PLAYER } from '../../../../constants/events';
// $FlowFixMe
import styled from 'styled-components';
// $FlowFixMe
import { type TWsClient } from '../../../../constants/global-types';

// Style
// ---------------------------------------------------------------------------------------------------------------------
const SJoin = styled.div`
	display:flex;
	flex-direction: column;
	height: 100%;
	background: rgba(255, 170, 5, 1);
	align-items: center;
	justify-content: center;
`;

const SForm = styled.form`
	width: 100%;
	display:flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	label {
		width: 174px;
		margin-bottom: 20px;
	}
`;

const SInput = styled.input`
	width: 150px;
	height: 20px;
	padding: 5px 10px;
	border: none;
`;

const SSubmit = styled.input`
	background: black;
	color: white;
	font-size: 24px;
	text-transform: uppercase;
	margin-top: 60px;
	font-family: "Super Smash";
	padding: 20px;
	border: none;
	box-sizing: border-box;

	&:active {
		background: white;
		color: black;
	}
`;

const SAvatar = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
`;

const AvatarImage = styled.div`
	border: ${props => (props.variant === 'main' ? '1px solid black' : 'none')};
	height: ${props => (props.variant === 'main' ? '100px' : 'calc(100vw / 3)')};
	width: ${props => (props.variant === 'main' ? '100px' : 'calc(100vw / 3)')};

	img {
		max-width: 100%;
		max-height: 100%;
	}
`;

const AvatarContainer = styled.div`
	border-bottom: 1px solid black;
	border-top: 1px solid black;
	display: ${props => (props.isVisible ? 'flex' : 'none')};
	flex-wrap: wrap;
	margin-top: 40px;
	width: 100%;
	height: 250px;
	background: white;
	position: absolute;
	left: 0;
	top: -50px;
	overflow: scroll;
`;

const SCopy = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

// Types
// ---------------------------------------------------------------------------------------------------------------------
type TProps = {
	dashboard: {
		gameID: string | null;
	};
	wsClient: TWsClient;
};

type TState = {
	gameID: string;
	imageIndex: number;
	isShowingList: boolean;
	isRegistered: boolean;
	name: string;
};

// Join
// ---------------------------------------------------------------------------------------------------------------------
class Join extends React.PureComponent<TProps, TState> {
	state = {
		gameID: '',
		imageIndex: 0,
		isRegistered: false,
		isShowingList: false,
		name: '',
	};

	handleFormSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
		const { dashboard, wsClient } = this.props;
		const { name, imageIndex, gameID } = this.state;

		e.preventDefault();

		if (!gameID || gameID !== dashboard.gameID || !name) {
			return;
		}

		wsClient.send(PLAYER.JOIN, {
			gameID,
			imageIndex,
			name,
		});

		this.setState({ isRegistered: true });
	};

	handleChangeName = (e: SyntheticInputEvent<HTMLInputElement>): void => {
		this.setState({ name: e.target.value });
	};

	handleChangeGameID = (e: SyntheticInputEvent<HTMLInputElement>): void => {
		this.setState({ gameID: e.target.value });
	};

	handleClickAvatar = (): void => {
		const { isShowingList } = this.state;
		this.setState({ isShowingList: !isShowingList });
	};

	handleClickSelect = (index: number): void => {
		this.setState({
			imageIndex: index,
			isShowingList: false,
		});
	};

	render(): React.Node {
		const {
			name,
			imageIndex,
			isShowingList,
			isRegistered,
			gameID,
		} = this.state;

		// TODO: form validation
		return !isRegistered ? (
			<SJoin>
				<h1>
					{'Join game'}
				</h1>
				<SForm onSubmit={this.handleFormSubmit}>
					<label htmlFor="name">
						{'Your name'}
						<SInput
							id="name"
							onChange={this.handleChangeName}
							type="text"
							value={name}
						/>
					</label>
					<label htmlFor="code">
						{'Game code'}
						<SInput
							id="code"
							onChange={this.handleChangeGameID}
							type="number"
							value={gameID}
						/>
					</label>
					<label>
						{'Pick your avatar'}
					</label>
					<SAvatar>
						<AvatarImage onClick={this.handleClickAvatar} variant="main">
							<img src={`${window.location.origin}/static/characters/processed/${avatars[imageIndex]}`} />
						</AvatarImage>
						<AvatarContainer isVisible={isShowingList}>
							{avatars.map((image, i) => (
								<AvatarImage
									key={image}
									onClick={(): void => this.handleClickSelect(i)}
									variant="list"
								>
									<img src={`${window.location.origin}/static/characters/processed/${image}`} />
								</AvatarImage>
							))}
						</AvatarContainer>
					</SAvatar>
					<SSubmit type="submit" value="Join game" />
				</SForm>
			</SJoin>
		) : (
			<SJoin>
				<SCopy>
					<h1>
						{`Welcome, ${name}!`}
					</h1>
					<p>
						{'Please wait until the game starts.'}
					</p>
					<p>
						{'You can close this page. '}
					</p>
				</SCopy>
			</SJoin>
		);
	}
}

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default Join;
