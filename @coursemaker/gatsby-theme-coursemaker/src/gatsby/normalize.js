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
    };
  },
  school: ({node: school}) => {
    return {
      ...school,
      meta: "strapi",
    };
  }
};
