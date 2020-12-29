import React, { useEffect } from "react";
import { navigate } from "gatsby";
import Layout from "../components/layout";
import Checkout from "../components/checkout";
import {isAuthenticated} from "../auth/auth";

const CoursePaymentPage = ({ pageContext = {} }) => {
  // TODO: pass course price from front matter
  // TODO: pass stripe key from site config
  useEffect(() => {
    if (!isAuthenticated()) navigate("/register");
  });
  const course = pageContext.course;
  const school = pageContext.school;
  const priceInfo = course.price_info;

  let priceText = '';
  let recurrence = '';
  if (priceInfo?.product_type == 'single_course' && priceInfo?.is_active){
    priceText = priceInfo?.unit_amount_readable;
    recurrence = 'One-time purchase of: '
  } else if (priceInfo?.product_type == 'school_membership' && priceInfo?.is_active) {
    priceText = priceInfo?.unit_amount_readable;
    recurrence = priceInfo?.recurring_interval;
  }
  return (
    <Layout pageContext={pageContext}>
      <section className="py-16 pb-8 text-center md:pt-24">
        <div className="container">
          <h1 className="mb-4">{course.title}</h1>
        </div>
        <div className="container">
          <h3 className="mb-4">{recurrence} {priceText}</h3>
        </div>
        <Checkout school={school} course={course} />
      </section>
    </Layout>
  );
};

export default CoursePaymentPage;
