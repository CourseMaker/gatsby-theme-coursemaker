/** @jsx jsx */
import { jsx } from "theme-ui";
import Img from "gatsby-image";
import ReactMarkdown from "react-markdown";
import Button from "./button";
import Layout from "./layout";
import React from "react";

const Author = ({ author_display, ...props }) => {
  let authorImage;
  if (author_display?.photo == null) {
    // default
    authorImage = { src: "https://picsum.photos/300/300" };
  } else if (author_display?.photo.childImageSharp != null) {
    authorImage = author_display.photo.childImageSharp.fluid;
  } else if (author_display?.photo) {
    // strapi hack
    authorImage = { src: author_display?.photo.url };
  }
  if (author_display?.photo){
    return (
      <section id="author" className="py-12 bg-gray-100">
        <div className="container">
          <div className="lg:items-center md:inline-flex lg:px-16 justify-content-center">
            <div className="md:flex">
              <Img
                className="block object-cover w-48 h-48 bg-gray-500 rounded-full author-photo lg:h-64 lg:w-64"
                fluid={authorImage}
                alt="cover image"
                imgStyle={{ objectPosition: "center", objectFit: "contain" }}
              />
          </div>
            <div className="w-full mt-8 md:pl-12 lg:pl-16 md:mt-0">
              <h3>{author_display.title}</h3>
              <p className="mb-6 text-xl font-light text-gray-600">
                {author_display.subtitle}
              </p>
              <div className="mb-4 leading-loose text-gray-700 md:mb-6 space-y-5">
                <ReactMarkdown source={author_display.description} />
              </div>
              <Button text="Curriculum" to="./curriculum" />
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (<div></div>)
  }
};

export default Author;
