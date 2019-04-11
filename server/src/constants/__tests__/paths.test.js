// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as paths from '../paths';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('Paths', () => {
	test('has all required paths', () => {
		expect.assertions(5);

		expect(Object.keys(paths).length).toBe(2);
		expect(paths).toHaveProperty('ROOT_PATH');
		expect(typeof paths.ROOT_PATH).toEqual('string');
		expect(paths).toHaveProperty('ASSET_PATH');
		expect(typeof paths.ASSET_PATH).toEqual('string');
	});
});
