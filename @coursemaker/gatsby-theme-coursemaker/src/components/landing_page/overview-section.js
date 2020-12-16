/** @jsx jsx */
import React from "react";
import ReactMarkdown from "react-markdown";
import Button from "../button";
import { jsx } from "theme-ui";

const OverviewSection = ({ landingPage }) => {
  if (landingPage == null) return null;
  const overviewHeading = landingPage?.overviewHeading;
  const overviewBody = landingPage?.overviewBody; // markdown
  const overviewCTA = landingPage?.overviewCTA;

  if (overviewHeading) {
    return (
      <section id="overview" className="py-8 text-center  md:py-24">
        <div className="container">
          <div className="mx-auto inner lg:w-7/12">
            <h2 className="mb-4 lg:mb-6">{overviewHeading}</h2>
            <div className="leading-loose text-gray-700 space-y-6">
              <ReactMarkdown source={overviewBody} />
            </div>
            <div className="mt-8 btn-wrapper">
              {overviewCTA?.link && (
                <Button
                  to={overviewCTA?.link}
                  text={overviewCTA?.text}
                  color={overviewCTA?.color}
                  text_color={overviewCTA?.textColor}
                  variant="primary"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default OverviewSection;
