const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
const { createFilePath } = require('gatsby-source-filesystem');
const withDefaults = require('./bootstrapping/default-options');
const sanitizeSlug = require('./bootstrapping/sanitize-slug');
const normalize = require('./src/gatsby/normalize');

const sortBy = require(`lodash/sortBy`);
require('dotenv').config();

const { createCourses, createSchool } = require('./src/gatsby/pageCreator');

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
    const { program } = store.getState();
    const { useStrapi } = withDefaults(themeOptions);

    const { authorsPath, coursesPath /* useStrapi */ } = withDefaults(themeOptions);

    const dirs = [path.join(program.directory, coursesPath), path.join(program.directory, authorsPath)];

    if (!useStrapi) {
        dirs.forEach((dir) => {
            if (!fs.existsSync(dir)) mkdirp.sync(dir);
        });
    }
};

const mdxResolverPassthrough = (fieldName) => async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
        id: source.parent,
    });
    const resolver = type.getFields()[fieldName].resolve;

    return await resolver(mdxNode, args, context, {
        fieldName,
    });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === 'build-html') {
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
        });
    }
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
                number: {
                    type: `Int`,
                },
                slug: {
                    type: `String!`,
                },
                allow_preview: {
                    type: `Boolean`,
                    defaultValue: false,
                },
                active: {
                    type: `Boolean`,
                    defaultValue: true,
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
                            type: 'Course',
                        });
                        const courseSlug = `/${source.slug.split('/')[source.slug.split('/').length - 3]}/`;
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
                number: {
                    type: `Int`,
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
                            getNodesByType(`Lecture`).filter((Lecture) => Lecture.slug.startsWith(source.slug)),
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
                title: { type: `String!` },
                subtitle: { type: `String` },
                videoID: { type: `String` },
                price: { type: `Int` }, // price in cents
                initialCTAText: { type: `String` },
                initialCTAColor: { type: `String` },
                initialCTALink: { type: `String` },
                initialCTATextColor: { type: `String` },
                overviewHeading: { type: `String` },
                overviewBody: { type: `String` },
                overviewCTAText: { type: `String` },
                overviewCTAColor: { type: `String` },
                overviewCTALink: { type: `String` },
                overviewCTATextColor: { type: `String` },
                testimonialsHeading: { type: `String` },
                testimonialsBody: { type: `String` },
                faqHeading: { type: `String` },
                faqBody: { type: `String` },
                closingCTAText: { type: `String` },
                closingCTAColor: { type: `String` },
                closingCTALink: { type: `String` },
                closingCTATextColor: { type: `String` },
                contactHeading: { type: `String` },
                contactBody: { type: `String` },
                slug: {
                    type: `String!`,
                },
                lastUpdated: { type: `Date`, extensions: { dateformat: {} } },
                tags: { type: `[String]` },
                premium: {
                    type: `String`,
                },
                author: {
                    type: `[AuthorsYaml]`,
                    resolve: (source, args, context) => {
                        courseAuthors = [];
                        for (let step = 0; step < source.author.length; step++) {
                            const node = getNodesByType(`AuthorsYaml`).find(
                                (author) => author.name === source.author[step]
                            );
                            if (node) {
                                courseAuthors.push(node);
                            }
                        }
                        return courseAuthors;
                    },
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
                            getNodesByType(`Section`).filter((Section) => Section.slug.startsWith(source.slug)),
                            ['slug']
                        ),
                },
                courseImage: {
                    type: `File`,
                },
            },
            interfaces: [`Node`],
        })
    );
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }, themeOptions) => {
    const { coursesPath } = withDefaults(themeOptions);

    const { createNode, createParentChildLink } = actions;

    // console.log('node.internal.type: ', node.internal.type);
    // Make sure it's an MDX node
    if (node.internal.type !== `Mdx`) return;

    // Create source field (according to coursesPath)
    const fileNode = getNode(node.parent);
    const source = fileNode.sourceInstanceName;

    // Make sure the source is coursesPath
    if (source !== coursesPath) return;

    // if the relativeDirectory does not contain "section"
    // this means we are in the course root dir
    // in this scenario we just create the course node
    const relDir = fileNode.relativeDirectory.toLocaleLowerCase();
    if (!relDir.includes('section')) {
        if (fileNode.name === `index`) {
            const slug = node.frontmatter.slug
                ? sanitizeSlug(node.frontmatter.slug)
                : createFilePath({
                      node: fileNode,
                      getNode,
                      basePath: coursesPath,
                  });
            const fieldData = {
                // landing page
                title: node.frontmatter.title,
                tags: node.frontmatter.tags,
                lastUpdated: node.frontmatter.lastUpdated,
                courseImage: node.frontmatter.courseImage,
                videoID: node.frontmatter.videoID,
                premium: node.frontmatter.premium,
                subtitle: node.frontmatter.subtitle,
                initialCTAText: node.frontmatter.initialCTAText,
                initialCTAColor: node.frontmatter.initialCTAColor,
                initialCTALink: node.frontmatter.initialCTALink,
                initialCTATextColor: node.frontmatter.initialCTATextColor,
                overviewHeading: node.frontmatter.overviewHeading,
                overviewBody: node.frontmatter.overviewBody,
                overviewCTAText: node.frontmatter.overviewCTAText,
                overviewCTAColor: node.frontmatter.overviewCTAColor,
                overviewCTALink: node.frontmatter.overviewCTALink,
                overviewCTATextColor: node.frontmatter.overviewCTATextColor,
                testimonialsHeading: node.frontmatter.testimonialsHeading,
                testimonialsBody: node.frontmatter.testimonialsBody,
                faqHeading: node.frontmatter.faqHeading,
                faqBody: node.frontmatter.faqBody,
                closingCTAText: node.frontmatter.closingCTAText,
                closingCTAColor: node.frontmatter.closingCTAColor,
                closingCTALink: node.frontmatter.closingCTALink,
                closingCTATextColor: node.frontmatter.closingCTATextColor,
                contactHeading: node.frontmatter.contactHeading,
                contactBody: node.frontmatter.contactBody,
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
            const { title, number } = node.frontmatter;
            const fieldData = {
                title,
                number,
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
            const { title, video, duration, number } = node.frontmatter;
            let videoDuration;
            // TODO: get video duration
            if (video && !duration) videoDuration = 1000;
            let { active } = node.frontmatter;
            if (active == null) {
                active = true;
            }
            let { allowPreview } = node.frontmatter;
            if (allowPreview == null) {
                allowPreview = false;
            }
            const fieldData = {
                title,
                duration: duration || videoDuration,
                video,
                slug,
                number,
                active,
                allow_preview: allowPreview,
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
    const build_id = process.env.GATSBY_SITE_BUILD_ID;
    const { useStrapi, isPreview } = withDefaults(themeOptions);

    const dataSources = {
        local: { authors: [], courses: [], school: {} },
        cms: { authors: [], courses: [], school: {} },
    };
    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    console.warn(`use strapi: ${useStrapi}`);
    if (useStrapi === 'true') {
        // TODO: move queries to separate files like this: https://github.com/narative/gatsby-theme-novela/blob/master/%40narative/gatsby-theme-novela/src/gatsby/node/createPages.js#L95
        try {
            const cmsData = await graphql(
                `
                    query RootQuery($build_id: ID!) {
                        cms {
                            siteBuild(id: $build_id) {
                                school {
                                    logo {
                                        url
                                    }
                                    name
                                    owner {
                                        email
                                    }
                                    external_id
                                    privacy_policy
                                    terms_and_conditions
                                    school_prices {
                                        id
                                        is_active
                                        currency
                                        name
                                        product_type
                                        product_type_readable
                                        recurring_interval
                                        recurring_interval_count
                                        unit_amount
                                        unit_amount_readable
                                        courses {
                                            id
                                        }
                                    }
                                    schoolThemeStyle {
                                        primaryColor
                                        secondaryColor
                                    }
                                    settings {
                                        google_analytics_tracking_id
                                        sub_domain
                                    }
                                    favicon {
                                        url
                                    }
                                    landing_page {
                                        title
                                        subtitle
                                        initialCTA {
                                            color
                                            link
                                            text
                                            textColor
                                        }
                                        video_id
                                        image {
                                            url
                                        }
                                        overviewHeading
                                        overviewBody
                                        overviewCTA {
                                            color
                                            link
                                            text
                                            textColor
                                        }
                                        testimonialsHeading
                                        testimonialsBody
                                        faqHeading
                                        faqBody
                                        closingCTA {
                                            color
                                            link
                                            text
                                            textColor
                                        }
                                        contactHeading
                                        contactBody
                                    }
                                    courses {
                                        id
                                        title
                                        subtitle
                                        school_prices {
                                            id
                                            is_active
                                            currency
                                            name
                                            product_type
                                            product_type_readable
                                            recurring_interval
                                            recurring_interval_count
                                            unit_amount
                                            unit_amount_readable
                                            courses {
                                                id
                                            }
                                        }
                                        author_display {
                                            id
                                            title
                                            description
                                            subtitle
                                            display
                                            photo {
                                                url
                                            }
                                        }
                                        landing_page: course_landing_page {
                                            title
                                            subtitle
                                            initialCTA {
                                                color
                                                link
                                                text
                                                textColor
                                            }
                                            video_id
                                            image {
                                                url
                                            }
                                            overviewHeading
                                            overviewBody
                                            overviewCTA {
                                                color
                                                link
                                                text
                                                textColor
                                            }
                                            testimonialsHeading
                                            testimonialsBody
                                            faqHeading
                                            faqBody
                                            closingCTA {
                                                color
                                                link
                                                text
                                                textColor
                                            }
                                            contactHeading
                                            contactBody
                                        }
                                        sections {
                                            id
                                            title
                                            order
                                            lectures {
                                                id
                                                title
                                                order
                                                video_id
                                                active
                                                allow_preview
                                                body_text
                                                body_markdown
                                                file_attachment {
                                                    id
                                                    url
                                                    name
                                                }
                                                code_submission_template {
                                                    title
                                                    source_code
                                                    stdin
                                                    task_list {
                                                        title
                                                        body
                                                    }
                                                    expected_output
                                                    cpu_time_limit
                                                    wall_time_limit
                                                    language_id
                                                    hints_markdown
                                                    code_execution_backend
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                `,
                { build_id }
            );
            dataSources.cms.courses = cmsData.data.cms.siteBuild.school.courses.map(
                normalize.normalizeCourses(cmsData.data.cms.siteBuild.school.school_prices)
            );
            dataSources.cms.school = cmsData.data.cms.siteBuild.school;
            dataSources.cms.school.isPreview = isPreview;
        } catch (error) {
            console.error('CMS query error');
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
                                slug
                                title
                                id
                                subtitle
                                initialCTAText
                                initialCTAColor
                                initialCTALink
                                initialCTATextColor
                                video_id: videoID
                                frontmatter {
                                    image: courseImage {
                                        childImageSharp {
                                            gatsbyImageData(width: 500, quality: 100)
                                        }
                                    }
                                }
                                overviewHeading
                                overviewBody
                                overviewCTAText
                                overviewCTAColor
                                overviewCTALink
                                overviewCTATextColor
                                testimonialsHeading
                                testimonialsBody
                                faqHeading
                                faqBody
                                closingCTAText
                                closingCTAColor
                                closingCTALink
                                closingCTATextColor
                                contactHeading
                                contactBody
                                sections: Sections {
                                    lectures: Lectures {
                                        id
                                        slug
                                        title
                                        active
                                        allow_preview
                                        video_id: video
                                        order: number
                                        body
                                    }
                                    id
                                    title
                                    order: number
                                    slug
                                }
                                author_display: author {
                                    title: name
                                    description: bio
                                    subtitle
                                    display
                                    photo: author_image {
                                        childImageSharp {
                                            gatsbyImageData(width: 500, quality: 100)
                                        }
                                    }
                                }
                            }
                        }
                    }
                    site {
                        siteMetadata {
                            siteUrl
                            schoolThemeStyle {
                                primaryColor
                            }
                            landing_page {
                                title
                                subtitle
                                initialCTAText
                                initialCTAColor
                                initialCTALink
                                initialCTATextColor
                                overviewHeading
                                overviewBody
                                overviewCTAText
                                overviewCTAColor
                                overviewCTALink
                                overviewCTATextColor
                                testimonialsHeading
                                testimonialsBody
                                faqHeading
                                faqBody
                                closingCTAText
                                closingCTAColor
                                closingCTALink
                                closingCTATextColor
                                contactHeading
                                contactBody
                                video_id: videoID
                            }
                            name: title
                            useAuth
                            enablePayments
                        }
                    }
                }
            `
        );
        dataSources.local.school = localData.data.site.siteMetadata;
        // this order matters
        dataSources.local.courses = localData.data.allCourse.edges.map(normalize.setSectionOrder);
        dataSources.local.courses = localData.data.allCourse.edges.map(normalize.local.courses);
        dataSources.local.courses = localData.data.allCourse.edges.map(normalize.normalizeCourseLandingPage);

        // TODO: images defined in siteMetaData do not get set as File nodes.
        //  Hack here is reusing the image from the course.
        dataSources.local.school.landing_page.image = '';
        if (dataSources.local.courses.length) {
            dataSources.local.school.landing_page.image = dataSources.local.courses[0]?.landing_page?.image;
        }
    } catch (error) {
        reporter.panic('error loading docs', error);
    }

    // combine courses to pass to school for ease of debugging
    const allCourses = [...dataSources.local.courses, ...dataSources.cms.courses];

    // school object is precise, however.
    let liveSchool;
    if (useStrapi === 'true') liveSchool = dataSources.cms.school;
    else liveSchool = dataSources.local.school;

    createSchool(liveSchool, allCourses, createPage);

    // course page creation is permissive
    createCourses(liveSchool, allCourses, createPage);

    // If a school only has one course, it makes sense to simply
    // Redirect to that course's landing page as the school landing
    // page is better suited to sites with multiple courses.
    if (allCourses && allCourses.length === 1) {
        const { createRedirect } = actions;
        const soleCourseSlug = allCourses[0].slug;
        createRedirect({
            fromPath: '/',
            toPath: `/courses${soleCourseSlug}`,
            isPermanent: true,
            force: true,
            redirectInBrowser: true,
        });
    }

    // Create course list page
    createPage({
        path: `/courses`,
        component: require.resolve('./src/templates/list-courses-page-template.js'),
        context: {
            school: liveSchool,
            courses: allCourses,
            pageTitle: 'Courses Page',
        },
    });

    // Create school terms page
    createPage({
        path: `/terms`,
        component: require.resolve('./src/templates/terms.js'),
        context: {
            school: liveSchool,
            pageTitle: 'Terms',
        },
    });

    // Create school privacy page
    createPage({
        path: `/privacy`,
        component: require.resolve('./src/templates/privacy.js'),
        context: {
            school: liveSchool,
            pageTitle: 'Privacy',
        },
    });
};
