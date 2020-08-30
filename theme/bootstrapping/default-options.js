module.exports = ({
  basePath = '/',
  contentPath = 'school',
  coursesPath = 'school/courses',
  authorsPath = 'school/authors',
  useExternalMDX = false,
  // replace "UA-XXXXXXXXX-X" with your own Tracking ID
  gaTrackingId = 'UPDATE ME',
  stripeClientId = 'UPDATE ME'
}) => ({
  basePath,
  contentPath,
  coursesPath,
  authorsPath,
  useExternalMDX,
  gaTrackingId
});