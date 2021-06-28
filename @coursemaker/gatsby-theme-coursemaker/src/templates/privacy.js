import React from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout';

const Privacy = ({ pageContext }) => {
    const { school } = pageContext;
    const privacy_policy = school?.privacy_policy;

    let schoolThemeStyle = pageContext.school?.schoolThemeStyle;
    if (!schoolThemeStyle) {
        schoolThemeStyle = {
            primaryColor: 'purple',
            secondaryColor: 'blue',
        };
    }

    return (
        <Layout pageContext={pageContext} schoolThemeStyle={schoolThemeStyle}>
            <section className="bg-indigo-100 section-header">
                <div className="container mx-auto lg:w-7/12">
                    <div className="py-8 md:py-12">
                        <h2>Privacy Policy</h2>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container mx-auto lg:w-7/12">
                    <article className="leading-relaxed space-y-5">
                        <ReactMarkdown>{privacy_policy}</ReactMarkdown>
                    </article>
                </div>
            </section>
        </Layout>
    );
};

export default Privacy;
