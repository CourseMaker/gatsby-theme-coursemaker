import React from "react";
import { Link } from "gatsby";
import slugify from "slugify";
import Img from "gatsby-image";

const Card = ({ course }) => {
  console.log(course);
  let slug = course.slug ? course.slug : "/" + slugify(course.title, {strict: true, lower: true});
  const courseAuthor = course.author_display.title || "";

  let courseImage;
  if (course.course_image == null) {
    // default
    courseImage = {"src": "https://picsum.photos/300/300"};
  } else if (course.course_image.childImageSharp != null) {
    courseImage = course.course_image.childImageSharp.fluid;
  } else if (course.course_image.url){
    // strapi hack
    courseImage = {"src": course.course_image.url}
  }

  return (
    <Link
      to={`/courses${slug}`}
      className="block overflow-hidden bg-white border-t border-gray-200 rounded-lg shadow md:shadow-md transition transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="md:flex">
        <Img
          className="object-cover w-full h-40 md:h-64 md:w-1/2"
          fluid={courseImage}
          alt="cover image"
        />
        <div className="p-6 md:px-10 md:py-8 md:w-1/2">
          <h4 className="mb-1 text-xl font-semibold">{course.title}</h4>
          <h4 className="mb-6 font-normal text-gray-900">By {courseAuthor}</h4>
          <p className="font-light leading-relaxed text-gray-700">
            {course.description_overview}
          </p>
          <div className="mt-4 text-sm btn btn-sm btn-default">Learn more</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
