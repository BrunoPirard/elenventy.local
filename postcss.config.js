// postcss.config.js
const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
const postcssCustomMedia = require('postcss-custom-media');

module.exports = {
  plugins: [
    postcssJitProps(OpenProps),
    postcssCustomMedia({ preserve: true })
  ]
};