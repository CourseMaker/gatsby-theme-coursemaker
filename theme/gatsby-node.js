const Debug = require('debug');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const withDefaults = require('./bootstrapping/default-options');
const debug = Debug('gatsby-theme-coursemaker');


// Ensure that the content directory always exists to avoid errors.
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();
  const { contentPath, coursesPath, authorsPath } = withDefaults(themeOptions);
  const dirs = [
    path.join(program.directory, contentPath),
    path.join(program.directory, coursesPath),
    path.join(program.directory, authorsPath)
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dirs)) {
      mkdirp.sync(dir);
    }
  });
};

// Define a custom type to avoid errors if no data is present.
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type LecturePage implements Node @dontInfer {
      id: ID!
      title: String!
      youtubeId: String!
      path: String!
      updated: Date! @dateformat
      body: String!
    }
  `);
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
  const { basePath } = withDefaults(options);
  const parent = getNode(node.parent);

  // Only work on MDX files that were loaded by this theme.
  if (
    node.internal.type !== 'Mdx' ||
    parent.sourceInstanceName !== 'gatsby-theme-coursemaker'
  ) {
    return;
  }

  // Treat `index.mdx` like `index.html` (i.e. `docs/` vs. `docs/index`).
  const pageName = parent.name !== 'index' ? parent.name : '';

  actions.createNode({
    id: createNodeId(`LecturePage-${node.id}`),
    title: node.frontmatter.title || parent.name,
    youtubeId: node.frontmatter.youtubeId || '',
    updated: parent.modifiedTime,
    path: path.join('/', basePath, parent.relativeDirectory, pageName),
    parent: node.id,
    internal: {
      type: 'LecturePage',
      contentDigest: node.internal.contentDigest,
    },
  });
};

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info,
) => {
  const type = info.schema.getType('Mdx');
  const mdxNode = context.nodeModel.getNodeById({ id: source.parent });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, { fieldName });

  return result;
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    LecturePage: {
      body: {
        type: 'String!',
        resolve: (source, args, context, info) => {
          // Load the resolver for the `Mdx` type’s `body` field.
          const type = info.schema.getType('Mdx');
          const mdxFields = type.getFields();
          const resolver = mdxFields.body.resolve;

          // Load the `body` content from the parent MDX node and return that.
          const mdxNode = context.nodeModel.getNodeById({ id: source.parent });
          return resolver(mdxNode, args, context, {
            fieldName: 'body',
          });
        },
      },
    },
  });
};

exports.createPages = async ({ actions, graphql, reporter }, options) => {


  const result = await graphql(`
    query {
      allLecturePage {
        nodes {
          id
          path
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('error loading docs', result.errors);
  }

  const lectures = result.data.allLecturePage.nodes;

  lectures.forEach(page => {
    actions.createPage({
      path: page.path,
      component: require.resolve('./src/templates/lecture-template.js'),
      context: {
        pageID: page.id
      },
    });
  });
};