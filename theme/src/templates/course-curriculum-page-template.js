import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Section from "../components/section";
import Breadcrumbs from "../components/course-breadcrumbs";

const Curriculum = ({ pageContext, data }) => {
  // TODO: add to data model
  // 	const { primary_button, cta_button } = {
  // 	  "color": "blue",
  //     "text": "test",
  //     "text_color": "black"
  //   };
  // const cta_section = { "title": "cta test", "description": "cta desc" };
  // const author = { "username": "joe", "email": "yoyo@gmail.com" };
  const photo = { url: "abc.com" };
  const author_display = {
    title: "joe",
    subtitle: "bar",
    photo: photo,
    description: "foo",
  };
  const school = "school"; //todo
  console.log(data);

  const course = pageContext.build_id
    ? data.cms.siteBuild.school.courses[0]
    : data.currentCourse;

  return (
    <Layout>
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
              {course.sections.map((section) => (
                <Section data={section} size="big" key={section.id} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Curriculum;

export const query = graphql`
  query CurriculumQuery(
    $fromStrapi: Boolean! = false
    $build_id: ID! = 0
    $id: String!
  ) {
    currentCourse: course(id: { eq: $id }) {
      ...CourseMDXFragment
    }

    cms @include(if: $fromStrapi) {
      siteBuild(id: $build_id) {
        school {
          courses(where: { id: $id }) {
            ...CourseCMSFragment
          }
        }
      }
    }
  }
`;
