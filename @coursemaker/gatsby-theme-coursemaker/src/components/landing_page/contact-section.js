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
  const contactEmail = landingPage?.contactEmail;

  if (contactHeading) {
    return (
      <section className="text-center">
        <div className="flex justify-center">
          <img
            src={Contact}
            alt="intro"
            className="static h-64 w-screen object-cover text-white "
          />
          <div className="absolute bg-green-700 w-full h-64 bg-opacity-50 flex">
            <div className="m-auto inner lg:w-5/12">
              <h2 className="text-white">{contactHeading}</h2>
              <div className="text-xl text-white font-thin space-y-6">
                <ReactMarkdown source={contactBody} />
              </div>
              <Anchor to={`mailto:${contactEmail}`}>{contactEmail}</Anchor>
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
