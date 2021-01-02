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
import Icon from "../components/icon";
import svg from '../images/icons/icon-courses.svg';

const CourseLandingPage = ({ pageContext = {} }) => {
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
                            color={initialCTA?.color}
                            text_color={initialCTA?.textColor}
                            variant={`primary_${themeStyles.primary}`}
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
                            variant={`primary_${themeStyles.primary}`}
                        />
                        }

                    </div>
                </div>
                }

        </div>
      </section>

      {<LandingVideo videoID={videoID} />}

      {<OverviewSection landingPage={landingPage} />}

			<section id="course" className="py-16 bg-gray-200 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto inner lg:w-8/12">
						<div className="mb-12 text-center">
							<Icon source={svg} />
							<h2>Curriculum</h2>
						</div>
            <div className="curriculum-list space-y-6">
              {course.sections.map((section, index) => {
                let allLectures = course?.sections
                  ?.map((section) => section?.lectures?.map((item) => item))
                  .flat(1);

								let isCollapse = true;
								if(index > 2) isCollapse = false;

                return (
                  <Section
                    data={section}
                    size="big"
                    key={section.id}
                    allLectures={allLectures}
                    slug={course.slug}
										isCollapse={isCollapse}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {<TestimonialsSection landingPage={landingPage} />}

      {<FAQSection landingPage={landingPage} />}

      {<Author author_display={author_display} />}

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
