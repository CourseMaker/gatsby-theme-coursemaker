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
  "that's just fine.*";

faq_body_string =
  "You'll notice that I am **markdown**. \n" +
  "That means that \n" +
  "## There might be H2s \n" +
  "*or maybe something in italics like this. The sentence might be quite a long one that goes on for a while and " +
  "that's just fine.*";

module.exports = {
  siteMetadata: {
    title: "Demo Site Cool School",
    landing_page: {
      title: "Los Mejores pequeplanes cerca de ti12",
      subtitle:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      bgImg: "Image Will Go here.",
      initialCTAText: "View Courses",
      initialCTAColor: "yellow",
      initialCTALink: "#courses",
      initialCTATextColor: "white",
      overviewHeading: "Overview Courses",
      overviewBody:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      overviewCTAText: "View Courses",
      overviewCTAColor: "yellow",
      overviewCTALink: "#courses",
      overviewCTATextColor: "white",
      testimonialsHeading: "Testimonials",
      testimonialsBody:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.",
      faqHeading: "Frequently Asked Questions",
      faqBody:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.",
      landingAuthorTitle: "Chris",
      landingAuthorDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend nibh vel blandit interdum. Phasellus vel sodales justo, vel maximus tellus. Nulla semper risus nec massa tincidunt.",
      closingCTAText: "Purchase Course",
      closingCTAColor: "orange",
      guaranteeBtnText: "Enroll CTA",
      guaranteeTitle: "Share what you know.\n Sign up free today.",
      closingCTALink: "checkout",
      closingCTATextColor: "white",
      contactHeading: "Questions?",
      contactBody: "Any Questions? Send us an email to",
      videoID: "ScMzIvxBSi4",
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
