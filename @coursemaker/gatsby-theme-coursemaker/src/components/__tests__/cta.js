import React from 'react';
import renderer from 'react-test-renderer';
import CTA from '../cta';
import priceInfoDouble from '../__mocks__/course-price-double';

describe('CTA', () => {
    it('renders correctly for one-time purchase', () => {
        const priceInfoSample = priceInfoDouble;
        const tree = renderer.create(<CTA priceInfo={priceInfoSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('CTA', () => {
    it('renders correctly for membership purchase', () => {
        const priceInfoSample = priceInfoDouble;
        priceInfoSample.product_type = 'school_membership';
        priceInfoSample.recurring_interval = 'month';
        const tree = renderer.create(<CTA priceInfo={priceInfoSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
