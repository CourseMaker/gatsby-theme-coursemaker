const _ = require('lodash');

require('dotenv').config();

const orderSections = (course) => {
    let orderedSections;
    if (course?.sections == null || course?.sections.length === 0) {
        orderedSections = [];
    } else {
        const iteratee = 'order' in course?.sections[0] ? 'order' : 'id';
        orderedSections = _.orderBy(course?.sections, iteratee, 'asc');
    }
    course.sections = orderedSections;
    return course;
};

exports.setSectionOrder = (course) => orderSections(course);

exports.normalizeCourses = (schoolPrices) => (course) => {
    course = orderSections(course);
    // Filter for course purchases that contain this course
    const coursePurchases = schoolPrices.filter(
        (price) => price.is_active && price.courses.map((c) => c.id).includes(course.id)
    );
    if (coursePurchases.length) {
        // Set the most recent coursePurchase as the price_info for the course
        course.price_info = coursePurchases[coursePurchases.length - 1];
        return course;
    }
    // Filter for school memberships
    const schoolMemberships = schoolPrices.filter(
        (price) => price.is_active && (!price.courses || price.courses.length === 0)
    );
    if (schoolMemberships.length) {
        // Set the most recent schoolMembership as the price_info for the course
        course.price_info = schoolMemberships[schoolMemberships.length - 1];
        return course;
    }
    // This school has no applicable school prices configured that would allow a student to buy this course
    course.price_info = {};
    return course;
};

exports.normalizeCourseLandingPage = ({ node: course }) => {
    const landing_page = {};
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

    // section 6
    landing_page.faqHeading = course?.faqHeading;
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
    courses: ({ node: course }) => ({ ...course }),
    school: ({ node: school }) => ({ ...school }),
};

module.exports.cms = {
    courses: ({ node: course }) => ({
        ...course,
        course_image: normalizeImageUrl(course),
        course_video: normalizeVideoUrl(course),
    }),
    school: ({ node: school }) => ({
        ...school,
        meta: 'strapi',
    }),
};
