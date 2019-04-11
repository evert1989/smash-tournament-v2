// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { bindActionCreators, createStore } from 'redux';
import mainActionCreator from './actions/mainActionCreator';
import mainReducer from './reducers/mainReducer';

// Create Redux store
// ---------------------------------------------------------------------------------------------------------------------
export const store = createStore(mainReducer);
export const actions = bindActionCreators(mainActionCreator, store.dispatch);
