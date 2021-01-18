/** @jsx jsx */
import React from 'react';
import { Link } from 'gatsby';

import { jsx } from 'theme-ui';
import Layout from '../components/layout';

const PaymentSuccess = () => {
    const pageTitle = {pageTitle: 'Success'}
    return (
        <Layout pageContext={pageTitle}>
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
