require("dotenv").config();

exports.normalizePrices = (course) => {
  let priceInfo = {};
  if (course.school_prices == null) {
    course.price_info = priceInfo;
    return course;
  }

  course.school_prices.map((price) => {
    if (price.courses[0].id == course.id && price.active) {
      priceInfo = price;
    }
  });
  course.price_info = priceInfo;
  return course;
};

exports.normalizeCourseLandingPage = ({ node: course }) => {
  let landing_page = {};
  // section 1
  landing_page.title = course?.title;
  landing_page.subtitle = course?.subtitle;
  landing_page.initialCTA = {};
  landing_page.initialCTA.text = course?.initialCTAText;
  landing_page.initialCTA.color = course?.initialCTAColor;
  landing_page.initialCTA.link = course?.initialCTALink;
  landing_page.initialCTA.textColor = course?.initialCTATextColor;

  // section 2
  landing_page.video_id = course?.video_id;
  landing_page.image = course?.image;

  // section 3
  landing_page.overviewHeading = course?.overviewHeading;
  landing_page.overviewBody = course?.overviewBody;
  landing_page.overviewCTA = {};
  landing_page.overviewCTA.text = course?.overviewCTAText;
  landing_page.overviewCTA.color = course?.overviewCTAColor;
  landing_page.overviewCTA.link = course?.overviewCTALink;
  landing_page.overviewCTA.textColor = course?.overviewCTATextColor;

  // section 5
  landing_page.testimonialsHeading = course?.testimonialsHeading;
  landing_page.testimonialsBody = course?.testimonialsBody;

  //section 6
  landing_page.faqHeading = course?.faqHeading;
  landing_page.faqSubHeading = course?.faqSubHeading;
  landing_page.faqBody = course?.faqBody;

  // section 7
  landing_page.closingCTA = {};
  landing_page.closingCTA.text = course?.closingCTAText;
  landing_page.closingCTA.color = course?.closingCTAColor;
  landing_page.closingCTA.link = course?.closingCTALink;
  landing_page.closingCTA.textColor = course?.closingCTATextColor;

  course.landing_page = landing_page;
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
