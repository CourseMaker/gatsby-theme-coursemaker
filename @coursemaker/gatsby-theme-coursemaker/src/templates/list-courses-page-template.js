import React, {useEffect} from "react";
import Layout from "../components/layout";
import Courses from "../components/courses";
import {navigate} from "gatsby";
import { isAuthenticated, coursesFromJWT } from "../auth/auth";


const CoursesPage = ({ pageContext }) => {
  const courses = pageContext.courses;
  useEffect(() => {
    if (!isAuthenticated()){
      navigate('/login')
    }
  })

  let displayCourses = courses;
  if (process.env.GATSBY_ENABLE_PAYMENTS === true){
    console.log(process.env.GATSBY_ENABLE_PAYMENTS);
    let enrolledCourses = coursesFromJWT()
    displayCourses = courses.filter((course) => enrolledCourses.includes(parseInt(course.id)))
  }

  return (
    <Layout pageContext={pageContext}>
      <Courses courses={displayCourses} />
    </Layout>
  );
};

export default CoursesPage;
