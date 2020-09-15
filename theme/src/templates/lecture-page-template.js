import React from "react";
import { Link, graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import Layout from "../components/layout";
import LayoutLecture from "../components/layout-lecture";
import Breadcrumbs from "../components/course-breadcrumbs";

const Lecture = ({ pageContext, data }) => {
  //   console.log(pageContext);
  console.log(data);

  const lecture = data.currentCourse || data.cms.lecture;

  console.log(lecture);

  const allLectures =
    (lecture.section && lecture.section.lectures) || lecture.sections;
  let nextLecture;
  let prevLecture;

  allLectures.forEach(function (item, i) {
    if (item.id === lecture.id) {
      if (i <= allLectures.length - 1) {
        nextLecture = allLectures[i + 1];
      }
      if (i > 0) {
        prevLecture = allLectures[i - 1];
      }
      if (i === 0) {
        prevLecture = false;
      }
      if (i === allLectures.length - 1) {
        nextLecture = false;
      }
    }
  });

  return (
    <LayoutLecture
      lecture={lecture}
      lectureList={allLectures}
      totalLectures={allLectures.length}
    >
      {/* video */}
      <div className="bg-black video-wrapper">
        <iframe
          title="video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dXu_m1LVaYA"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* course header */}
      <div className="pt-5 border-b border-gray-300">
        <div className="container lg:max-w-full">
          {/* <Breadcrumbs school={school} course={course} lecture={lecture} /> */}
          <div className="items-end justify-between pt-4 pb-6 lg:flex">
            <div>
              <h2 className="leading-tight">{lecture.title}</h2>
              <div className="font-light text-gray-600 md:text-2xl">
                We need a lecture subtitle field
              </div>
            </div>

            {/* .controls */}
            <div className="flex mt-5 controls space-x-6 lg:mt-0">
              {prevLecture && (
                <Link to={`../${prevLecture.id}`} className="btn btn-gray">
                  Previous
                </Link>
              )}
              {nextLecture && (
                <Link to={`../${nextLecture.id}`} className="btn btn-default">
                  Next
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* course content */}
      <div className="w-full py-12 mx-auto lg:py-16 lg:w-9/12">
        <div className="container">
          <div className="font-light leading-relaxed text-gray-700 description space-y-4 lg:w-11/12">
            <ReactMarkdown source={lecture.description} />
          </div>
        </div>
      </div>
    </LayoutLecture>
  );
};

export default Lecture;

export const query = graphql`
  query(
    $fromStrapi: Boolean! = false
    # $build_id: ID! = 0
    $course_id: String!
    $lecture_id: ID!
    $lecture_id_string: String!
  ) {
    currentCourse: course(id: { eq: $course_id }) {
      ...CourseMDXFragment
    }

    lecture(id: { eq: $lecture_id_string }) {
      id
      title
    }

    cms @include(if: $fromStrapi) {
      lecture(id: $lecture_id) {
        id
        title
        section {
          title
          lectures {
            id
            title
          }
          course {
            id
            title
          }
        }
      }
    }
  }
`;
