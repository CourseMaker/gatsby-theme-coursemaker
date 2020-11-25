/** @jsx jsx */
import React from "react";
import ReactMarkdown from "react-markdown";
import {jsx} from "theme-ui";
import Layout from "../layout";

const ContactSection = ({ landingPage }) => {
    if (landingPage == null)
        return null;
    const contactHeading = landingPage?.contactHeading;
    const contactBody = landingPage?.contactBody;

    if (contactHeading) {
        return (
            <section className="py-16 text-center bg-gray-100 md:py-24">
                <div className="container">
                    <div className="mx-auto inner lg:w-5/12">
                        <h2 className="mb-4 md:mb-6">{contactHeading}</h2>
                        <div className="text-xl text-gray-700 space-y-6">
                            <p>{contactBody}</p>
                        </div>
                        <div className="mt-8 btn-wrapper"/>
                    </div>
                </div>
            </section>
        );
    }
    return null;
};

export default ContactSection;
