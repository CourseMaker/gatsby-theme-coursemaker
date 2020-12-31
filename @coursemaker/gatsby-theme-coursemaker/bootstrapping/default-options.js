module.exports = ({
    basePath = '/',
    contentPath = 'school',
    coursesPath = 'school/courses',
    authorsPath = 'school/authors',
    useExternalMDX = true,
    useStrapi = process.env.GATSBY_USE_STRAPI || false,
    useAuth = process.env.GATSBY_USE_AUTH || false,
    enablePayments = process.env.GATSBY_ENABLE_PAYMENTS || false,
    // replace "UA-XXXXXXXXX-X" with your own Tracking ID
    gaTrackingId = process.env.GATSBY_GA_ID || 'UA-XXXXXXXXX-X',
    // stripeClientId = "UPDATE ME",
}) => ({
    basePath,
    contentPath,
    coursesPath,
    authorsPath,
    useExternalMDX,
    useStrapi,
    useAuth,
    enablePayments,
    gaTrackingId,
});
