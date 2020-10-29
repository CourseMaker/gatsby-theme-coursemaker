import React from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Footer from "./footer";
import CookieConsent from "react-cookie-consent";

const Layout = ({ children, pageContext }) => (
  <>
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
    <Footer />
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
