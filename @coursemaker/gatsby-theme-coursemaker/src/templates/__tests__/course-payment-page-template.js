import React from 'react';
import renderer from 'react-test-renderer';
import CoursePaymentPage from '../course-payment-page-template';
import pageContextDouble from '../__mocks__/course-payment-page-double';

describe('CoursePaymentPage', () => {
    it('renders one-time purchase text correctly', () => {
        // Created using the query from Header.js
        const pageContextTestSample = pageContextDouble;
        const tree = renderer.create(<CoursePaymentPage pageContext={pageContextTestSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('CoursePaymentPage', () => {
    it('displays membership purchase text', () => {
        // Created using the query from Header.js
        const pageContextTestSample = pageContextDouble;
        pageContextTestSample.course.price_info = {
            active: true,
            currency: 'USD',
            name: 'Testing and Monitoring Price',
            product_type: 'school_membership',
            product_type_readable: 'Testing and Monitoring ML Models',
            recurring_interval: null,
            recurring_interval_count: null,
            unit_amount: 1995,
            unit_amount_readable: '$19.95',
            courses: [
                {
                    id: '102',
                },
            ],
        };
        const tree = renderer.create(<CoursePaymentPage pageContext={pageContextTestSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('CoursePaymentPage', () => {
    it('handles inactive price', () => {
        // Created using the query from Header.js
        const pageContextTestSample = pageContextDouble;
        pageContextTestSample.course.price_info = {
            active: false,
            currency: 'USD',
            name: 'Testing and Monitoring Price',
            product_type: 'school_membership',
            product_type_readable: 'Testing and Monitoring ML Models',
            recurring_interval: null,
            recurring_interval_count: null,
            unit_amount: 1995,
            unit_amount_readable: '$19.95',
            courses: [
                {
                    id: '102',
                },
            ],
        };
        const tree = renderer.create(<CoursePaymentPage pageContext={pageContextTestSample} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
