import React from "react";
import PropTypes from "prop-types";
import Seo from "./seo";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
	return (
		<>
			<Seo />
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
