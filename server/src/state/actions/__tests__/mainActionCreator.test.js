// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as dashboardActions from '../dashboardActions';
import * as globalActions from '../globalActions';
import * as playerActions from '../playerActions';
import mainActionCreator from '../mainActionCreator';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('MainActionCreator', () => {
	test('has all actions', () => {
		expect.assertions(1);

		expect(mainActionCreator).toEqual({
			...dashboardActions,
			...globalActions,
			...playerActions,
		});
	});
});
