// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = (promise, reporter) =>
  promise.then((result) => {
    if (result.errors) {
      reporter.panic("error loading docs", result.errors);
    }
    return result;
  });

const query1 = `
  

    allCourse {
      edges {
        node {
          Sections {
            Lectures {
              id
              slug
              title
              youtubeId
            }
            id
            title
            slug
          }
          slug
          title
          id
        }
      }
    }
  
  `;

module.exports = {
  wrapper,
  query1,
};
