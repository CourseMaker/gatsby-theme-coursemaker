require("dotenv").config();

exports.normalizeImageUrl = (course) => {
  let course_image = {
    url: {},
  };
  if (course.course_image) {
    course.course_image = {
      url: process.env.CMS_BASE_PATH + course.course_image.url,
    };
  } else {
    console.log('\u001B[33m', `Missing course_image for "${course.title}"`);
  }

  return course;
}

module.exports.local = {
  courses: ({ node: course }) => {
    return {
      ...course,
    };
  },
  school: ({node: school}) => {
    return {
      ...school,
    }
  }
};

module.exports.cms = {
  courses: ({ node: course }) => {
    return {
      ...course,
      course_image: normalizeImageUrl(course)
    };
  },
  school: ({node: school}) => {
    return {
      ...school,
      meta: "strapi",
    };
  }
};
