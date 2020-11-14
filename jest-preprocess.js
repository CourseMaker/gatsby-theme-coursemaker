const babelOptions = {
    presets: ["babel-preset-gatsby", "@babel/preset-react"],
}
module.exports = require("babel-jest").createTransformer(babelOptions)