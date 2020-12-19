/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";

import Layout from "../components/layout";
import Button from "../components/button";
import Courses from "../components/courses";
import Author from "../components/author";
import LandingVideo from "../components/landing_page/landing-video";
import LandingImage from "../components/image_landing";
import OverviewSection from "../components/landing_page/overview-section";
import TestimonialsSection from "../components/landing_page/testimonials-section";
import AuthorSection from "../components/landing_page/author-section";
import FAQSection from "../components/landing_page/faqs-section";
import ContactSection from "../components/landing_page/contact-section";
import FooterContent from "../components/landing_page/footer-section";
import Guarantee from "../components/landing_page/guarantee";
import { SchoolImg } from "../images";

const SchoolLandingPage = ({ pageContext = {} }) => {
  const school = pageContext.school;
  const passedCourses = pageContext.courses;
  const landingPage = school?.landing_page;
  let themeStyles = school?.schoolThemeStyle;
  if (!themeStyles) {
    themeStyles = {
      primary: "green",
      secondary: "blue",
    };
  }

  // Section 1 - Intro
  const title = landingPage ? landingPage.title : school.name;
  const bgHeadImg = landingPage?.bgImg;
  const subtitle = landingPage?.subtitle;
  let initialCTA = landingPage?.initialCTA;
  if (!initialCTA) {
    initialCTA = {
      text: "View Courses",
      color: "#F7E476",
      link: "/#courses",
      textColor: "black",
    };
  }

  // Section 2 - Media
  const videoID = landingPage?.videoID;
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
      <section className="text-center">
        <div className="flex justify-center h-screen">
          <img
            src={SchoolImg}
            alt="intro"
            className="static w-screen object-cover text-white "
          />
          <div className="absolute bg-green-500 w-full h-screen bg-opacity-50 flex">
            <div className="bg-black w-full md:w-2/4 m-auto bg-opacity-50 p-8">
              <h1 className="mb-4 text-lg md:text-4xl text-white">{title}</h1>
              <h3 className="mb-4 text-sm md:text-sm text-white mx-2 md:mx-8 text-justify md:text-center">
                {subtitle}
              </h3>

              <Button
                to={initialCTA?.link}
                text={initialCTA?.text}
                color={initialCTA?.color}
                text_color={initialCTA?.textColor}
                variant={`primary_${themeStyles.primary}`}
              />
            </div>
          </div>
        </div>
      </section>
      {<LandingVideo videoID={videoID} />}
      {landingPage?.image?.url && <LandingImage landing={landingPage?.image} />}
      {<OverviewSection landingPage={landingPage} />}
      <Courses courses={passedCourses} />
      {<TestimonialsSection landingPage={landingPage} />}
      {<AuthorSection landingPage={landingPage} />}
      {<FAQSection landingPage={landingPage} />}

      {
        <Guarantee
          landingPage={landingPage}
          themeStyles={themeStyles}
          initialCTA={initialCTA}
        />
      }

      {<ContactSection landingPage={landingPage} />}
      {<FooterContent landingPage={landingPage} />}
    </Layout>
  );
};

export default SchoolLandingPage;
