const withDefaults = require(`./bootstrapping/default-options`);

module.exports = themeOptions => {
  const options = withDefaults(themeOptions);
  let {
    mdxOtherwiseConfigured = false,
    mdx: legacyConfigureMdxFlag = true
  } = themeOptions; // keep mdx flag so we don't introduce a breaking change

  return {
    siteMetadata: {},
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
                  linkImagesToOriginal: false
                }
              },
              { resolve: `gatsby-remark-copy-linked-files` },
              { resolve: `gatsby-remark-smartypants` }
            ],
            remarkPlugins: [require(`remark-slug`)]
          }
        },
      `gatsby-plugin-theme-ui`,
      `gatsby-transformer-yaml`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.coursesPath,
          name: options.coursesPath
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.authorsPath,
          name: options.authorsPath
        }
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
    ].filter(Boolean)
  };
};