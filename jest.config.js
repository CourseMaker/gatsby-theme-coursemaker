const path = require(`path`)
const glob = require(`glob`)
const fs = require(`fs`)

const pkgs = glob.sync(`./@coursemaker/gatsby-theme-coursemaker`).map(p => p.replace(/^\./, `<rootDir>`))

module.exports = {
    transform: {
        "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
    },
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/@coursemaker/gatsby-theme-coursemaker/__mocks__/gatsby.js`,
    },
    testPathIgnorePatterns: [`<rootDir>/node_modules/`, `<rootDir>/.cache/`, `<rootDir>.*/public`,
        `<rootDir>/@coursemaker/gatsby-theme-coursemaker/node_modules`, `<rootDir>/course_demo_site/`],
    transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
    globals: {
        __PATH_PREFIX__: ``,
    },
    testURL: `http://localhost`,
    setupFiles: [`<rootDir>/loadershim.js`],
}