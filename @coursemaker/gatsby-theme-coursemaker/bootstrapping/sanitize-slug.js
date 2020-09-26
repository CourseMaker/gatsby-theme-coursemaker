module.exports = slug =>
  slug === "/" ? slug : `/${slug.replace(/^\/|\/$/g, "")}/`;