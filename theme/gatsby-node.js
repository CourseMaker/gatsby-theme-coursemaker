const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const withDefaults = require('./bootstrapping/default-options');

// Ensure that the content directory always exists to avoid errors.
exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState();
  const { contentPath } = withDefaults(options);
  const dir = path.join(program.directory, contentPath);

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }
};

exports.createPages = ({ actions, reporter }) => {
  reporter.warn("make sure to load data from somewhere!")

  // TODO replace this with data from somewhere
  actions.createPage({
    path: "/",
    component: require.resolve("./src/templates/page.js"),
    context: {
      heading: "Your Theme Here 2",
      content: `
        <p>
          Use this handy theme example as the basis for your own amazing theme!
        </p>
        <p>
          For more information, see 
          <a href="https://themejam.gatsbyjs.org">themejam.gatsbyjs.org</a>.
        </p>
      `,
    },
  })
}