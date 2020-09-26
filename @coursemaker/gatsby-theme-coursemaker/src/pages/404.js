import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="container">
        <h1>404 Error</h1>
        <p>You just hit a route that doesn&#39;t exist...</p>
        <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
