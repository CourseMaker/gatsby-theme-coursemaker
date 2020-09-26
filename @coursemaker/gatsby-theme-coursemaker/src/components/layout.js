import React from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Footer from "./footer";
import CookieConsent from "react-cookie-consent";
import { Helmet } from 'react-helmet';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
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
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
