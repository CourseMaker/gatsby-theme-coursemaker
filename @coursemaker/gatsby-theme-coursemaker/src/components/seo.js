import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import schemaGenerator from '../helpers/schemaGenerator';

const defaultFields = {
    school: {
        name: '',
        subtitle: '',
    },
    pageTitle: 'unknown page',
};

const SEO = ({ pageContext = defaultFields }) => {
    const school = pageContext?.school;
    const siteTitle = pageContext?.school?.name;
    const siteDescription = pageContext?.school?.subtitle;
    const pageTitle = pageContext?.pageTitle;
    const pageTitleFull = pageTitle ? `${siteTitle}: ${pageTitle}` : siteTitle;
    const location = typeof window !== 'undefined' ? window.location : '';
    let socialImage= '';
    // if there is just one course, use the course image
    if (school?.courses?.length === 1){
        socialImage = school?.courses[0]?.course_landing_page?.image.url;
    } else if (school?.courses?.length > 1) {
        socialImage = school?.landing_page?.image.url;
    }

    let realCanonical = null;
    let siteUrl = '';
    if (process.env.GATSBY_USE_STRAPI === 'true') {
        const schoolSlug = pageContext?.school?.settings?.sub_domain;
        realCanonical = `https://${schoolSlug}.coursemaker.org${location?.pathname}`;
    } else {
        siteUrl = pageContext?.school?.siteUrl;
        if (siteUrl) {
            realCanonical = `${siteUrl}${location?.pathname}`;
        } else {
            realCanonical = location?.href;
        }
    }

    return (
        <Helmet>
            <html lang="en" />

            <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
            <meta content="width=device-width,initial-scale=1.0,user-scalable=yes" name="viewport" />

            <meta content={siteTitle} name="apple-mobile-web-app-title" />
            <title>{pageTitleFull}</title>

            <meta content={siteDescription} name="description" />
            <meta content={siteDescription} property="og:description" />

            <meta content="yes" name="apple-mobile-web-app-capable" />
            <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
            <meta content={siteTitle} name="application-name" />

            <meta content="website" property="og:type" />
            <meta content={siteTitle} property="og:site_name" />
            {realCanonical && <meta content={realCanonical} property="og:url" />}
            {realCanonical && <meta content={realCanonical} name="twitter:url" />}
            {realCanonical && <link rel="canonical" href={realCanonical} />}

            {/* OpenGraph tags - includes LinkedIn */}
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={socialImage} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={siteDescription} />
            <meta name="twitter:image" content={socialImage} />


            <meta content="1024" name="twitter:image:width" />
            <meta content="512" name="twitter:image:height" />

            <meta content="1024" property="og:image:width" />
            <meta content="512" property="og:image:height" />

            <meta content="/icons/mstile-70x70.png" name="msapplication-square70x70" />
            <meta content="/icons/mstile-144x144.png" name="msapplication-square144x144" />
            <meta content="/icons/mstile-150x150.png" name="msapplication-square150x150" />
            <meta content="/icons/mstile-310x150.png" name="msapplication-wide310x150" />
            <meta content="/icons/mstile-310x310.png" name="msapplication-square310x310" />

            <link href="/manifest.json" rel="manifest" />

            <link href="/icons/apple-touch-icon-57x57.png" rel="apple-touch-icon" sizes="57x57" />
            <link href="/icons/apple-touch-icon-60x60.png" rel="apple-touch-icon" sizes="60x60" />
            <link href="/icons/apple-touch-icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
            <link href="/icons/apple-touch-icon-76x76.png" rel="apple-touch-icon" sizes="76x76" />
            <link href="/icons/apple-touch-icon-114x114.png" rel="apple-touch-icon" sizes="114x114" />
            <link href="/icons/apple-touch-icon-120x120.png" rel="apple-touch-icon" sizes="120x120" />
            <link href="/icons/apple-touch-icon-144x144.png" rel="apple-touch-icon" sizes="144x144" />
            <link href="/icons/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
            <link href="/icons/apple-touch-icon-167x167.png" rel="apple-touch-icon" sizes="167x167" />
            <link href="/icons/apple-touch-icon-180x180.png" rel="icon" sizes="180x180" type="image/png" />

            <link href="/icons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
            <link href="/icons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />

            <script type="application/ld+json">
                {JSON.stringify(
                    schemaGenerator({
                        location,
                        realCanonical,
                        siteUrl,
                        pageTitle,
                        siteTitle,
                        pageTitleFull,
                    })
                )}
            </script>
            <script src="https://js.stripe.com/v3/" />
        </Helmet>
    );
};

SEO.propTypes = {
    pageContext: PropTypes.object,
};

export default SEO;
