/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config();
const useStrapi = process.env.GATSBY_USE_STRAPI;

description_string =
  "Learn everything you need to know to use the @coursemaker/gatsby-theme-coursemaker \n" +
  "Including how to setup gated content and payments.";

cta_description_string =
  "There has never been an easier way to make an online course. \n" +
  "And it's free.";

module.exports = {
  siteMetadata: {
    title: "Demo Site Cool School",
    owner: {
      email: "chris@coursemaker.org",
    },
    landing_page: {
      title_and_description: {
        title: "The CourseMaker Demo School",
        description: description_string,
      },
      primary_button: {
        text: "View Courses",
        color: "green",
        text_color: "white",
      },
      cta_section: {
        title: "Everything you need to use CourseMaker's Tools",
        description: cta_description_string,
      },
      cta_button: {
        text: "View Courses",
        color: "green",
        text_color: "white",
      },
    },
    stripe_public_key: "pk_test_TYooMQauvdEDq54NiTphI7jx",
  },
  plugins: [
    {
      resolve: `@coursemaker/gatsby-theme-coursemaker`,
      options: {
        // contentPath: "schoolMDX",
        // coursesPath: "schoolMDX/courses",
        // authorsPath: "schoolMDX/authors",
        useStrapi: useStrapi,
      },
    },
  ],
};
