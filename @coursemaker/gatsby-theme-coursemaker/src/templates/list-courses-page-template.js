import React, { useEffect } from "react";
import { navigate } from "gatsby";

import Layout from "../components/layout";
import Courses from "../components/courses";
import { isAuthenticated, coursesFromJWT } from "../auth/auth";

const CoursesPage = ({ pageContext = {} }) => {
  const courses = pageContext.courses;
  let themeStyles = pageContext.school?.schoolThemeStyle;
  if (!themeStyles) {
    themeStyles = {
      primary: "green",
      secondary: "blue",
    };
  }

  useEffect(() => {
    if (!isAuthenticated()) navigate("/login");
  });

  let displayCourses = courses;

  if (process.env.GATSBY_ENABLE_PAYMENTS === true) {
    let enrolledCourses = coursesFromJWT();
    displayCourses = courses.filter((course) =>
      enrolledCourses.includes(parseInt(course.id))
    );
  }

  return (
    <Layout themeStyles={themeStyles} pageContext={pageContext}>
      <Courses themeStyles={themeStyles} courses={displayCourses} paid={true} />
    </Layout>
  );
};

export default CoursesPage;
