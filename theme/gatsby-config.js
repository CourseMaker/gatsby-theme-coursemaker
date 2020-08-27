const withDefaults = require('./bootstrapping/default-options');

module.exports = options => {
  const { contentPath, useExternalMDX } = withDefaults(options);

  return {
    siteMetadata: {
      title: "Gatsby Theme Coursemaker",
    },
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'gatsby-theme-docs',
          path: contentPath,
        },
      },
      !useExternalMDX && {
        resolve: 'gatsby-plugin-mdx',
        options: {
          defaultLayouts: {
            default: require.resolve('./src/components/layout.js'),
          },
        },
      },
      'gatsby-plugin-theme-ui',
    ].filter(Boolean),
  };
};