const withDefaults = require(`./bootstrapping/default-options`);
require('dotenv').config();

module.exports = (themeOptions) => {
    const options = withDefaults(themeOptions);
    const { mdxOtherwiseConfigured = false, mdx: legacyConfigureMdxFlag = true } = themeOptions; // keep mdx flag so we don't introduce a breaking change

    return {
        siteMetadata: {
            title: 'My Cool School (update in gatsby-config)',
            strapiPluginOrFake: options.useStrapi,
            useAuth: options.useAuth,
            enablePayments: options.enablePayments, // required for paid courses
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
                            {
                                resolve: `gatsby-remark-sequence`,
                                options: {
                                    // see more details on https://github.com/bramp/js-sequence-diagrams
                                    'theme': 'hand',
                                }
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
                        {
                            resolve: `gatsby-remark-sequence`,
                            options: {
                                // see more details on https://github.com/bramp/js-sequence-diagrams
                                'theme': 'hand',
                            }
                        },
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
                    // replace "UA-XXXXXXXXX-X" with your own Tracking ID
                    trackingId: themeOptions.gaTrackingId,
                },
            },
            {
                resolve: `gatsby-plugin-gdpr-cookies`,
                options: {
                    googleAnalytics: {
                        trackingId: themeOptions.gaTrackingId, // leave empty if you want to disable the tracker
                        cookieName: 'gatsby-gdpr-google-analytics', // default
                        anonymize: true, // default
                    },
                    googleTagManager: {
                        trackingId: 'YOUR_GOOGLE_TAG_MANAGER_TRACKING_ID', // leave empty if you want to disable the tracker
                        cookieName: 'gatsby-gdpr-google-tagmanager', // default
                        dataLayerName: 'dataLayer', // default
                    },
                    facebookPixel: {
                        pixelId: 'YOUR_FACEBOOK_PIXEL_ID', // leave empty if you want to disable the tracker
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
            `gatsby-transformer-sharp`,
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
            {
                resolve: `gatsby-plugin-postcss`,
                options: {
                    postCssPlugins: [require(`tailwindcss`)('./tailwind.config.js')],
                },
            },
            'gatsby-plugin-stylus',
            {
                resolve: `gatsby-plugin-purgecss`,
                options: {
                    // develop: true, // Enable while using `gatsby develop`
                    tailwind: true, // Enable tailwindcss support
                    whitelist: [`h1`, 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'p', 'button'], // Don't remove this selector
                    whitelistPatterns: [
                        /^bg-gray-/,
                        /bg-white/,
                        /^bg-indigo-/,
                        /bg-black/,
                        /^bg-green-/,
                        /bg-blue-700/,
                        /^shadow/,
                        /hover:shadow-lg/,
                        /w-full/,
                        /w-48/,
                        /w-16/,
                        /w-8/,
                        /w-6/,
                        /w-5/,
                        /w-4/,
                        /h-48/,
                        /h-40/,
                        /h-24/,
                        /h-6/,
                        /h-5/,
                        /h-4/,
                        /h-2/,
                        /h-1/,
                        /^mt-/,
                        /^mb-/,
                        /^ml-/,
                        /mx-auto/,
                        /mx-1/,
                        /^py-/,
                        /p-6/,
                        /p-4/,
                        /^px-/,
                        /^pt-/,
                        /^pb-/,
                        /^space-y-/,
                        /space-x-6/,
                        /space-x-5/,
                        /flex/,
                        /flex-wrap/,
                        /inline-flex/,
                        /justify-between/,
                        /justify-content-center/,
                        /overflow-scroll/,
                        /overflow-hidden/,
                        /translate-x-1/,
                        /-translate-x-px/,
                        /-translate-x-6/,
                        /translate-y-px/,
                        /translate-y-6/,
                        /-translate-y-1/,
                        /hover:shadow-lg:hover/,
                        /hover:bg-green-400/,
                        /hover:bg-gray-100/,
                        /items-center/,
                        /items-end/,
                        /curriculum-list/,
                        /curriculum-item/,
                        /^btn/,
                        /^text-/,
                        /^font-/,
                        /^border/,
                        /^rounded/,
                        /^leading-/,
                        /^lecture-/,
                        /^transition/,
                        /top-0/,
                        /bottom-0/,
                        /left-0/,
                        /right-0/,
                        /z-20/,
                        /order-3/,
                        /duration-300/,
                        /list-none/,
                        /object-cover/,
                        /burger-menu/,
                        /is-active/,
                        /scroll-to/,
                        /card-list/,
                        /inline-block/,
                        /input-field/,
                        /input-fields/,
                        /video-wrapper/,
                        /section-header/,
                        /author-photo/,
                        /left-side/,
                        /order-last/,
                        /cursor-pointer/,
                        /responsive-video/,
                        /sticky/,
                        /container/,
                        /block/,
                        /hidden/,
                        /bar/,
                        /inner/,
                        /progress/,
                        /link/,
                        /sidebar/,
                        /relative/,
                        /absolute/,
                        /transform/,
                        /checkmark/,
                        /controls/,
                        /description/,
                        /md:h-64/,
                        /md:w-1\/2/,
                        /md:w-7\/12/,
                        /^md:py-/,
                        /md:px-10/,
                        /md:px-6/,
                        /md:pt-30/,
                        /md:pt-24/,
                        /md:pb-32/,
                        /md:pl-12/,
                        /md:mt-0/,
                        /md:mb-10/,
                        /md:mb-6/,
                        /md:text-3xl/,
                        /md:text-2xl/,
                        /md:text-base/,
                        /md:translate-x-0/,
                        /md:translate-y-0/,
                        /md:shadow-md/,
                        /md:shadow-2xl/,
                        /md:space-y-8/,
                        /md:flex/,
                        /md:inline-flex/,
                        /md:relative/,
                        /^lg:w-/,
                        /lg:h-64/,
                        /lg:h-24/,
                        /lg:h-auto/,
                        /lg:h-full/,
                        /lg:mt-10/,
                        /lg:mt-0/,
                        /lg:mb-10/,
                        /lg:mb-6/,
                        /lg:p-4/,
                        /lg:px-16/,
                        /^lg:py-/,
                        /lg:pt-32/,
                        /lg:pt-24/,
                        /lg:pb-32/,
                        /lg:pb-22/,
                        /lg:pb-0/,
                        /lg:pl-16/,
                        /lg:text-xl/,
                        /lg:space-x-6/,
                        /lg:space-y-10/,
                        /lg:space-y-0/,
                        /lg:order-none/,
                        /lg:order-1/,
                        /^lg:border-/,
                        /lg:hidden/,
                        /lg:flex/,
                        /lg:items-center/,
                        /lg:block/,
                        /lg:max-w-full/,
                        /lg:fixed/,
                        /lg:rounded-none/,
                        /xl:w-6\/12/,
                        /xl:w-5\/12/,
                    ],
                },
            },
            'gatsby-plugin-react-helmet',
            strapiPluginOrFake(),
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
            },
        };
    return false;
};
