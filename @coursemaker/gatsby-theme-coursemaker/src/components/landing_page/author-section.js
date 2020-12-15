/** @jsx jsx */
import React from "react";
import ReactMarkdown from "react-markdown";
import { jsx } from "theme-ui";
import Img from "gatsby-image";

const AuthorSection = ({ landingPage }) => {
  console.log("landing page", landingPage);
  if (landingPage == null) return null;
  const testimonialsHeading = landingPage?.testimonialsHeading;
  const testimonialsBody = landingPage?.testimonialsBody; // markdown

  if (testimonialsHeading) {
    return (
      <section id="testimonials" className="bg-gray-100 py-12 text-center ">
        <div className="container">
          <div className="mx-auto inner lg:w-7/12">
            <h2 className="text-gray-700">Author</h2>
            <h3 className="text-sm mx-2 md:mx-8  text-gray-700">Lorem Ipsum</h3>

            <div class="mt-4 md:flex">
              <div class="md:flex-shrink-0">
                <Img
                  className="object-cover m-auto rounded-lg my-2 w-24 h-24 md:w-48 md:h-48"
                  fluid={{ src: "https://picsum.photos/300/300" }}
                  alt="cover image"
                  imgStyle={{
                    objectPosition: "center",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div class="pl-8">
                <p class="mt-2 text-gray-700 md:text-left text-justify">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt.
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
