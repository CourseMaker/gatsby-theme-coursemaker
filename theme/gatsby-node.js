const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const withDefaults = require(`./bootstrapping/default-options`);
const sanitizeSlug = require("./bootstrapping/sanitize-slug");
const { toSeconds, toHoursMinutes } = require("./bootstrapping/format-duration");

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();
  const { coursesPath, authorsPath } = withDefaults(themeOptions);

  const dirs = [
    path.join(program.directory, coursesPath),
    path.join(program.directory, authorsPath)
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  });
};

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName
  });
  return result;
};

exports.createSchemaCustomization = ({ getNodesByType, actions, schema }) => {
  const { createTypes } = actions;
  createTypes(
    schema.buildObjectType({
      name: `Lecture`,
      fields: {
        id: { type: `ID!` },
        slug: {
          type: `String!`
        },
        title: {
          type: `String!`
        },
        description: {
          type: `String!`
        },
        number: {
          type: `Int`
        },
        video: {
          type: `String!`
        },
        duration: {
          type: `String!`
        },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140
            }
          },
          resolve: mdxResolverPassthrough(`excerpt`)
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`)
        },
        frontmatter: {
          type: `MdxFrontmatter`,
          resolve: mdxResolverPassthrough(`frontmatter`)
        }
      },
      interfaces: [`Node`]
    })
  );
  createTypes(
      schema.buildObjectType({
      name: `Section`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`
        },
        description: {
          type: `String!`
        },
        number: {
          type: `Int`
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`)
        },
        frontmatter: {
          type: `MdxFrontmatter`,
          resolve: mdxResolverPassthrough(`frontmatter`)
        },
        lectures: {
          type: `[Lecture!]`,
          resolve: source => {
            const lessons = getNodesByType(`Lecture`);
            if (lessons.every(lesson => !lesson.number))
              return lessons.sort((a, b) => (a.slug > b.slug ? 1 : -1));
            else return lessons.sort((a, b) => (a.number > b.number ? 1 : -1));
          }
        },
      },
      interfaces: [`Node`]
    })
  );
  createTypes(
    schema.buildObjectType({
      name: `Course`,
      fields: {
        id: { type: `ID!` },
        slug: {
          type: `String!`
        },
        title: {
          type: `String!`
        },
        description: {
          type: `String!`
        },
        author: {
          type: `AuthorsYaml!`,
          resolve: source =>
            getNodesByType(`AuthorsYaml`).find(
              author => author.name === source.author
            )
        },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140
            }
          },
          resolve: mdxResolverPassthrough(`excerpt`)
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`)
        },
        frontmatter: {
          type: `MdxFrontmatter`,
          resolve: mdxResolverPassthrough(`frontmatter`)
        },
        sections: {
          type: `[Section!]`,
          resolve: source => {
            const sections = getNodesByType(`Section`);
            if (sections.every(section => !section.number))
              return sections.sort((a, b) => (a.slug > b.slug ? 1 : -1));
            else return sections.sort((a, b) => (a.number > b.number ? 1 : -1));
          }
        },
        cover: {
          type: `File!`
        }
      },
      interfaces: [`Node`]
    })
  );
};

exports.onCreateNode = async (
  { node, actions, getNode, createNodeId, createContentDigest },
  themeOptions
) => {
  const { createNode, createParentChildLink } = actions;
  const { coursesPath } = withDefaults(themeOptions);

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Create source field (according to coursesPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;
  console.log(fileNode);
  console.log(source);
  // fileNode.relativeDirectory
  // remove the content before the first /
  // relativeDirectory: 'test-course-a/section1',
  // regex on the remaining - if "section" found
  // then we create a section node

  // Make sure the source is coursesPath
  if (source !== coursesPath) {
    return;
  }

  if (fileNode.name === `index`) {
    // Create course node
    const slug = node.frontmatter.slug
      ? sanitizeSlug(node.frontmatter.slug)
      : createFilePath({
          node: fileNode,
          getNode,
          basePath: coursesPath
        });

    const { title, description, cover, author } = node.frontmatter;

    const fieldData = {
      slug,
      title,
      description,
      cover,
      author
    };

    createNode({
      ...fieldData,
      // Required fields
      id: createNodeId(`${node.id} >>> Course`),
      parent: node.id,
      children: [],
      internal: {
        type: `Course`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Courses`
      }
    });
    createParentChildLink({ parent: fileNode, child: node });
  } else {
    // Create lesson node
    const slug = node.frontmatter.slug
      ? `/${fileNode.relativeDirectory}${sanitizeSlug(node.frontmatter.slug)}`
      : createFilePath({
          node: fileNode,
          getNode,
          basePath: coursesPath
        });

    const { title, description, video, number, duration } = node.frontmatter;

    const fieldData = {
      slug,
      title,
      duration,
      video,
      number,
      description
    };

    createNode({
      ...fieldData,
      // Required fields
      id: createNodeId(`${node.id} >>> Lecture`),
      parent: node.id,
      children: [],
      internal: {
        type: `Lecture`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Lectures`
      }
    });
    createParentChildLink({ parent: fileNode, child: node });
  }
};


// 4. Create pages

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const result = await graphql(`
    query {
      allCourse {
        edges {
          node {
            id
            title
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('error loading docs', result.errors);
  }

  // Create courses and lessons pages.
  const { allCourse } = result.data;
  const courses = allCourse.edges;

  // create landing page for each course
  // Create the courses page
  // createPage({
  //   path: basePath,
  //   component: require.resolve('.src/templates/course-landing-template.js'),
  //   context: {
  //     courses: courses
  //   }
  // });

};