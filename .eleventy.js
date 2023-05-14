const dayjs = require("dayjs");


module.exports = function (eleventyConfig) {
    // PassTrough
    eleventyConfig.addPassthroughCopy("./src/assets");
    eleventyConfig.addWatchTarget("./src/assets/css");


    // Add Date filters
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