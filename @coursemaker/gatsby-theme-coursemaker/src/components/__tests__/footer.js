import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../footer';
import schoolDouble from '../__mocks__/school-double';

describe('Footer', () => {
    it('renders correctly', () => {
        // Created using the query from Header.js
        const schoolTestSample = schoolDouble;
        const tree = renderer.create(<Footer school={schoolTestSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
