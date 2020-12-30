import React from "react";

import Layout from "../components/layout";
import Button from "../components/button";
import Section from "../components/section";
import Author from "../components/author";
import LandingVideo from "../components/landing_page/landing-video";
import LandingImage from "../components/image_landing";
import { jsx } from "theme-ui";
import OverviewSection from "../components/landing_page/overview-section";
import TestimonialsSection from "../components/landing_page/testimonials-section";
import FAQSection from "../components/landing_page/faqs-section";
import ContactSection from "../components/landing_page/contact-section";

const CourseLandingPage = ({ pageContext = {} }) => {
  console.log(pageContext);
  const school = pageContext.school;
  const course = pageContext.course;
  const landingPage = course?.landing_page;
  let themeStyles = school?.schoolThemeStyle;
  if (!themeStyles) {
    themeStyles = {
      primary: "green",
      secondary: "blue",
    };
  }

  // Section 1 - Intro
  const title = landingPage ? landingPage.title : course.title;
  const subtitle = landingPage?.subtitle;
  let initialCTA = landingPage?.initialCTA;
  if (!initialCTA) {
    initialCTA = {
      text: "Purchase Course",
      color: "green",
      link: "checkout",
      textColor: "white",
    };
  }

  // Section 2 - Media
  const videoID = landingPage?.video_id;
  const imageID = landingPage?.image;

  // Section 3 - Overview

  // Section 4 - Curriculum

  // Section 5 - Testimonials

  // Section 6 - Author(s)
  const { author_display } = course;

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
          <Button
            to={`./${initialCTA?.link}`}
            text={initialCTA?.text}
            color={initialCTA?.color}
            text_color={initialCTA?.textColor}
            variant={`primary_${themeStyles.primary}`}
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

      {<LandingVideo videoID={videoID} />}
      {landingPage?.image && <LandingImage landing={landingPage?.image} />}

      {<OverviewSection landingPage={landingPage} />}

      <section id="course" className="pt-12 pb-12 lg:py-10 lg:pb-22">
        <div className="container mx-auto">
          <div className="mx-auto inner lg:w-8/12">
            <h2 className="mt-12 mb-6 leading-tight">Curriculum</h2>
            <div className="curriculum-list space-y-6">
              {course.sections.map((section) => {
                let allLectures = course?.sections
                  ?.map((section) => section?.lectures?.map((item) => item))
                  .flat(1);

                return (
                  <Section
                    data={section}
                    size="big"
                    key={section.id}
                    allLectures={allLectures}
                    slug={course.slug}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {<TestimonialsSection landingPage={landingPage} />}

      {<Author author_display={author_display} />}

      {<FAQSection landingPage={landingPage} />}

      {closingCTA && (
        <section
          id="cta"
          className="py-8 text-center text-white bg-gray-900 lg:py-24"
        >
          <div className="container">
            <div className="mx-auto inner lg:w-6/12">
              <Button
                to={`./${closingCTA?.link}`}
                text={closingCTA?.text}
                color={closingCTA?.color}
                text_color={closingCTA?.textColor}
                variant={`primary_${themeStyles.primary}`}
              />
            </div>
          </div>
        </section>
      )}

      {<ContactSection landingPage={landingPage} />}
    </Layout>
  );
};

export default CourseLandingPage;
