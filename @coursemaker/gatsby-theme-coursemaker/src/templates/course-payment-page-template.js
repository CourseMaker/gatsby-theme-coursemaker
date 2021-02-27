import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import Layout from '../components/layout';
import Checkout from '../components/checkout';
import { isAuthenticated } from '../auth/auth';

const CoursePaymentPage = ({ pageContext = {} }) => {
    useEffect(() => {
        if (!isAuthenticated()) navigate('/register');
    });
    const { course } = pageContext;
    const { school } = pageContext;
    const priceInfo = course.price_info;

    let schoolThemeStyle = pageContext.school?.schoolThemeStyle;
    if (!schoolThemeStyle) {
        schoolThemeStyle = {
            primaryColor: 'blue',
            secondaryColor: 'blue',
        };
    }

    let priceText = '';
    let recurrence = '';
    if (priceInfo?.product_type === 'single_course' && priceInfo?.is_active) {
        priceText = priceInfo?.unit_amount_readable;
        recurrence = 'One-time purchase of: ';
    } else if (priceInfo?.product_type === 'school_membership' && priceInfo?.is_active) {
        priceText = priceInfo?.unit_amount_readable;
        recurrence = 'Monthly membership price of: ';
        if (priceInfo?.recurring_interval === 'year') {
            recurrence = 'Annual membership price of: ';
        }
    }

    return (
        <Layout schoolThemeStyle={schoolThemeStyle} pageContext={pageContext}>
            <section className="py-16 text-center md:py-24">
                <div className="container">
                    <div className="mx-auto lg:w-10/12">
                        <h1 className="mb-4">{course.title}</h1>
                        <h3 className="mb-4">
                            {recurrence} {priceText}
                        </h3>
                        <Checkout schoolThemeStyle={schoolThemeStyle} school={school} course={course} />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default CoursePaymentPage;
