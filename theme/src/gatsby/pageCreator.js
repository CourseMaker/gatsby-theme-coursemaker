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
        id: course.id,
        title: course.title,
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
            title: course.title,
            id: course.id,
          },
        });
      });
    });
  });
};

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
        id: course.id,
        build_id,
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
            id: lecture.id,
            build_id,
          },
        });
      });
    });
  });
};

module.exports = { createCoursesMDX, createCoursesStrapi };
