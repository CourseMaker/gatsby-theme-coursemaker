import React from "react";
import PropTypes from "prop-types";
import CookieConsent from "react-cookie-consent";
import { Helmet } from "react-helmet";

import Header from "./header";
import Footer from "./footer";

const Layout = ({ children, pageContext }) => (
  <>
    <Helmet>
      <html lang="en" />
      <script src="https://js.stripe.com/v3/" />
    </Helmet>

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
