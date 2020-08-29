const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const withDefaults = require(`./bootstrapping/default-options`);
const sanitizeSlug = require("./bootstrapping/sanitize-slug");
const { toSeconds, toHoursMinutes } = require("./bootstrapping/format-duration");
const sortBy = require(`lodash/sortBy`);

let basePath;
let coursesPath;

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();
  const { authorsPath } = withDefaults(themeOptions);
  coursesPath = themeOptions.coursesPath || `school/courses`;

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
      name: `Lesson`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`,
        },
        slug: {
          type: `String!`,
        },
        youtubeId: {
          type: `String`,
        },
        duration: {
          type: `Int`,
        },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
        frontmatter: {
          type: `MdxFrontmatter`,
          resolve: mdxResolverPassthrough(`frontmatter`),
        },
        premium: {
          type: `String`,
          resolve: (source, args, context) => {
            const courses = context.nodeModel.getAllNodes({
              type: 'Course',
            });
            const courseSlug = `/${
              source.slug.split('/')[source.slug.split('/').length - 3]
            }/`;
            const course = courses.filter(c => c.slug === courseSlug)[0];
            return course.premium;
          },
        },
      },
      interfaces: [`Node`],
    })
  );
  createTypes(
    schema.buildObjectType({
      name: `Course`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`,
        },
        slug: {
          type: `String!`,
        },
        lastUpdated: { type: `Date`, extensions: { dateformat: {} } },
        tags: { type: `[String]!` },
        premium: {
          type: `String`,
        },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 180,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
        frontmatter: {
          type: `MdxFrontmatter`,
          resolve: mdxResolverPassthrough(`frontmatter`),
        },
        lessons: {
          type: `[Lesson!]`,
          resolve: source =>
            sortBy(
              getNodesByType(`Lesson`).filter(lesson =>
                lesson.slug.startsWith(source.slug)
              ),
              ['slug']
            ),
        },
        coverImage: {
          type: `File`,
        },
      },
      interfaces: [`Node`],
    })
  );
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Create source field (according to coursesPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  console.log(fileNode);
  console.log(source);
  console.log(coursesPath);

  // Make sure the source is coursesPath
  if (source !== coursesPath) {
    return;
  }

  if (fileNode.name === `index`) {
    // create course node
    const slug = createFilePath({
      node: fileNode,
      getNode,
      basePath: coursesPath,
    });
    const fieldData = {
      title: node.frontmatter.title,
      tags: node.frontmatter.tags,
      lastUpdated: node.frontmatter.lastUpdated,
      coverImage: node.frontmatter.coverImage,
      premium: node.frontmatter.premium,
      slug,
    };
    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Course`),
      parent: node.id,
      children: [],
      internal: {
        type: `Course`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Courses`,
      },
    });
    createParentChildLink({ parent: fileNode, child: node });
  } else {
    // create lesson node
    const slug = createFilePath({
      node: fileNode,
      getNode,
      basePath: coursesPath,
    });
    const { title, youtubeId, duration } = node.frontmatter;
    let videoDuration;
    if (youtubeId && !duration) {
      // TODO: get video duration
      videoDuration = 1000;
    }
    const fieldData = {
      title,
      duration: duration || videoDuration,
      youtubeId,
      slug,
    };
    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> Lesson`),
      parent: node.id,
      children: [],
      internal: {
        type: `Lesson`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Lessons`,
      },
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