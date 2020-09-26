/** @jsx jsx */
import React from "react";
import Layout from "../components/layout";
import Button from "../components/button";
import Courses from "../components/courses";
import { jsx } from "theme-ui";


const SchoolLandingPage = ({ pageContext }) => {
  console.log(pageContext);
  const passedCourses = pageContext.courses;
  const mergedLandingPage = pageContext.school.landing_page;

  const title = mergedLandingPage.title_and_description.title;
  const description = mergedLandingPage.title_and_description.description;
  const cta_section = { title: "CTA Section", description: "Lorem Ipsum" };
  const owner = { email: "admin@alphaschool.io" };

  return (
    <Layout>
      <section className="py-16 pb-8 text-center md:pt-30">
        <div className="container">
          <h1 className="mb-4">{title}</h1>
          <p className="mx-auto mb-6 text-xl font-light leading-relaxed text-gray-700 md:mb-10 lg:text-xl lg:w-7/12 xl:w-6/12">
            {description}
          </p>

          <Button to="/x" text={"Primary Button"} variant="primary" />
          <Button text={"Secondary Button"} variant="secondary" />

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
                Learn how to integrate Stripe (and SCA support!) with Ruby on
                Rails 6 including one-time payments, subscriptions, upgrades,
                downgrades, refunds, webhooks and more.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="mt-8 btn-wrapper">
              <Button text={"Primary Button"} variant="primary" />
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
              <Button text="CTA Button" />
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
              <Button text={"Primary Button"} variant="primary" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SchoolLandingPage;