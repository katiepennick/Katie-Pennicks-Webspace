const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://katiepennick.com",
    },
  });

  // Copy these through to the output site unchanged
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("neocities.png");
  eleventyConfig.addPassthroughCopy("favicon.png");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
