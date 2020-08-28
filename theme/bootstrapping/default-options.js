module.exports = ({
  basePath = '/',
  contentPath = 'school',
  coursesPath = 'school/courses',
  authorsPath = 'school/authors',
  useExternalMDX = false,
}) => ({
  basePath,
  contentPath,
  coursesPath,
  authorsPath,
  useExternalMDX,
});