import React from "react";

import Layout from "../components/layout";
import Section from "../components/section";
import Breadcrumbs from "../components/course-breadcrumbs";
import _ from "lodash";

const Curriculum = ({ pageContext = {} }) => {
  const school = pageContext.school;
  const course = pageContext.course;
  const { author_display } = course;

  let allLectures = course?.sections?.map(
    (section) => section?.lectures?.map((item) => item))
    .flat(1);
  let orderedSections;
  if (course.sections.length === 0 || course.sections === undefined) {
    orderedSections = []
  } else {
    orderedSections = _.orderBy(course?.sections,
      course?.sections?.[0].hasOwnProperty("order") ? "order" : "id",
      "asc"
    )
  }

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
              By {author_display?.title}
            </div>

            <h2 className="mt-12 mb-6 leading-tight">Curriculum</h2>
            <div className="curriculum-list space-y-10">
              {orderedSections.length > 0 ?
                orderedSections.map((section, index) => {
                  return (
                    <Section
                      data={section}
                      size="big"
                      key={section.id}
                      allLectures={allLectures}
                      slug={course.slug}
                    />
                  );
                }) : <p>No sections yet</p>
              }
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Curriculum;
