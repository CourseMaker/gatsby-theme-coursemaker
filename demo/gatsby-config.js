/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
      title: "Demo Site Cool School",
  },
  plugins: [
    {
      resolve: `gatsby-theme-coursemaker`,
      options: {
        // contentPath: "schoolMDX",
        // coursesPath: "schoolMDX/courses",
        // authorsPath: "schoolMDX/authors",
        useStrapi: true,

      },
    },
  ],
}