import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../header';
import schoolDouble from '../__mocks__/school-double';

describe('Header', () => {
    it('renders correctly', () => {
        // Created using the query from Header.js
        const schoolTestSample = schoolDouble;
        const tree = renderer.create(<Header school={schoolTestSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
