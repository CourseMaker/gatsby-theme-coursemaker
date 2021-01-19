/** @jsx jsx */
import React from 'react';
import { Link } from 'gatsby';

import { jsx } from 'theme-ui';
import Layout from '../components/layout';

const PaymentSuccess = () => {
    const pageContext = {
        pageTitle: 'Payment Success',
        school: {
            name: '',
            subtitle: ''
        }
    }
    return (
        <Layout pageContext={pageContext}>
            <div className="container">
                <h1>Payment Success!</h1>
                <Link
                    to="/courses"
                    sx={{
                        color: `primary_blue`,
                    }}
                >
                    Go to the courses
                </Link>
            </div>
        </Layout>
    );
}

export default PaymentSuccess;
