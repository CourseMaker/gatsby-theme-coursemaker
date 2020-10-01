const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const withDefaults = require(`./bootstrapping/default-options`);
const sanitizeSlug = require("./bootstrapping/sanitize-slug");
const normalize = require('./src/gatsby/normalize');
const {
  toSeconds,
  toHoursMinutes,
} = require("./bootstrapping/format-duration");
const sortBy = require(`lodash/sortBy`);

const {
  createCourses,
  createSchool,
} = require("./src/gatsby/pageCreator");

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();

  const { authorsPath, coursesPath, useStrapi } = withDefaults(themeOptions);

  const dirs = [
    path.join(program.directory, coursesPath),
    path.join(program.directory, authorsPath),
  ];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  });
};

const mdxResolverPassthrough = (fieldName) => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  });
  return result;
};


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

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
        video: {
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
              type: "Course",
            });
            const courseSlug = `/${
              source.slug.split("/")[source.slug.split("/").length - 3]
            }/`;
            const course = courses.filter((c) => c.slug === courseSlug)[0];
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
          resolve: (source) =>
            sortBy(
              getNodesByType(`Lecture`).filter((Lecture) =>
                Lecture.slug.startsWith(source.slug)
              ),
              ["slug"]
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
        title: { type: `String!` },
        subtitle: { type: `String` },
        price: {type: `Int`},  // price in cents
        description_overview: { type: `String` },
        description: { type: `String` },
        slug: {
          type: `String!`,
        },
        lastUpdated: { type: `Date`, extensions: { dateformat: {} } },
        tags: { type: `[String]` },
        premium: {
          type: `String`,
        },
        author: {
          type: `AuthorsYaml`,
          resolve: source =>
            getNodesByType(`AuthorsYaml`).find(
              author => author.name === source.author
            )
        },
        excerpt: {
          type: `String`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 180,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
        body: {
          type: `String`,
          resolve: mdxResolverPassthrough(`body`),
        },
        frontmatter: {
          type: `MdxFrontmatter`,
          resolve: mdxResolverPassthrough(`frontmatter`),
        },
        Sections: {
          type: `[Section]`,
          resolve: (source) =>
            sortBy(
              getNodesByType(`Section`).filter((Section) =>
                Section.slug.startsWith(source.slug)
              ),
              ["slug"]
            ),
        },
        course_image: {
          type: `File`,
        },
      },
      interfaces: [`Node`],
    })
  );
};

