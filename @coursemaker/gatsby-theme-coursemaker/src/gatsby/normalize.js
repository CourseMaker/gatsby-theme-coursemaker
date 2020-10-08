require("dotenv").config();

exports.normalizeImageUrl = (course) => {
  let course_image = {
    url: "",
  };
  if (course.course_image) {
    course.course_image = {
      url: course.course_image.url,
    };
  } else {
    console.log('\u001B[33m', `No course_image for "${course.title}"`);
    course.course_image = course_image;
  }

  return course;
}

exports.normalizeVideoUrl = (course) => {
  let course_video = null;
  if (course.course_video.url) {
    course.course_video = course_video.url
  } else {
    console.log('\u001B[33m', `No course_video for "${course.title}"`);
    course.course_video = course_video;
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
      course_image: normalizeImageUrl(course),
      course_video: normalizeVideoUrl(course)
    };
  },
  school: ({node: school}) => {
    return {
      ...school,
      meta: "strapi",
    };
  }
};
