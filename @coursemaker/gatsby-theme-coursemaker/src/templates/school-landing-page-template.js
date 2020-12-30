/** @jsx jsx */
import { jsx } from "theme-ui";

import Layout from "../components/layout";
import Button from "../components/button";
import Courses from "../components/courses";
import Author from "../components/author";
import LandingVideo from "../components/landing_page/landing-video";
import React from "react";
import LandingImage from "../components/image_landing";
import OverviewSection from "../components/landing_page/overview-section";
import TestimonialsSection from "../components/landing_page/testimonials-section";
import FAQSection from "../components/landing_page/faqs-section";
import ContactSection from "../components/landing_page/contact-section";


const SchoolLandingPage = ({ pageContext }) => {
  const school = pageContext?.school;
  const passedCourses = pageContext?.courses;
  const landingPage = school?.landing_page;
  let themeStyles = school?.schoolThemeStyle;
  if (!themeStyles) {
    themeStyles = {
      "primary": "green",
      "secondary": "blue"
    }
  }

  // Section 1 - Intro
  const title = (landingPage) ? landingPage.title : school.name;
  const subtitle = landingPage?.subtitle;
  let initialCTA = landingPage?.initialCTA;
  if (!initialCTA){
    initialCTA = {
      "text": "View Courses",
      "color": "green",
      "link": "/#courses",
      "textColor": "white"
    }
  }

  // Section 2 - Media
  const videoID = landingPage?.video_id;
  const imageID = landingPage?.image;

  // Section 3 - Overview
  // Section 4: Courses
  // Section 5 - Testimonials
  // Section 6 - FAQ

  // Section 7 - CTA
  const closingCTA = landingPage?.closingCTA;

  // Section 8 - Contact

  return (
    <Layout pageContext={pageContext}>
      <section className="py-8 pb-8 text-center md:pt-30">
        <div className="container">
          <h1 className="mb-4">{title}</h1>
          <h3 className="mb-4">{subtitle}</h3>
          <p className="mx-auto mb-6 text-xl font-light leading-relaxed text-gray-700 md:mb-10 lg:text-xl lg:w-7/12 xl:w-6/12" />

          {initialCTA?.color &&
            <Button
                to={initialCTA?.link}
                text={initialCTA?.text}
                color={initialCTA?.color}
                text_color={initialCTA?.textColor}
                variant={`primary_${themeStyles.primary}`}
            />
          }

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

      {<LandingVideo videoID={videoID} />}

      {landingPage?.image &&
        <LandingImage landing={landingPage?.image} />
      }

      {<OverviewSection landingPage={landingPage} />}

      <Courses courses={passedCourses} />

      {<TestimonialsSection landingPage={landingPage} />}

      {<FAQSection landingPage={landingPage} />}

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

      {<ContactSection landingPage={landingPage} />}
    </Layout>
  );
};

export default SchoolLandingPage;
