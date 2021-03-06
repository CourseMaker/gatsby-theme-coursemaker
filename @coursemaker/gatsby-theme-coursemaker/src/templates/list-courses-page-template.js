import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

import Layout from '../components/layout';
import Courses from '../components/courses';
import { isAuthenticated, coursesFromJWT } from '../auth/auth';

const CoursesPage = ({ pageContext = {} }) => {
    const { courses } = pageContext;
    let schoolThemeStyle = pageContext.school?.schoolThemeStyle;
    if (!schoolThemeStyle) {
        schoolThemeStyle = {
            primaryColor: 'blue',
            secondaryColor: 'blue',
        };
    }

    useEffect(() => {
        if (!isAuthenticated()) navigate('/login');
    });

    let displayCourses = courses;

    if (process.env.GATSBY_ENABLE_PAYMENTS === true) {
        const enrolledCourses = coursesFromJWT();
        displayCourses = courses.filter((course) => enrolledCourses.includes(parseInt(course.id)));
    }

    return (
        <Layout schoolThemeStyle={schoolThemeStyle} pageContext={pageContext}>
            <Courses schoolThemeStyle={schoolThemeStyle} courses={displayCourses} paid />
        </Layout>
    );
};

export default CoursesPage;
