const dayjs = require("dayjs");

module.exports = function (eleventyConfig) {
    // PassTrough
    eleventyConfig.addPassthroughCopy("./src/images");
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addWatchTarget("./src/css");
    eleventyConfig.addPassthroughCopy("./src/fonts");
    // Add Date filters
    eleventyConfig.addFilter("date", (dateObj) => {
        return dayjs(dateObj).format("D MMMM YYYY");
    });

    eleventyConfig.addFilter("sitemapDate", (dateObj) => {
        return dayjs(dateObj).toISOString();
    });

    eleventyConfig.addFilter("year", () => {
        return dayjs().format("YYYY");
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
    };
};