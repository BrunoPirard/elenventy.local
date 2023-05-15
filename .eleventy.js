
const dayjs = require('dayjs');

module.exports = function (eleventyConfig) {
    // PassTrough
    eleventyConfig.addPassthroughCopy("./src/assets");
    eleventyConfig.addWatchTarget("./src/assets/sass");

    
  //eleventyConfig.addPlugin(svgContents)

    // Add Date filters
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    eleventyConfig.addFilter("date", (dateObj) => {
        return dayjs(dateObj).format("D MMMM YYYY");
    });

    eleventyConfig.addFilter("sitemapDate", (dateObj) => {
        return dayjs(dateObj).toISOString();
    });

    eleventyConfig.addFilter("year", () => {
        return dayjs().format("YYYY");
    });

    /* Markdown plugins */
    // https://www.11ty.dev/docs/languages/markdown/
    // --and-- https://github.com/11ty/eleventy-base-blog/blob/master/.eleventy.js
    // --and-- https://github.com/planetoftheweb/seven/blob/master/.eleventy.js
    let markdownIt = require("markdown-it")
    let markdownItFootnote = require("markdown-it-footnote")
    let markdownItPrism = require('markdown-it-prism')
    let markdownItBrakSpans = require('markdown-it-bracketed-spans')
    let markdownItLinkAttrs = require('markdown-it-link-attributes')
    let markdownItOpts = {
      html: true,
      linkify: false,
      typographer: true
    }
    const markdownEngine = markdownIt(markdownItOpts)
    markdownEngine.use(markdownItFootnote)
    markdownEngine.use(markdownItPrism)
    markdownEngine.use(markdownItBrakSpans)
    markdownEngine.use(markdownItLinkAttrs, {
      pattern: /^https:/,
      attrs: {
        target: '_blank',
        rel: 'noreferrer noopener'
      }
    });

    // Add pages collection
   //     eleventyConfig.addCollection("pages", function (collections) {
    //        return collections.getFilteredByTag("page").sort(function (a, b) {
     //       return a.data.order - b.data.order;
      //      });
      //  });

    return {
        dir: {
            input: "src",
            output: "public",
        },
        templateFormats: [
          'html',
          'md',
          'njk',
          '11ty.js'
          ],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        passthroughFileCopy: true,
        plugins: [
    require('postcss-jit-props')({files: ['./props.css']}),
    require('autoprefixer'),
  ],
    };
};