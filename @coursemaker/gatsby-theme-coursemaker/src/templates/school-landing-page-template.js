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
      "primaryColor": "blue",
      "secondaryColor": "blue"
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
    <Layout themeStyles={themeStyles} pageContext={pageContext}>
			<section className="py-16 md:py-20">
        <div className="container">
            {landingPage?.image &&
            <div className="flex-wrap items-center md:flex">
                <div
                    className="text-center border-gray-300 md:w-1/2 md:border-r left-side lg:pr-20 md:pr-16 md:text-left">
                    <h1 className="mb-4 leading-tight md:mb-6">{title}</h1>
                    <h3 className="mb-4 font-sans font-light opacity-50">{subtitle}</h3>
                    <p className="mx-auto mb-6 text-xl font-light leading-relaxed text-gray-700 md:mb-10 lg:text-xl lg:w-7/12 xl:w-6/12"/>

                    {initialCTA?.color &&
                    <Button
                        to={initialCTA?.link}
                        text={initialCTA?.text}
                        color={themeStyles.primaryColor}
                    />
                    }

                </div>
                {/* left-side */}

                <div className="mt-10 md:w-1/2 right-side md:mt-0">
                    {landingPage?.image &&
                    <LandingImage landing={landingPage?.image}/>
                    }

                </div>
                {/* right-side  */}
            </div>
            }

            {!landingPage?.image &&
            <div className="flex-wrap items-center md:flex">
                <div
                    className="items-center text-center border-gray-300">
                    <h1 className="mb-4 leading-tight text-center md:mb-6">{title}</h1>
                    <h3 className="mb-4 font-sans font-light text-center opacity-50">{subtitle}</h3>
                    <p className="mx-auto mb-6 text-xl font-light leading-relaxed text-gray-700 md:mb-10 lg:text-xl lg:w-7/12 xl:w-6/12"/>

                    {initialCTA?.color &&
                    <Button
                        to={initialCTA?.link}
                        text={initialCTA?.text}
                        color={initialCTA?.color}
                        text_color={initialCTA?.textColor}
                        variant={`primary_${themeStyles.primaryColor}`}
                    />
                    }

                </div>
            </div>
            }

        </div>
      </section>

      {<LandingVideo videoID={videoID} />}

      {<OverviewSection themeStyles={themeStyles} landingPage={landingPage} />}

      <Courses themeStyles={themeStyles} courses={passedCourses} />

      {<TestimonialsSection themeStyles={themeStyles} landingPage={landingPage} />}

      {<FAQSection themeStyles={themeStyles} landingPage={landingPage} />}

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

      {<ContactSection themeStyles={themeStyles} landingPage={landingPage} />}
    </Layout>
  );
};

export default SchoolLandingPage;
