import React from 'react';
import PropTypes from 'prop-types';
import CookieConsent from 'react-cookie-consent';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Helmet } from 'react-helmet';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, pageContext = null, schoolThemeStyle = { primaryColor: 'blue' } }) => (
    <>
        <Helmet>
            <html lang="en" />
            <script src="https://js.stripe.com/v3/" />
        </Helmet>
        <Header schoolThemeStyle={schoolThemeStyle} school={pageContext?.school} />
        <main>{children}</main>
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            declineButtonText="Decline"
            cookieName="gatsby-gdpr-google-analytics"
        >
            This site uses cookies ...
        </CookieConsent>
        <ToastContainer />
        <Footer schoolThemeStyle={schoolThemeStyle} school={pageContext?.school} />
    </>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    pageContext: PropTypes.object,
};

Layout.defaultProps = {
    pageContext: {},
};

export default Layout;
