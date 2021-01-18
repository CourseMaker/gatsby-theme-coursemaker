import React from 'react';

import Layout from '../components/layout';

const Forgot = () => {
    const pageTitle = {pageTitle: 'Forgot Password'}
    return (
        <Layout pageContext={pageTitle}>
            <div className="container">
                <h1>Forgot Your Password?</h1>
                <h3>Please email your course admin</h3>
            </div>
        </Layout>
    );
}

export default Forgot;
