const _ = require("lodash");

const slugify = require(`slugify`);
// These templates are simply data-fetching wrappers that import components
const courseTemplate = require.resolve(`../../src/templates/course-landing-page-template.js`);
const curriculumTemplate = require.resolve('../../src/templates/course-curriculum-page-template.js');
const paymentTemplate = require.resolve('../../src/templates/course-payment-page-template.js');
const lectureTemplate = require.resolve('../../src/templates/lecture-page-template.js');
const schoolLandingTemplate = require.resolve('../../src/templates/school-landing-page-template.js');
const schoolLoginTemplate = require.resolve('../../src/templates/school-login-page-template.js');
const schoolRegistrationTemplate = require.resolve('../../src/templates/school-registration-page-template.js');

const createSchool = (school, courses, createPage) => {
    // create the school landing page
    createPage({
        path: '/',
        component: schoolLandingTemplate,
        context: {
            school,
            courses,
        },
    });

    // create the school login
    createPage({
        path: '/login',
        component: schoolLoginTemplate,
        context: {
            school,
            courses,
        },
    });

    // create the school sign-up
    createPage({
        path: '/register',
        component: schoolRegistrationTemplate,
        context: {
            school,
            courses,
        },
    });
};

const createCourses = (school, courses, createPage) => {
    courses.forEach((course /* i */) => {
        // Individual course landing pages
        const slug = course.slug ? course.slug : `/${slugify(course.title, { strict: true, lower: true })}/`;
        course.slug = slug;

        // Payment pages
        createPage({
            path: `/courses${slug}checkout`,
            component: paymentTemplate,
            context: {
                course,
                school,
            },
        });

        let allCourseLectures = [];
        if (course?.sections == null || course?.sections?.length === 0) {
            allCourseLectures = [];
        } else {
            allCourseLectures = course?.sections.map((section) => {
                if (section.lectures.length) {
                    let iteratee = 'order' in section?.lectures[0] ? 'order' : 'id';
                    return _.orderBy(
                        section?.lectures,
                        iteratee,
                        'asc'
                    ).map((item) => item);
                }
                return section.lectures.map((item) => item);
            })
            .flat(1)
        }

        createPage({
            path: `/courses${slug}`,
            component: courseTemplate,
            context: {
                course,
                school,
                allCourseLectures
            },
        });

        // Curriculum pages
        createPage({
            path: `/courses${slug}curriculum`,
            component: curriculumTemplate,
            context: {
                course,
                school,
                allCourseLectures
            },
        });

        // Individual lectures pages
        allCourseLectures.forEach((lecture) => {
            if (lecture.active) {
                let tempOrder = lecture?.order || ""
                let lecture_slug = `${lecture.id}${tempOrder}`;
                createPage({
                    path: `/courses${slug}lectures/${lecture_slug}`,
                    component: lectureTemplate,
                    context: {
                        course,
                        lecture,
                        allLectures: allCourseLectures,
                        school,
                    },
                });
            }
        });
    });
};

module.exports = { createSchool, createCourses };
