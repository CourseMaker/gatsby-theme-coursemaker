/** @jsx jsx */
import React from "react";
import ReactMarkdown from "react-markdown";
import { jsx } from "theme-ui";
import Img from "gatsby-image";

const TestimonialsSection = ({ landingPage }) => {
  if (landingPage == null) return null;
  const testimonialsHeading = landingPage?.testimonialsHeading;
  const testimonialsBody = landingPage?.testimonialsBody; // markdown

  if (testimonialsHeading) {
    return (
      <section id="testimonials" className="py-12 text-center">
        <div>
          <div className="mx-auto inner lg:w-7/12">
            <h2 className="mb-4 lg:mb-6">{testimonialsHeading}</h2>
            <div className="leading-loose text-gray-700 space-y-6">
              <ReactMarkdown source={testimonialsBody} />
            </div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default TestimonialsSection;
