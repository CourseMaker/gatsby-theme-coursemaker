/** @jsx jsx */
import React from 'react';
import { Link } from 'gatsby';

import { jsx } from 'theme-ui';
import Layout from '../components/layout';
import { handleAuthentication } from '../auth/auth';

const PaymentSuccess = () => {
    handleAuthentication();
    const pageContext = {
        pageTitle: 'Login Success',
        school: {
            name: '',
            subtitle: '',
        },
    };
    return (
        <Layout pageContext={pageContext}>
            <div className="container">
                <h1>Login Success!</h1>
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
};

export default PaymentSuccess;
