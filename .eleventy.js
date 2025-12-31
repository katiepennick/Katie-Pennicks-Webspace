const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function (eleventyConfig) {
  console.log("Eleventy config loaded ✅");

  // Plugins
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://katiepennick.com",
    },
  });

  // Passthrough copies
  eleventyConfig.addPassthroughCopy({ css: "css" });
  eleventyConfig.addPassthroughCopy({ images: "images" });
  eleventyConfig.addPassthroughCopy({ fonts: "fonts" });
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("neocities.png");
  eleventyConfig.addPassthroughCopy("favicon.png");

  // ✅ Human-friendly date filter for Nunjucks
  eleventyConfig.addNunjucksFilter("dateIso", (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString();
  });

  eleventyConfig.addNunjucksFilter("readableDate", (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";

    // "Mon Dec 22 2025"
    const parts = d
      .toLocaleDateString("en-GB", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
      .split(" ");

    // toLocaleDateString often gives "Mon, 22 Dec 2025" in en-GB
    // Remove any trailing comma from weekday
    parts[0] = parts[0].replace(",", "");
    return parts.join(" ");
  });

  eleventyConfig.addCollection("topicTags", (collectionApi) => {
    const structural = new Set(["post", "desk", "shelf", "trunk"]);

    const tags = new Set();
    collectionApi.getFilteredByTag("post").forEach((item) => {
      (item.data.tags || []).forEach((t) => {
        if (!structural.has(t)) tags.add(t);
      });
    });

    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
