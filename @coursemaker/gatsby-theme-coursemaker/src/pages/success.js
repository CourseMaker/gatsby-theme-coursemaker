/** @jsx jsx */
import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import {jsx} from "theme-ui";

const PaymentSuccess = () => (
  <Layout>
    <div className="container">
      <h1>Payment Success!</h1>
      <Link
          to="/courses"
          sx={{
              color: `primary_green`,
          }}
          >Go to the courses
      </Link>
    </div>
  </Layout>
);

export default PaymentSuccess;
