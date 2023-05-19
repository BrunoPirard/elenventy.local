
const dayjs = require('dayjs');
const languageFrench = require('dayjs/locale/fr');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const fs = require("fs");
const NOT_FOUND_PATH = "_site/404.html";

module.exports = function (eleventyConfig) {

    // Plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "default" // opt-out of <img/>-style XHTML single tags
    }
    });

    // PassTrough
    eleventyConfig.addPassthroughCopy('./src/robots.txt');
    eleventyConfig.addPassthroughCopy('./src/.htaccess');
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");
    eleventyConfig.addPassthroughCopy("./src/assets/images");
    eleventyConfig.addPassthroughCopy("./src/assets/js");
    eleventyConfig.addWatchTarget("./src/assets/sass");

    // Add Date filters
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addFilter("date", (dateObj) => {
        return dayjs(dateObj).locale(languageFrench).format("D MMMM YYYY");
    });

    eleventyConfig.addFilter("sitemapDate", (dateObj) => {
        return dayjs(dateObj).toISOString();
    });

    eleventyConfig.addFilter("year", () => {
        return dayjs().format("YYYY");
    });

    // Override Browsersync defaults (used only with --serve)
    // eleventyConfig.setBrowserSyncConfig({
    //   callbacks: {
    //     ready: function(err, browserSync) {
    //       const content_404 = fs.readFileSync('_site/404.html');

    //       browserSync.addMiddleware("*", (req, res) => {
    //         // Provides the 404 content without redirect.
    //         res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
    //         res.write(content_404);
    //         res.end();
    //       });
    //     },
    //   },
    //   ui: false,
    //   ghostMode: false
    // });

    // Eleventy code for 404 page
    eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          if (!fs.existsSync(NOT_FOUND_PATH)) {
            throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`);
          }

          const content_404 = fs.readFileSync(NOT_FOUND_PATH);
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
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
    //eleventyConfig.addCollection("pages", function (collections) {
    //  return collections.getFilteredByTag("page").sort(function (a, b) {
    //    return a.data.order - b.data.order;
    //    });
    //});

    // const postcss = require("postcss");
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
            layouts: "_layouts",
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
        locale: "fr",
        plugins: [
          require('postcss-jit-props')({files: ['./props.css']}),
          require('autoprefixer'),
        ],
    };
};