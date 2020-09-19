const withDefaults = require(`./bootstrapping/default-options`);

const axios = require("axios");
const FormData = require("form-data");
const LOGIN_URL = "https://api.coursemaker.io"; // 'http://localhost:1337';
const COURSEMAKER_URL =
  process.env.CMS_BASE_PATH || "https://cms.coursemaker.io";

// Authenticate with coursemaker cms
// TODO: extract out into plugin
async function getAuthToken() {
  if (process.env.AUTH_HEADER) {
    return process.env.AUTH_HEADER;
  }
  if (process.env.AUTH_TOKEN) {
    return `Bearer ${process.env.AUTH_TOKEN}`;
  }

  // Otherwise login
  let data = new FormData();
  data.append("username", "test@test.com");
  data.append("password", "password");
  data.append("grant_type", "password");

  return await axios({
    method: "post",
    url: `${LOGIN_URL}/api/v1/login/access-token`,
    headers: data.getHeaders(),
    data: data,
  }).then(
    (response) => {
      return `Bearer ${response.data.access_token}`;
    },
    (error) => {
      console.log(error);
      throw error;
    }
  );
}

const useStrapi = () => {
  if (process.env.USE_STRAPI) {
    return {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "CMS",
        fieldName: "cms",
        url: `${COURSEMAKER_URL}/graphql`,
        headers: async () => {
          return {
            Authorization: await getAuthToken(),
          };
        },
        // Additional options to pass to node-fetch
        fetchOptions: {},
      },
    };
  }
};

module.exports = (themeOptions) => {
  const options = withDefaults(themeOptions);
  let {
    mdxOtherwiseConfigured = false,
    mdx: legacyConfigureMdxFlag = true,
  } = themeOptions; // keep mdx flag so we don't introduce a breaking change

  return {
    siteMetadata: {
      title: "My Cool School (update in gatsby-config)",
      useStrapi: options.useStrapi
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
                  // should this be configurable by the end-user?
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
            require("./tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
          ],
        },
      },
      {
        resolve: `gatsby-plugin-stylus`,
      },
      useStrapi(),
    ].filter(Boolean),
  };
};
