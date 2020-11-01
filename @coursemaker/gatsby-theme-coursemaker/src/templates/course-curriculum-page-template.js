import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import Breadcrumbs from "../components/course-breadcrumbs";
import _ from "lodash";

const Curriculum = ({ pageContext = {} }) => {
  const school = pageContext.school;
  const course = pageContext.course;
  const { author_display } = course;
  console.log(course);
  let allLectures = course?.sections?.map(
    (section) => section?.lectures?.map((item) => item))
    .flat(1);
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

              {_.orderBy(course?.sections,
                course?.sections?.[0].hasOwnProperty("order") ? "order": "id",
                "asc"
              ).map((section, index) => {
                return (
                  <Section
                    data={section}
                    size="big"
                    key={section.id}
                    allLectures={allLectures}
                    slug={course.slug}
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
