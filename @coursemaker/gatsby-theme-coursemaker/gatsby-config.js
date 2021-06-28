const withDefaults = require(`./bootstrapping/default-options`);
require('dotenv').config();

module.exports = (themeOptions) => {
    const options = withDefaults(themeOptions);
    const { mdxOtherwiseConfigured = false, mdx: legacyConfigureMdxFlag = true } = themeOptions; // keep mdx flag so we don't introduce a breaking change

    return {
        siteMetadata: {
            siteUrl: 'https://example.com', // used as the canonical metatag (use a trailing slash)
            title: 'My Cool School (update in gatsby-config)',
            strapiPluginOrFake: options.useStrapi,
            useAuth: options.useAuth,
            enablePayments: options.enablePayments, // required for paid courses
            schoolThemeStyle: {
                primaryColor: 'blue',
                secondaryColor: 'blue',
            },
            landing_page: {
                title: 'Demo Site (update in gatsby-config)',
                subtitle: 'Build your online course with open source',
                initialCTAText: 'View Courses',
                initialCTAColor: 'green',
                initialCTALink: '#courses',
                initialCTATextColor: 'white',
                overviewHeading: 'Welcome',
                overviewBody: 'update me',
                overviewCTAText: 'View Courses',
                overviewCTAColor: 'green',
                overviewCTALink: '#courses',
                overviewCTATextColor: 'white',
                testimonialsHeading: 'Testimonials',
                testimonialsBody: 'update me',
                faqHeading: 'FAQs',
                faqBody: 'update me',
                closingCTAText: 'Purchase Course',
                closingCTAColor: 'orange',
                closingCTALink: 'checkout',
                closingCTATextColor: 'white',
                contactHeading: 'Contact',
                contactBody: 'update me',
                videoID: null,
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
                            {
                                resolve: `gatsby-remark-katex`,
                                options: {
                                    strict: `ignore`,
                                },
                            },
                            // {
                            //   resolve: 'gatsby-remark-graph',
                            //   options: {
                            //     // this is the language in your code-block that triggers mermaid parsing
                            //     language: 'mermaid', // default
                            //     theme: 'default' // could also be dark, forest, or neutral
                            //   }
                            // },
                            { resolve: `gatsby-remark-copy-linked-files` },
                            { resolve: `gatsby-remark-smartypants` },
                        ],
                        remarkPlugins: [require(`remark-slug`)],
                    },
                },
            {
                resolve: 'gatsby-transformer-remark',
                options: {
                    plugins: [
                        // {
                        //   resolve: 'gatsby-remark-graph',
                        //   options: {
                        //     // this is the language in your code-block that triggers mermaid parsing
                        //     language: 'mermaid', // default
                        //     theme: 'default' // could also be dark, forest, or neutral
                        //   }
                        // }
                        {
                            resolve: `gatsby-remark-prismjs`,
                            options: {
                                // Class prefix for <pre> tags containing syntax highlighting;
                                // defaults to 'language-' (e.g. <pre class="language-js">).
                                // If your site loads Prism into the browser at runtime,
                                // (e.g. for use with libraries like react-live),
                                // you may use this to prevent Prism from re-processing syntax.
                                // This is an uncommon use-case though;
                                // If you're unsure, it's best to use the default value.
                                classPrefix: 'language-',
                                // This is used to allow setting a language for inline code
                                // (i.e. single backticks) by creating a separator.
                                // This separator is a string and will do no white-space
                                // stripping.
                                // A suggested value for English speakers is the non-ascii
                                // character '›'.
                                inlineCodeMarker: null,
                                // This lets you set up language aliases.  For example,
                                // setting this to '{ sh: "bash" }' will let you use
                                // the language "sh" which will highlight using the
                                // bash highlighter.
                                aliases: {},
                                // This toggles the display of line numbers globally alongside the code.
                                // To use it, add the following line in gatsby-browser.js
                                // right after importing the prism color scheme:
                                //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
                                // Defaults to false.
                                // If you wish to only show line numbers on certain code blocks,
                                // leave false and use the {numberLines: true} syntax below
                                showLineNumbers: false,
                                // If setting this to true, the parser won't handle and highlight inline
                                // code used in markdown i.e. single backtick code like `this`.
                                noInlineHighlight: false,
                                // This adds a new language definition to Prism or extend an already
                                // existing language definition. More details on this option can be
                                // found under the header "Add new language definition or extend an
                                // existing language" below.
                                languageExtensions: [
                                    {
                                        language: 'superscript',
                                        extend: 'javascript',
                                        definition: {
                                            superscript_types: /(SuperType)/,
                                        },
                                        insertBefore: {
                                            function: {
                                                superscript_keywords: /(superif|superelse)/,
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
            {
                resolve: `gatsby-plugin-google-analytics`,
                options: {
                    // The property ID; the tracking code won't be generated without it
                    trackingId: options.gaTrackingId,
                    // Defines where to place the tracking script - `true` in the head and `false` in the body
                    head: true,
                    // Delays sending pageview hits on route update (in milliseconds)
                    pageTransitionDelay: 0,
                    // Defers execution of google analytics script after page load
                    defer: false,
                    // Any additional optional fields
                    sampleRate: 100,
                    siteSpeedSampleRate: 10,
                },
            },
            {
                resolve: `gatsby-plugin-gdpr-cookies`,
                options: {
                    googleAnalytics: {
                        trackingId: '', // leave empty if you want to disable the tracker
                        cookieName: 'gatsby-gdpr-google-analytics', // default
                        anonymize: true, // default
                    },
                    googleTagManager: {
                        trackingId: '', // leave empty if you want to disable the tracker
                        cookieName: 'gatsby-gdpr-google-tagmanager', // default
                        dataLayerName: 'dataLayer', // default
                    },
                    facebookPixel: {
                        pixelId: '', // leave empty if you want to disable the tracker
                        cookieName: 'gatsby-gdpr-facebook-pixel', // default
                    },
                    // defines the environments where the tracking should be available  - default is ["production"]
                    environments: ['production', 'development'],
                },
            },
            `gatsby-plugin-force-trailing-slashes`,
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
            `gatsby-plugin-image`,
            'gatsby-plugin-sharp',
            {
                resolve: `gatsby-plugin-manifest`,
                options: {
                    name: 'gatsby-starter-default',
                    short_name: 'starter',
                    start_url: '/',
                    background_color: '#663399',
                    theme_color: '#663399',
                    display: 'minimal-ui',
                    icon: `./favicon.png`,
                },
            },
            `gatsby-transformer-sharp`,
            {
                resolve: `gatsby-plugin-postcss`,
                options: {
                    postCssPlugins: [require(`tailwindcss`)('./tailwind.config.js')],
                },
            },
            'gatsby-plugin-stylus',
            'gatsby-plugin-react-helmet',
            strapiPluginOrFake(),
            `gatsby-plugin-meta-redirect`, // make sure to put last in the array
        ].filter(Boolean),
    };
};

// coursemaker team use only - don't worry about this if using the open-source version
const cmsAuth = require(`./src/auth/cms-auth`);

const enable_strapi = () => {
    if (process.env.GATSBY_USE_STRAPI) return process.env.GATSBY_USE_STRAPI !== 'false';
    return false;
};

const strapiPluginOrFake = () => {
    if (enable_strapi())
        return {
            resolve: 'gatsby-source-graphql',
            options: {
                typeName: 'CMS',
                fieldName: 'cms',
                url: `${process.env.GATSBY_CMS_BASE_URI}/graphql`,
                headers: async () => ({
                    Authorization: await cmsAuth.getAuthToken(),
                }),
                // Additional options to pass to node-fetch
                fetchOptions: {},
                // refetch interval in seconds
                refetchInterval: 20,
            },
        };
    return false;
};
