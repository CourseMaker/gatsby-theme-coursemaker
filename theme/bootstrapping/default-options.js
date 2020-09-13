module.exports = ({
  basePath = "/",
  contentPath = "school",
  coursesPath = "school/courses",
  authorsPath = "school/authors",
  useExternalMDX = false,
  useStrapi = true,
  // replace "UA-XXXXXXXXX-X" with your own Tracking ID
  gaTrackingId = "UPDATE ME",
  stripeClientId = "UPDATE ME",
}) => ({
  basePath,
  contentPath,
  coursesPath,
  authorsPath,
  useExternalMDX,
  useStrapi,
  gaTrackingId,
});
