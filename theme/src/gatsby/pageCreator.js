// These templates are simply data-fetching wrappers that import components
const courseTemplate = require.resolve(
  `../../src/templates/course-landing-page-template.js`
);
const curriculumTemplate = require.resolve(
  "../../src/templates/course-curriculum-page-template.js"
);
const lectureTemplate = require.resolve(
  "../../src/templates/lecture-page-template.js"
);
const schoolLandingTemplate = require.resolve(
  "../../src/templates/school-landing-page-template.js"
);

const createSchoolMDX = (school, createPage) => {
  // create the school landing page
  createPage({
    path: "/",
    component: schoolLandingTemplate,
    context: {
      title: school.title,
    }
  })
}

const createCoursesMDX = (courses, createPage) => {
  // create landing page for each course
  courses.forEach(({ node: course }, i) => {
    const nextCourse = i === courses.length - 1 ? null : courses[i + 1];
    const previousCourse = i === 0 ? null : courses[i - 1];
    const { slug } = course;
    createPage({
      path: "/courses" + slug,
      component: courseTemplate,
      context: {
        id: course.id,
        course,
        previousCourse,
        nextCourse,
      },
    });
    // create curriculum page for each course
    createPage({
      path: `/courses${slug}curriculum`,
      component: curriculumTemplate,
      context: {
        course_id: course.id,
      },
    });
    // TODO: tidy up inefficient nested loops
    // create page for each lecture
    course.Sections.forEach(function (section, index) {
      console.log(section);
      section.Lectures.forEach(function (lecture, index) {
        createPage({
          path: `/courses${slug}lectures/${lecture.id}`,
          component: lectureTemplate,
          context: {
            course_id: course.id,
            section_id: section.id,
            lecture_id: lecture.id,
            lecture_id_string: lecture.id,
          },
        });
      });
    });
  });
};

const createSchoolStrapi = (school, createPage, build_id) => {
  // create the school landing page
  createPage({
    path: "/",
    component: schoolLandingTemplate,
    context: {
      title: school.title,
      build_id: build_id,
      fromStrapi: true
    }
  })
}

const createCoursesStrapi = (courses, createPage, build_id) => {
  courses.forEach((course) => {
    // courses
    createPage({
      path: `/courses/${course.title}`,
      component: courseTemplate,
      context: {
        id: course.id,
        build_id,
        fromStrapi: true,
      },
    });

    // curriculums
    createPage({
      path: `/courses/${course.title}/curriculum`,
      component: curriculumTemplate,
      context: {
        course_id: course.id,
        build_id,
        fromStrapi: true,
      },
    });

    // lectures
    course.sections.forEach((section) => {
      section.lectures.forEach((lecture) => {
        createPage({
          path: `/courses/${course.title}/lectures/${lecture.id}`,
          component: lectureTemplate,
          context: {
            course_id: course.id,
            section_id: section.id,
            lecture_id: lecture.id,
            lecture_id_string: lecture.id,
            build_id,
            fromStrapi: true,
          },
        });
      });
    });
  });
};

module.exports = { createCoursesMDX, createCoursesStrapi, createSchoolMDX, createSchoolStrapi };
