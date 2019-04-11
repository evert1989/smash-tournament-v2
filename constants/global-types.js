// @flow

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export type TPlayer = {
	eliminated: boolean;
	gameID: string;
	id: string;
	imageIndex: number;
	name: string;
	points: number;
};

export type TDashboard = {
	gameID: null | string;
	players: Array<string>;
	rounds: Array<Array<string>>;
	currentRound: number;
	winner: null | TPlayer;
};

export type TWsClient = {
	+send: (event: string, data?: any) => void;
};

export type TComponentProps = {
	dashboard: TDashboard;
	players: Array<TPlayer>;
	wsClient: TWsClient;
};

export type TAction = {
	payload?: any;
	type: string;
};
