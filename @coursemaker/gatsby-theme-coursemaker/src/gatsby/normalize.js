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

exports.normalizePrices = (course) => {
  let priceInfo = {};
  if (course.school_prices == null) {
    course.price_info = priceInfo;
    return course;
  }

  course.school_prices.map(price => {
    if (price.courses[0].id == course.id && price.active) {
      priceInfo = price;
    }
  });
  course.price_info = priceInfo;
  return course;
}

exports.normalizeCourseLandingPage = ({ node: course}) => {
  let landing_page = {};
  landing_page.video_id = course?.video_id;

  course.landing_page = landing_page;
  return course;
}

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