exports.onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest },
  themeOptions
) => {
  const { coursesPath } = withDefaults(themeOptions);

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
  if (!relDir.includes("section")) {
    if (fileNode.name === `index`) {
      // create course node
      console.log("Creating course node...");
      const slug = node.frontmatter.slug
        ? sanitizeSlug(node.frontmatter.slug)
        : createFilePath({
            node: fileNode,
            getNode,
            basePath: coursesPath,
          });
      const fieldData = {
        title: node.frontmatter.title,
        tags: node.frontmatter.tags,
        lastUpdated: node.frontmatter.lastUpdated,
        course_image: node.frontmatter.courseImage,
        premium: node.frontmatter.premium,
        subtitle: node.frontmatter.subtitle,
        description_overview: node.frontmatter.description_overview,
        description: node.frontmatter.description,
        author: node.frontmatter.author,
        slug,
      };
      createNode({
        ...fieldData,
        // Required fields.
        id: createNodeId(`${node.id} >>> Course`),
        parent: node.id,
        author: node.frontmatter.author,
        children: [],
        internal: {
          type: `Course`,
          contentDigest: createContentDigest(fieldData),
          content: JSON.stringify(fieldData),
          description: `Courses`,
        },
      });
      createParentChildLink({ parent: fileNode, child: node });
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
      const { title, video, duration } = node.frontmatter;
      let videoDuration;
      if (video && !duration) {
        // TODO: get video duration
        videoDuration = 1000;
      }
      const fieldData = {
        title,
        duration: duration || videoDuration,
        video,
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

// 4. Create pages
exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions;

  // TODO - Remove fallback ID
  // TODO - Add "Skip" / "Include" directive into GraphQL
  // TODO - we need to programatically set this
  const build_id = process.env.SITE_BUILD_ID || 61;
  const { useStrapi } = withDefaults(themeOptions);

  const dataSources = {
    local: { authors: [], courses: [], school: {} },
    cms: { authors: [], courses: [], school: {} },
  };

  console.log("use strapi: " + useStrapi);
  if (useStrapi) {
    // TODO: move queries to separate files like this: https://github.com/narative/gatsby-theme-novela/blob/master/%40narative/gatsby-theme-novela/src/gatsby/node/createPages.js#L95
    try {
      const cmsData = await graphql(`
        query RootQuery($build_id: ID!){
          cms {
            siteBuild(id: $build_id) {
              school {
                name
                owner {
                  email
                }
                courses {
                  id
                  title
                  author_display {
                    title
                  }
                  course_image {
                    url
                  }
                  sections {
                    id
                    title
                    lectures {
                      id
                      title
                      video_id
                      body_text
                      body_markdown
                    }
                  }
                }
                landing_page {
                  title_and_description {
                    description
                    title
                  }
                  primary_button {
                    text
                    color
                    text_color
                  }
                  cta_section {
                    title
                    description
                  }
                  cta_button {
                    text
                    color
                    text_color
                  }
                }
              }
            }
          }
        }
      `,
      {build_id}
    );
      // TODO: normalize
      cmsData.data.cms.siteBuild.school.useAuth = false;
      cmsData.data.cms.siteBuild.school.enablePayments = false;
      dataSources.cms.courses = cmsData.data.cms.siteBuild.school.courses.map(normalize.normalizeImageUrl);
      dataSources.cms.school = cmsData.data.cms.siteBuild.school;
    } catch (error) {
      console.error("CMS query error");
      console.error(error);
    }
  }

  try {
    const localData = await graphql(
      `
        query LocalRootQuery {
          allCourse {
            edges {
              node {
                sections: Sections {
                  lectures: Lectures {
                    id
                    slug
                    title
                    video_id: video
                    body
                  }
                  id
                  title
                  slug
                }
                slug
                title
                id
                author_display: author {
                  title: name
                }
                course_image {
                  childImageSharp {
                    fluid(maxWidth: 200, quality: 100) {
                      base64
                      aspectRatio
                      src
                      srcSet
                      sizes
                    }
                  }
                }
              }
            }
          }
          site {
            siteMetadata {
              landing_page {
                title_and_description {
                  title
                  description
                }
                primary_button {
                  text
                  color
                  text_color
                }
                cta_button {
                  text
                  color
                  text_color
                 }
                cta_section {
                  title
                  description
                }
              }
              owner {
                email
              }
              name: title
              useAuth
              enablePayments
            }
          }
        }
      `,
    );
    // TODO: normalize
    dataSources.local.school = localData.data.site.siteMetadata;
    dataSources.local.courses = localData.data.allCourse.edges.map(normalize.local.courses);
  } catch (error) {
    reporter.panic("error loading docs", error);
  }

  // combine courses to pass to school for ease of debugging
  allCourses = [
    ...dataSources.local.courses,
    ...dataSources.cms.courses,
  ];

  // school object is precise, however.
  let liveSchool;
  if (useStrapi) {
    liveSchool = dataSources.cms.school;
  } else {
    liveSchool = dataSources.local.school;
  }
  createSchool(liveSchool, allCourses, createPage);

  // course page creation is permissive
  createCourses(liveSchool, allCourses, createPage);

  // Create course list page
  createPage({
    path: `/courses`,
    component: require.resolve("./src/templates/list-courses-page-template.js"),
    context: {
      courses: allCourses,
    },
  });

};
