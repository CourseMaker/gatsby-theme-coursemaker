import React from 'react';
import renderer from 'react-test-renderer';
import TestimonialsSection from '../testimonials-section';
import landingPageDouble from '../__mocks__/landing-page-double';

describe('TestimonialsSection', () => {
    it('renders correctly', () => {
        // Created using the query from Header.js
        const landingPageSample = landingPageDouble;
        const tree = renderer.create(<TestimonialsSection landingPage={landingPageSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('TestimonialsSection', () => {
    it('renders correctly with null landing page', () => {
        // Created using the query from Header.js
        const landingPageSample = null;
        const tree = renderer.create(<TestimonialsSection landingPage={landingPageSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('TestimonialsSection', () => {
    it('renders correctly with missing landing page fields', () => {
        // Created using the query from Header.js
        const landingPageSample = landingPageDouble;
        landingPageSample.initialCTA = '';
        const tree = renderer.create(<TestimonialsSection landingPage={landingPageSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
