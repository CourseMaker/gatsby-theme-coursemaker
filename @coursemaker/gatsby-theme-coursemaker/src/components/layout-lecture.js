import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Footer from "./footer";
import Section from "./section";
import {
  bakeLocalStorage,
  deleteLocalStorage,
  readLocalStorage,
} from "../helpers/storage";
const LayoutLecture = ({
  children,
  lecture,
  lectureList,
  sections,
  totalLectures,
  currentCourse,
  pageContext = {},
}) => {
  const course = readLocalStorage("course");

  let completedLectures = course?.items?.length - 1;
  let progress =
    completedLectures >= 0
      ? parseInt((completedLectures / lectureList?.length) * 100)
      : 0;
  return (
    <>
      <Header school={pageContext.school} />
      <section id="lecture">
        <div className="flex-wrap lg:flex">
          <div className="lg:w-9/12">
            {children}
            <div className="hidden lg:block">
              <Footer />
            </div>
          </div>

          <div className="order-last w-full border-t border-gray-300 lg:border-t-0 lg:mt-10 lg:order-none lg:w-3/12 lg:mt-0">
            <div className="container lg:max-w-full">
              <div className="bottom-0 right-0 pt-8 pb-16 overflow-scroll border-l-0 border-gray-300 lg:border-l lg:pb-0 lg:pt-24 lg:h-full lg:w-3/12 lg:fixed sidebar">
                <div className="py-8 text-sm text-gray-600 lg:p-4 progress">
                  <div className="relative flex justify-between mb-2">
                    <div>{`${progress}%`} Complete</div>
                    <div>0/{totalLectures} Lectures</div>
                  </div>
                  <div className="relative h-2 overflow-hidden bg-gray-400 rounded-lg">
                    <div
                      className="absolute top-0 bottom-0 left-0 h-2 bg-green-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                {lectureList && (
                  <div className="curriculum-list space-y-6 lg:space-y-0">
                    {currentCourse?.sections?.map((section) => {
                      let allLectures = currentCourse?.sections
                        ?.map((section) =>
                          section?.lectures?.map((item) => item)
                        )
                        .flat(1);

                      return (
                        <Section
                          allLectures={allLectures}
                          lecture={lecture}
                          data={section}
                          size="small"
                          key={section.id}
                          course={course}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="block lg:hidden">
        <Footer />
      </div>
    </>
  );
};

LayoutLecture.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutLecture;
