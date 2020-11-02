require("dotenv").config();

exports.normalizeImageUrl = (course) => {
  let course_image = { url: "" };
  if (course.course_image)
    course.course_image = { url: course.course_image.url };
  else {
    console.log("\u001B[33m", `No course_image for "${course.title}"`);
    course.course_image = course_image;
  }

  return course;
};

module.exports.local = {
  courses: ({ node: course }) => {
    return { ...course };
  },
  school: ({ node: school }) => {
    return { ...school };
  },
};

module.exports.cms = {
  courses: ({ node: course }) => {
    return {
      ...course,
      course_image: normalizeImageUrl(course),
      course_video: normalizeVideoUrl(course),
    };
  },
  school: ({ node: school }) => {
    return {
      ...school,
      meta: "strapi",
    };
  },
};
