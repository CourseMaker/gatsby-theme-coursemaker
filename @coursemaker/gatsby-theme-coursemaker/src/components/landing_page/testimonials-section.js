/** @jsx jsx */
import React from "react";
import ReactMarkdown from "react-markdown";
import {jsx} from "theme-ui";
import svg from '../../images/icons/icon-testimonials.svg';
import Icon from "../icon";

const TestimonialsSection = ({ landingPage }) => {
    if (landingPage == null)
        return null;
    const testimonialsHeading = landingPage?.testimonialsHeading;
    const testimonialsBody = landingPage?.testimonialsBody;  // markdown

    if (testimonialsHeading) {
        return (
            <section id="testimonials" className="py-16 text-center md:py-24">
                <div className="container">
                    <div className="mx-auto inner lg:w-7/12">
												<div className="mb-12">
													<Icon source={svg} />
													<h2>{testimonialsHeading}</h2>
												</div>
                        <div className="text-left text-gray-700 space-y-6">
                            <ReactMarkdown source={testimonialsBody}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    return null;
};

export default TestimonialsSection;
