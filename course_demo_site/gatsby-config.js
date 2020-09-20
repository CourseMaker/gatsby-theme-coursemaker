/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const useStrapi = process.env.USE_STRAPI === "true";

module.exports = {
  siteMetadata: {
      title: "Demo Site Cool School",
      landing_page: {
        title_and_description: {
          title: "Demo Site Cool School 4 realz",
          description: "Yaml description",
        }
      },
  },
  plugins: [
    {
      resolve: `gatsby-theme-coursemaker`,
      options: {
        // contentPath: "schoolMDX",
        // coursesPath: "schoolMDX/courses",
        // authorsPath: "schoolMDX/authors",
        useStrapi,
      },
    },
  ],
}
