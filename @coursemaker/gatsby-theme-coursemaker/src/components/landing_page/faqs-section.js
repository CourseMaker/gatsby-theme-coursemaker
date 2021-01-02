/** @jsx jsx */
import React from "react";
import ReactMarkdown from "react-markdown";
import {jsx} from "theme-ui";
import svg from '../../images/icons/icon-faqs.svg';
import Icon from "../icon";

const FAQSection = ({ themeStyles, landingPage }) => {
    if (landingPage == null)
        return null;
    const faqHeading = landingPage?.faqHeading;
    const faqBody = landingPage?.faqBody;  // markdown

    if (faqHeading) {
        return (
            <section id="faqs" className="py-16 text-center bg-gray-200 md:py-24">
                <div className="container">
                    <div className="mx-auto inner lg:w-7/12">
												<div className="mb-12">
													<Icon color={themeStyles.primaryColor} source={svg} />
													<h2>{faqHeading}</h2>
												</div>
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
