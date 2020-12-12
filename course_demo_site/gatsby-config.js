/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config();
const useStrapi = process.env.GATSBY_USE_STRAPI;

description_string =
  "Learn everything you need to know to use the @coursemaker/gatsby-theme-coursemaker \n" +
  "*Including how to setup gated content and payments* \n + " +
    "### here's a test H3";

cta_description_string =
  "There has never been an easier way to make an online course. \n" +
  "And it's free.";

overview_body_string =
    "You'll notice that I am **markdown**. \n" +
    "That means that \n" +
    "#### There might be H4s \n" +
    "*or maybe something in italics like this. The sentence might be quite a long one that goes on for a while and " +
    "that's just fine.*"

faq_body_string =
    "You'll notice that I am **markdown**. \n" +
    "That means that \n" +
    "## There might be H2s \n" +
    "*or maybe something in italics like this. The sentence might be quite a long one that goes on for a while and " +
    "that's just fine.*"

module.exports = {
  siteMetadata: {
    title: "Demo Site Cool School",
    landing_page: {
      title: "CourseMaker Demo School",
      subtitle: "Build your online course with open source",
      initialCTAText: "View Courses",
      initialCTAColor: "green",
      initialCTALink: "#courses",
      initialCTATextColor: "white",
      overviewHeading: "Welcome",
      overviewBody: overview_body_string,
      overviewCTAText: "View Courses",
      overviewCTAColor: "green",
      overviewCTALink: "#courses",
      overviewCTATextColor: "white",
      testimonialsHeading: "Testimonials",
      testimonialsBody: "update me",
      faqHeading: "FAQs",
      faqBody: faq_body_string,
      closingCTAText: "Purchase Course",
      closingCTAColor: "orange",
      closingCTALink: "checkout",
      closingCTATextColor: "white",
      contactHeading: "Contact",
      contactBody: "update me",
      videoID: "ts8c0FjkHDk"
    },
    stripe_public_key: process.env.GATSBY_STRIPE_PUBLISHABLE_KEY,
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
