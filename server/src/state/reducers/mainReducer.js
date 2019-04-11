// Imports
// ---------------------------------------------------------------------------------------------------------------------
// $FlowFixMe
import { combineReducers } from 'redux';
import dashboardReducer from './dashboardReducer';
import playerReducer from './playerReducer';
import stateReducer from './stateReducer';

// Reducer
// ---------------------------------------------------------------------------------------------------------------------
const mainReducer = combineReducers({
	activeState: stateReducer,
	dashboard: dashboardReducer,
	players: playerReducer,
});

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default mainReducer;
