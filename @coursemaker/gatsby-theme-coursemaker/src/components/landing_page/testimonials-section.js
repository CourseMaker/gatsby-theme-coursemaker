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
            {/* <div className="leading-loose text-gray-700 space-y-6">
                            <ReactMarkdown source={testimonialsBody}/>
                        </div> */}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="w-100 border-t rounded-lg border-solid border-2 p-4 text-center mx-4 md:m-0">
                <div className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  eleifend nibh vel blandit interdum. Phasellus vel sodales
                  justo, vel maximus tellus. Nulla semper risus nec massa
                  tincidunt.
                </div>
                <Img
                  className="object-cover rounded-full m-auto  my-2 w-24 h-24 md:h-36 md:w-36"
                  fluid={{ src: "https://picsum.photos/300/300" }}
                  alt="cover image"
                  imgStyle={{ objectPosition: "center", objectFit: "contain" }}
                />
                <h1 className="text-xl text-gray-700">Sam Smith</h1>
                <h3 className="text-sm mx-2 md:mx-8  text-gray-700">
                  Product Manager
                </h3>
              </div>
              <div class="w-100 border-t rounded-lg border-solid border-2 p-4 text-center mx-4 md:m-0">
                <div className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  eleifend nibh vel blandit interdum. Phasellus vel sodales
                  justo, vel maximus tellus. Nulla semper risus nec massa
                  tincidunt.
                </div>
                <Img
                  className="object-cover rounded-full m-auto  my-2 w-24 h-24 md:h-36 md:w-36"
                  fluid={{ src: "https://picsum.photos/300/300" }}
                  alt="cover image"
                  imgStyle={{ objectPosition: "center", objectFit: "contain" }}
                />
                <h1 className="text-xl text-gray-700">Sam Smith</h1>
                <h3 className="text-sm mx-2 md:mx-8  text-gray-700">
                  Product Manager
                </h3>
              </div>
              <div class="w-100 border-t rounded-lg border-solid border-2 p-4 text-center mx-4 md:m-0">
                <div className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  eleifend nibh vel blandit interdum. Phasellus vel sodales
                  justo, vel maximus tellus. Nulla semper risus nec massa
                  tincidunt.
                </div>
                <Img
                  className="object-cover rounded-full m-auto  my-2 w-24 h-24 md:h-36 md:w-36"
                  fluid={{ src: "https://picsum.photos/300/300" }}
                  alt="cover image"
                  imgStyle={{ objectPosition: "center", objectFit: "contain" }}
                />
                <h1 className="text-xl text-gray-700">Sam Smith</h1>
                <h3 className="text-sm mx-2 md:mx-8  text-gray-700">
                  Product Manager
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default TestimonialsSection;
