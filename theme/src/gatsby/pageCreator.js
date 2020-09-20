const slugify = require(`slugify`);
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

const createSchool = (school, courses, createPage) => {
  // create the school landing page
  createPage({
    path: "/",
    component: schoolLandingTemplate,
    context: {
      school: school,
      courses: courses,
    }
  })
}

const createCourses = (school, courses, createPage) => {
  courses.forEach(function(course, i){
    // Individual course landing pages
    console.log(course);
    console.log(i);
    let slug = course.slug ? course.slug : "/" + slugify(course.title, {strict: true, lower: true});
    const nextCourse = i === courses.length - 1 ? null : courses[i + 1];
    const previousCourse = i === 0 ? null : courses[i - 1];
    console.log(slug);
    console.log(course);
    createPage({
      path: "/courses/" + slug,
      component: courseTemplate,
      context: {
        course: course,
      },
    });

    // Curriculum pages
    createPage({
      path: `/courses/${slug}curriculum`,
      component: curriculumTemplate,
      context: {
        course: course,
        school: school
      },
    });

    // Individual lectures pages
    // TODO: strapi sections are not capitalizaed
    allCourseLectures = [];
    if (course.Sections) {
      course.Sections.forEach(function (section, i) {
        allCourseLectures.push(section.Lectures);
      });
    }

    allCourseLectures.forEach((lecture) => {
      createPage({
        path: `/courses/${slug}/lectures/${lecture.id}`,
        component: lectureTemplate,
        context: {
          course: course,
          lecture: lecture,
          allLectures: allCourseLectures,
        },
      });
    });
  });
};

module.exports = { createSchool, createCourses };
