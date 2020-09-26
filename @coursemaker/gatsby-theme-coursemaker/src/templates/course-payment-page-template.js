import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../components/layout-payment";
import Button from "../components/button";
import Section from "../components/section";
import Checkout from "../components/checkout";

const CoursePaymentPage = ({ pageContext }) => {
  // TODO: pass course price from front matter
  // TODO: pass stripe key from site config
  const course = pageContext.course;
  const school = pageContext.school;

  return (
    <Layout>
      <section className="py-16 pb-8 text-center md:pt-24">
        <div className="container">
          <h1 className="mb-4">{course.title}</h1>
        </div>
        <Checkout />
      </section>

    </Layout>
  );
};

export default CoursePaymentPage;