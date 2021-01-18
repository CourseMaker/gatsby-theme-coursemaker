/** @jsx jsx */
import { jsx } from 'theme-ui';

import React, {useEffect} from 'react';
import Layout from '../components/layout';
import Button from '../components/button';
import Courses from '../components/courses';
import CTA from '../components/cta';
import LandingVideo from '../components/landing_page/landing-video';
import LandingImage from '../components/image_landing';
import OverviewSection from '../components/landing_page/overview-section';
import TestimonialsSection from '../components/landing_page/testimonials-section';
import FAQSection from '../components/landing_page/faqs-section';
import ContactSection from '../components/landing_page/contact-section';
import {isAuthenticated} from "../auth/auth";
import {navigate} from "gatsby";

const SchoolLandingPage = ({ pageContext }) => {
    const school = pageContext?.school;
    const passedCourses = pageContext?.courses;

    // If a school only has one course, it makes sense to simply
    // Redirect to that course's landing page as the school landing
    // page is better suited to sites with multiple courses.
    useEffect(() => {
        if (passedCourses && passedCourses.length === 1) {
            console.log(passedCourses);
            console.log(window.location.href)
            navigate(`${window.location.href}courses${passedCourses[0].slug}`);
        }
    }, []);

    const landingPage = school?.landing_page;
    let schoolThemeStyle = school?.schoolThemeStyle;
    if (!schoolThemeStyle) {
        schoolThemeStyle = {
            primaryColor: 'blue',
            secondaryColor: 'blue',
        };
    }

    // Section 1 - Intro
    const title = school?.name;
    const subtitle = landingPage?.subtitle;
    let initialCTA = landingPage?.initialCTA;
    if (!initialCTA) {
        initialCTA = {
            text: 'View Courses',
            color: 'blue',
            link: '/#courses',
            textColor: 'white',
        };
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
        <Layout schoolThemeStyle={schoolThemeStyle} pageContext={pageContext}>
            <section className="py-16 md:py-20">
                <div className="container">
                    {landingPage?.image && (
                        <div className="flex-wrap items-center md:flex">
                            <div className="text-center border-gray-300 md:w-1/2 md:border-r left-side md:text-left">
                                <h1 className="mb-4 text-center leading-tight md:mb-6">{title}</h1>
                                <h3 className="mb-4 text-center font-sans font-light opacity-50">{subtitle}</h3>
                                <p className="mx-auto text-center mb-6 text-xl font-light leading-relaxed text-gray-700 md:mb-10 lg:text-xl lg:w-7/12 xl:w-6/12" />
                                {initialCTA?.color && (
                                    <div className="text-center">
                                        <Button
                                            to={initialCTA?.link}
                                            text={initialCTA?.text}
                                            color={schoolThemeStyle?.primaryColor}
                                        />
                                    </div>
                                )}
                            </div>
                            {/* left-side */}

                            <div className="mt-10 md:w-1/2 right-side md:mt-0">
                                {landingPage?.image && <LandingImage landing={landingPage?.image} />}
                            </div>
                            {/* right-side  */}
                        </div>
                    )}

                    {!landingPage?.image && (
                        <div>
                            <h1 className="mb-4 text-center">{title}</h1>
                            <h3 className="mb-4 text-center">{subtitle}</h3>
                            <p className="mx-auto text-center mb-6 text-xl font-light leading-relaxed text-gray-700 md:mb-10 lg:text-xl lg:w-7/12 xl:w-6/12" />
                            {initialCTA?.color && (
                                <div className="text-center">
                                    <Button
                                        to={initialCTA?.link}
                                        text={initialCTA?.text}
                                        color={schoolThemeStyle?.primaryColor}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {<LandingVideo videoID={videoID} />}

            {<OverviewSection schoolThemeStyle={schoolThemeStyle} landingPage={landingPage} />}

            <Courses schoolThemeStyle={schoolThemeStyle} courses={passedCourses} />

            {<TestimonialsSection schoolThemeStyle={schoolThemeStyle} landingPage={landingPage} />}

            {<FAQSection schoolThemeStyle={schoolThemeStyle} landingPage={landingPage} />}

            {<ContactSection schoolThemeStyle={schoolThemeStyle} landingPage={landingPage} />}
        </Layout>
    );
};

export default SchoolLandingPage;
