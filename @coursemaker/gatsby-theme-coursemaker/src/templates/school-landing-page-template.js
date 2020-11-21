/** @jsx jsx */
import { jsx } from "theme-ui";
import ReactMarkdown from "react-markdown";

import Layout from "../components/layout";
import Button from "../components/button";
import Courses from "../components/courses";
import Author from "../components/author";
import React from "react";

// TODO: CTA button defaults
// "/#courses"

// TODO: add video/image

const SchoolLandingPage = ({ pageContext = {} }) => {
  const school = pageContext.school;
  const passedCourses = pageContext.courses;
  const landingPage = school?.landing_page;
  console.log(pageContext);

  // Section 1 - Intro
  const title = (landingPage) ? landingPage.title : school.name;
  const subtitle = landingPage?.subtitle;
  const initialCTA = landingPage?.initialCTA;

  // Section 2 - Media
  const videoId = landingPage?.video_id;
  const imageId = landingPage?.image;

  // Section 3 - Overview
  const overviewHeading = landingPage?.overviewHeading;
  const overviewBody = landingPage?.overviewBody;  // markdown
  const overviewCTA = landingPage?.overviewCTA;

  // Section 4: Courses

  // Section 5 - Testimonials
  const testimonialsHeading = landingPage?.testimonialsHeading;
  const testimonialsBody = landingPage?.testimonialsBody;  // markdown

  // Section 6 - FAQ
  const faqHeading = landingPage?.faqHeading;
  const faqBody = landingPage?.faqBody;  // markdown

  // Section 7 - CTA
  const closingCTA = landingPage?.closingCTA;

  // Section 8 - Contact
  const contactHeading = landingPage?.contactHeading;
  const contactBody = landingPage?.contactBody;

  return (
    <Layout pageContext={pageContext}>
      <section className="py-8 pb-8 text-center md:pt-30">
        <div className="container">
          <h1 className="mb-4">{title}</h1>
          <h3 className="mb-4">{subtitle}</h3>
          <p className="mx-auto mb-6 text-xl font-light leading-relaxed text-gray-700 md:mb-10 lg:text-xl lg:w-7/12 xl:w-6/12" />

          <Button
            to={initialCTA?.link}
            text={initialCTA?.text}
            color={initialCTA?.color}
            text_color={initialCTA?.textColor}
            variant="primary"
          />

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

      {overviewHeading &&
      <section id="overview" className="py-8 text-center bg-gray-100 md:py-24">
        <div className="container">
          <div className="mx-auto inner lg:w-7/12">
            <h2 className="mb-4 lg:mb-6">{overviewHeading}</h2>
            <div className="leading-loose text-gray-700 space-y-6">
              <ReactMarkdown source={overviewBody}/>
            </div>
            <div className="mt-8 btn-wrapper">
              <Button
                  to={overviewCTA?.link}
                  text={overviewCTA?.text}
                  color={overviewCTA?.color}
                  text_color={overviewCTA?.textColor}
                  variant="primary"
              />
            </div>
          </div>
        </div>
      </section>
      }

      <Courses courses={passedCourses} />

      {testimonialsHeading &&
      <section id="testimonials" className="py-8 text-center bg-gray-100 md:py-24">
        <div className="container">
          <div className="mx-auto inner lg:w-7/12">
            <h2 className="mb-4 lg:mb-6">{testimonialsHeading}</h2>
            <div className="leading-loose text-gray-700 space-y-6">
              <ReactMarkdown source={testimonialsBody}/>
            </div>
          </div>
        </div>
      </section>
      }

      {faqHeading &&
      <section id="faqs" className="py-8 text-center bg-gray-100 md:py-24">
        <div className="container">
          <div className="mx-auto inner lg:w-7/12">
            <h2 className="mb-4 lg:mb-6">{faqHeading}</h2>
            <div className="leading-loose text-gray-700 space-y-6">
              <ReactMarkdown source={faqBody}/>
            </div>
          </div>
        </div>
      </section>
      }

      {closingCTA && (
          <section
              id="cta"
              className="py-8 text-center text-white bg-gray-900 lg:py-24"
          >
            <div className="container">
              <div className="mx-auto inner lg:w-6/12">
                <Button text="Purchase" to="./checkout" />
              </div>
            </div>
          </section>
      )}

      <section className="py-16 text-center bg-gray-100 md:py-24">
        <div className="container">
          <div className="mx-auto inner lg:w-5/12">
            <h2 className="mb-4 md:mb-6">Questions?</h2>
            <div className="text-xl text-gray-700 space-y-6">
              {contactHeading && (
              <p>
                <span>{contactHeading}</span>
                <br />
              </p>
              )}
            </div>
            <div className="mt-8 btn-wrapper" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SchoolLandingPage;
