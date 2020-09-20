import React from "react";
import Layout from "../components/layout";
import Courses from "../components/courses";

const CoursesPage = ({ pageContext }) => {
  const courses = pageContext.courses;
  return (
    <Layout>
      <Courses courses={courses} />
    </Layout>
  );
};

export default CoursesPage;
