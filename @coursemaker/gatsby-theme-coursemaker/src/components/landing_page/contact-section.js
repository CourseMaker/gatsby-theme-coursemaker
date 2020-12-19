/** @jsx jsx */
import React from "react";
import ReactMarkdown from "react-markdown";
import { jsx } from "theme-ui";
import { Anchor } from "../../components/button";
import { Contact } from "../../images";

const ContactSection = ({ landingPage }) => {
  if (landingPage == null) return null;
  const contactHeading = landingPage?.contactHeading;
  const contactBody = landingPage?.contactBody;

  if (contactHeading) {
    return (
      <section className="text-center">
        <div className="flex justify-center">
          <div className="background-green w-full h-64 flex">
            <div className="m-auto inner lg:w-5/12">
              <h2 className="text-white">{contactHeading}</h2>
              <div className="text-xl text-white font-thin space-y-6">
                <ReactMarkdown source={contactBody} />
              </div>
              <div className="mt-8 btn-wrapper" />
            </div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default ContactSection;
