/** @jsx jsx */
import React from "react";
import Layout from "../components/layout";
import Button from "../components/button";
import Courses from "../components/courses";
import { jsx } from "theme-ui";


const SchoolLandingPage = ({ pageContext }) => {
  console.log(pageContext);
  const passedCourses = pageContext.courses;
  const landingPage = pageContext.school.landing_page;

  const title = landingPage.title_and_description.title;
  const description = landingPage.title_and_description.description;
  const primary_button = pageContext.school.landing_page.primary_button;
  const cta_button = landingPage.cta_button;
  const cta_section = landingPage.cta_section;
  const owner = pageContext.school.owner;

  return (
    <Layout>
      <section className="py-16 pb-8 text-center md:pt-30">
        <div className="container">
          <h1 className="mb-4">{title}</h1>
          <p className="mx-auto mb-6 text-xl font-light leading-relaxed text-gray-700 md:mb-10 lg:text-xl lg:w-7/12 xl:w-6/12">
          </p>

          <Button to="/courses" text={primary_button.text} variant="primary" />

          <div className="mt-12 scroll-to">
            <svg
              className="block w-6 mx-auto"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="#999"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.59 7.66l-8.69 8.68-8.49-8.48"
              />
            </svg>
          </div>
        </div>
      </section>

      <section id="overview" className="py-16 text-center bg-gray-100 md:py-32">
        <div className="container">
          <div className="mx-auto inner lg:w-7/12">
            <h2 className="mb-4 lg:mb-6">Overview</h2>
            <div className="leading-loose text-gray-700 space-y-6">
              <p>
                {description}
              </p>
            </div>
            <div className="mt-8 btn-wrapper">
              <Button to="/courses" text={primary_button.text} variant="primary" />
            </div>
          </div>
        </div>
      </section>

      <Courses courses={passedCourses} />

      <section
        id="author"
        className="py-16 text-center text-white bg-gray-900 lg:py-32"
      >
        <div className="container">
          <div className="mx-auto inner lg:w-5/12">
            <h2 className="mb-4 md:mb-6">{cta_section.title}</h2>
            <div className="leading-loose text-gray-200 space-y-6">
              <p>{cta_section.description}</p>
            </div>
            <div className="mt-8 btn-wrapper">
              <Button to="/courses" text={cta_button.text} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 text-center bg-gray-100 md:py-32">
        <div className="container">
          <div className="mx-auto inner lg:w-5/12">
            <h2 className="mb-4 mb:mb-6">Questions?</h2>
            <div className="text-xl text-gray-700 space-y-6">
              <p>
                <span>Any questions? Send an email to</span>
                <br />
                {owner && (
                  <a
                    href={`mailto:${owner.email}`}
                    sx={{
                      color: "primary",
                    }}
                  >
                    {owner.email}
                  </a>
                )}
              </p>
            </div>
            <div className="mt-8 btn-wrapper">
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SchoolLandingPage;