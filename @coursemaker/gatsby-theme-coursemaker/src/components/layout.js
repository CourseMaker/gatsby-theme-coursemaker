import React from "react";
import PropTypes from "prop-types";
import CookieConsent from "react-cookie-consent";
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import Header from "./header";
import Footer from "./footer";
import SEO from "./seo"

const Layout = ({ children, pageContext, pageTitle = '' }) => {
    return (
        <>
            <SEO siteTitle={pageContext.school.name}
                 siteDescription={pageContext.school?.subtitle}
                 canonical={pageContext.school?.sub_domain}
                 pageTitle={pageTitle}
            />
            <Header school={pageContext.school} />
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
            <Footer school={pageContext.school}/>
        </>
    );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.object,
};

Layout.defaultProps = {
  pageContext: {},
};

export default Layout;
