const withDefaults = require(`./bootstrapping/default-options`);
require("dotenv").config();

module.exports = (themeOptions) => {
  const options = withDefaults(themeOptions);
  let {
    mdxOtherwiseConfigured = false,
    mdx: legacyConfigureMdxFlag = true,
  } = themeOptions; // keep mdx flag so we don't introduce a breaking change

  return {
    siteMetadata: {
      title: "My Cool School (update in gatsby-config)",
      strapiPluginOrFake: options.useStrapi,
      useAuth: options.useAuth,
      enablePayments: options.enablePayments, // required for paid courses
      owner: {
        email: "yourEmailAddress@domain.com"
      },
      landing_page: {
        title_and_description: {
          title: "Demo Site (update in gatsby-config)",
          description: "Yaml description (update in gatsby-config)",
        },
        primary_button: {
          text: "View Courses",
          color: "black",
          text_color: "white",
        },
        cta_section: {
          "title": "Now is a great time to learn",
          "description": "Update me (update in gatsby-config)"
        },
        cta_button: {
          text: "View Courses",
          color: "black",
          text_color: "white",
        }
      },
    },
    plugins: [
      !mdxOtherwiseConfigured &&
      legacyConfigureMdxFlag && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1380,
                linkImagesToOriginal: false,
              },
            },
            { resolve: `gatsby-remark-copy-linked-files` },
            { resolve: `gatsby-remark-smartypants` },
          ],
          remarkPlugins: [require(`remark-slug`)],
        },
      },
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          // replace "UA-XXXXXXXXX-X" with your own Tracking ID
          trackingId: themeOptions.gaTrackingId,
        },
      },
      {
        resolve: `gatsby-plugin-gdpr-cookies`,
        options: {
          googleAnalytics: {
            trackingId: themeOptions.gaTrackingId, // leave empty if you want to disable the tracker
            cookieName: "gatsby-gdpr-google-analytics", // default
            anonymize: true, // default
          },
          googleTagManager: {
            trackingId: "YOUR_GOOGLE_TAG_MANAGER_TRACKING_ID", // leave empty if you want to disable the tracker
            cookieName: "gatsby-gdpr-google-tagmanager", // default
            dataLayerName: "dataLayer", // default
          },
          facebookPixel: {
            pixelId: "YOUR_FACEBOOK_PIXEL_ID", // leave empty if you want to disable the tracker
            cookieName: "gatsby-gdpr-facebook-pixel", // default
          },
          // defines the environments where the tracking should be available  - default is ["production"]
          environments: ["production", "development"],
        },
      },
      `gatsby-plugin-theme-ui`,
      `gatsby-transformer-yaml`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.coursesPath,
          name: options.coursesPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.authorsPath,
          name: options.authorsPath,
        },
      },
      `gatsby-transformer-sharp`,
      "gatsby-plugin-sharp",
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: "gatsby-starter-default",
          short_name: "starter",
          start_url: "/",
          background_color: "#663399",
          theme_color: "#663399",
          display: "minimal-ui",
        },
      },
      "gatsby-plugin-postcss",
      "gatsby-plugin-stylus",
      {
        resolve: `gatsby-plugin-sass`,
        options: {
          postCssPlugins: [
            require("tailwindcss"),
            require("./src/css/tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
          ],
        },
      },
      {
        resolve: `gatsby-plugin-stylus`,
      },
      "gatsby-plugin-react-helmet",
      strapiPluginOrFake(),
    ].filter(Boolean),
  };
};

// coursemaker team use only - don't worry about this if using the open-source version
const cmsAuth = require(`./src/auth/cms-auth`);

const enable_strapi = () => {
  if (process.env.GATSBY_USE_STRAPI){
    if (process.env.GATSBY_USE_STRAPI == "false") {
      return false;
    }
    return true;
  } else {
    return false;
  }
}

const strapiPluginOrFake = () => {
  if (enable_strapi()) {
    return {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "CMS",
        fieldName: "cms",
        url: `${process.env.GATSBY_CMS_BASE_URI}/graphql`,
        headers: async () => {
          return {
            Authorization: await cmsAuth.getAuthToken(),
          };
        },
        // Additional options to pass to node-fetch
        fetchOptions: {},
      },
    };
  } else {
    return false
  }
};