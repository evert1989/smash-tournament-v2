// Imports
// ---------------------------------------------------------------------------------------------------------------------
import App from '../App';
import React from 'react';
import { shallow } from 'enzyme';

// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe('App', () => {
	test('renders app without errors', () => {
		expect.assertions(1);

		const wrapper = shallow(<App />);

		expect(wrapper.exists()).toBe(true);
	});
});
