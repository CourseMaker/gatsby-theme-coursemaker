/** @jsx jsx */
import React from "react";
import ReactMarkdown from "react-markdown";
import {jsx} from "theme-ui";

const FAQSection = ({ landingPage }) => {
    if (landingPage == null)
        return null;
    const faqHeading = landingPage?.faqHeading;
    const faqBody = landingPage?.faqBody;  // markdown

    if (faqHeading) {
        return (
            <section id="faqs" className="py-8 text-center bg-gray-100 md:py-24">
                <div className="container">
                    <div className="mx-auto inner lg:w-7/12">
                        <h2 className="mb-4 lg:mb-6">{faqHeading}</h2>
                        <div className="text-left text-gray-700 space-y-6">
                            <ReactMarkdown source={faqBody}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    return null;
};

export default FAQSection;
