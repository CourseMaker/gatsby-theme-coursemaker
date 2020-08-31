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
      name: `Lecture`,
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
      name: `Section`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`,
        },
        slug: {
          type: `String!`,
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
        frontmatter: {
          type: `MdxFrontmatter`,
          resolve: mdxResolverPassthrough(`frontmatter`),
        },
        Lectures: {
          type: `[Lecture!]`,
          resolve: source =>
            sortBy(
              getNodesByType(`Lecture`).filter(Lecture =>
                Lecture.slug.startsWith(source.slug)
              ),
              ['slug']
            ),
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
        title: { type: `String!`},
        subtitle: { type: `String!`},
        description_overview: { type: `String!`},
        description: { type: `String!`},
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
        Sections: {
          type: `[Section!]`,
          resolve: source =>
            sortBy(
              getNodesByType(`Section`).filter(Section =>
                Section.slug.startsWith(source.slug)
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

  // Make sure the source is coursesPath
  if (source !== coursesPath) {
    return;
  }

  // if the relativeDirectory does not contain "section"
  // this means we are in the course root dir
  // in this scenario we just create the course node
  relDir = fileNode.relativeDirectory.toLocaleLowerCase();
  if (!relDir.includes('section')) {
    if (fileNode.name === `index`) {
      // create course node
      console.log('Creating course node...');
      const slug = node.frontmatter.slug
      ? sanitizeSlug(node.frontmatter.slug)
      : createFilePath({
          node: fileNode,
          getNode,
          basePath: coursesPath
        });
      const fieldData = {
        title: node.frontmatter.title,
        tags: node.frontmatter.tags,
        lastUpdated: node.frontmatter.lastUpdated,
        coverImage: node.frontmatter.coverImage,
        premium: node.frontmatter.premium,
        subtitle: node.frontmatter.subtitle,
        description_overview: node.frontmatter.description_overview,
        description: node.frontmatter.description,
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
      createParentChildLink({parent: fileNode, child: node});
    }
  } else {
    // Index with section means that this is the section
    // description -> Create section
    if (fileNode.name === `index`) {
      // create Section node
      const slug = createFilePath({
        node: fileNode,
        getNode,
        basePath: coursesPath,
      });
      const { title } = node.frontmatter;
      const fieldData = {
        title,
        slug,
      };
      createNode({
        ...fieldData,
        // Required fields.
        id: createNodeId(`${node.id} >>> Section`),
        parent: node.id,
        children: [],
        internal: {
          type: `Section`,
          contentDigest: createContentDigest(fieldData),
          content: JSON.stringify(fieldData),
          description: `Sections`,
        },
      });
      createParentChildLink({ parent: fileNode, child: node });
    } else {
      // create lecture node
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
        id: createNodeId(`${node.id} >>> Lecture`),
        parent: node.id,
        children: [],
        internal: {
          type: `Lecture`,
          contentDigest: createContentDigest(fieldData),
          content: JSON.stringify(fieldData),
          description: `Lectures`,
        },
      });
      createParentChildLink({ parent: fileNode, child: node });
    }
  }
};

// These templates are simply data-fetching wrappers that import components
const CourseLandingPageTemplate = require.resolve(`./src/templates/course-landing-page-template.js`);
const CurriculumPageTemplate = require.resolve("./src/templates/course-curriculum-page-template.js");
const LecturePageTemplate = require.resolve("./src/templates/lecture-page-template.js");

// 4. Create pages
exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const result = await graphql(`
    {
      site {
        siteMetadata {
          title
        }
      }
    allCourse {
      edges {
        node {
          Sections {
            Lectures {
              id
              slug
              title
              youtubeId
            }
            id
            title
            slug
          }
          slug
          title
          id
        }
      }
    }
  }
`);

  if (result.errors) {
    reporter.panic('error loading docs', result.errors);
  }

  const {
    allCourse,
    site: { siteMetadata },
  } = result.data;

  const courses = allCourse.edges;
  // create landing page for each course
  courses.forEach(({ node: course }, i) => {
    const nextCourse = i === courses.length - 1 ? null : courses[i + 1];
    const previousCourse = i === 0 ? null : courses[i - 1];
    const {slug} = course;
    actions.createPage({
      path: '/courses' + slug,
      component: CourseLandingPageTemplate,
      context: {
        id: course.id,
        course,
        previousCourse,
        nextCourse,
      },
    });
    // create curriculum page for each course
    actions.createPage({
      path: `/courses${slug}curriculum`,
      component: CourseLandingPageTemplate,
      context: {
        id: course.id,
        title: course.title,
      },
    });
    // TODO: tidy up inefficient nested loops
    // create page for each lecture
    course.Sections.forEach(function (section, index) {
      console.log(section);
      section.Lectures.forEach(function (lecture, index) {
        actions.createPage({
          path: `/courses${slug}lectures/${lecture.id}`,
          component: LecturePageTemplate,
          context: {
            title: course.title,
            id: course.id,
          },
        });
      });
    });
  });
};