import React from 'react';
import renderer from 'react-test-renderer';
import FAQSection from '../faqs-section';
import landingPageDouble from '../__mocks__/landing-page-double';

describe('FAQSection', () => {
    it('renders correctly', () => {
        // Created using the query from Header.js
        const landingPageSample = landingPageDouble;
        const tree = renderer.create(<FAQSection landingPage={landingPageSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('FAQSection', () => {
    it('renders correctly with null landing page', () => {
        // Created using the query from Header.js
        const landingPageSample = null;
        const tree = renderer.create(<FAQSection landingPage={landingPageSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('FAQSection', () => {
    it('renders correctly with missing landing page fields', () => {
        // Created using the query from Header.js
        const landingPageSample = landingPageDouble;
        landingPageSample.initialCTA = '';
        const tree = renderer.create(<FAQSection landingPage={landingPageSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
