/** @jsx jsx */
import React from "react";
import ReactMarkdown from "react-markdown";
import { jsx } from "theme-ui";
import Img from "gatsby-image";

const AuthorSection = ({ landingPage }) => {
  if (landingPage == null) return null;
  const landingAuthorTitle = landingPage?.landingAuthorTitle;
  const landingAuthorSub = landingPage?.landingAuthorSub; // markdown
  const landingAuthorDesc = landingPage?.landingAuthorDesc; // markdown

  if (landingAuthorTitle) {
    return (
      <section id="testimonials" className="bg-gray-100 py-12 text-center ">
        <div className="container">
          <div className="mx-auto inner lg:w-7/12">
            <h2 className="text-gray-700">{landingAuthorTitle}</h2>
            <h3 className="text-sm mx-2 md:mx-8  text-gray-700">
              {landingAuthorSub}
            </h3>

            <div class="mt-4 md:flex">
              <div class="md:flex-shrink-0">
                <Img
                  className="object-cover m-auto rounded-lg my-2 w-40 h-40 md:w-48 md:h-48"
                  fluid={{ src: "https://picsum.photos/300/300" }}
                  alt="cover image"
                  imgStyle={{
                    objectPosition: "center",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div class="pl-0 md:pl-8 ">
                <p class="mt-2 text-gray-700 md:text-left text-justify">
                  {landingAuthorDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default AuthorSection;
