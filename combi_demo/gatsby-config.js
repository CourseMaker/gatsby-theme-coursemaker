/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-coursemaker`,
      options: {
        basePath: "/x",
        contentPath: "schoolX",
        coursesPath: "schoolX/courses",
        authorsPath: "schoolX/authors",
      },
    },
  ],
};
