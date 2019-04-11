// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as dashboardActions from './dashboardActions';
import * as globalActions from './globalActions';
import * as playerActions from './playerActions';

// Action creator
// ---------------------------------------------------------------------------------------------------------------------
const mainActionCreator = {
	...dashboardActions,
	...globalActions,
	...playerActions,
};

// Exports
// ---------------------------------------------------------------------------------------------------------------------
export default mainActionCreator;
