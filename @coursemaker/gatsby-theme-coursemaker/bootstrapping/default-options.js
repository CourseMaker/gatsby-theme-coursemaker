module.exports = ({
    basePath = '/',
    // location of the school + course + lecture content
    contentPath = process.env.GATSBY_CONTENT_PATH || 'school',
    // do not set this if using open-source
    useStrapi = process.env.GATSBY_USE_STRAPI || false,
    useAuth = process.env.GATSBY_USE_AUTH || false,
    enablePayments = process.env.GATSBY_ENABLE_PAYMENTS || false,
    // replace "UA-XXXXXXXXX-X" with your own Tracking ID
    gaTrackingId = process.env.GATSBY_GA_ID || 'UA-XXXXXXXXX-X',
    useExternalMDX = true,
}) => ({
    basePath,
    contentPath,
    coursesPath: `${contentPath}/courses`,
    authorsPath: `${contentPath}/authors`,
    useExternalMDX,
    useStrapi,
    useAuth,
    enablePayments,
    gaTrackingId,
});
