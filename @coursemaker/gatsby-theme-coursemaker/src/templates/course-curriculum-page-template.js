import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import Breadcrumbs from "../components/course-breadcrumbs";
import { readLocalStorage } from "../helpers/storage";

const Curriculum = ({ pageContext = {} }) => {
  // TODO: add to data model
  // 	const { primary_button, cta_button } = {
  // 	  "color": "blue",
  //     "text": "test",
  //     "text_color": "black"
  //   };
  // const cta_section = { "title": "cta test", "description": "cta desc" };
  // const author = { "username": "joe", "email": "yoyo@gmail.com" };

  const school = pageContext.school;

  const course = pageContext.course;

  const storedCourse = readLocalStorage("course");
  const { author_display } = course;
  return (
    <Layout pageContext={pageContext}>
      <section className="pt-5">
        <div className="container mx-auto">
          <Breadcrumbs school={school} course={course} />
        </div>
      </section>

      <section id="course" className="pt-12 pb-12 lg:py-20 lg:pb-32">
        <div className="container mx-auto">
          <div className="mx-auto inner lg:w-8/12">
            <h1 className="leading-tight">{course.title}</h1>
            <div className="mb-4 text-2xl font-light text-gray-600">
              {course.subtitle}
            </div>
            <div className="text-lg font-semibold">
              By {author_display.title}
            </div>

            <h2 className="mt-12 mb-6 leading-tight">Curriculum</h2>
            <div className="curriculum-list space-y-10">
              {course.sections.map((section) => {
                let allLectures = course?.sections
                  ?.map((section) => section?.lectures?.map((item) => item))
                  .flat(1);
                return (
                  <Section
                    data={section}
                    size="big"
                    key={section.id}
                    allLectures={allLectures}
                    course={storedCourse}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Curriculum;
