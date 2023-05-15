
const dayjs = require('dayjs');

module.exports = function (eleventyConfig) {
    // PassTrough
    eleventyConfig.addPassthroughCopy('robots.txt')
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");
    eleventyConfig.addPassthroughCopy("./src/assets/images");
    eleventyConfig.addPassthroughCopy("./src/assets/js");
    //eleventyConfig.addPassthroughCopy("./src/assets");
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
  //   const postcss = require("postcss");
  // const postcssMinify = require("postcss-minify");
  // eleventyConfig.addPlugin(bundlerPlugin, {
  //   transforms: [
  //     async function (content) {
  //       // this.type returns the bundle name.
  //       if (this.type === "css") {
  //         // Same as Eleventy transforms, this.page is available here.
  //         let result = await postcss([postcssMinify]).process(content, {
  //           from: this.page.inputPath,
  //           to: null,
  //         });
  //         return result.css;
  //       }

  //       return content;
  //     },
  //   ],
  // });
  
    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            //layouts: "_layouts",
            data: "_data",
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