module.exports = {
  layout: "post.njk",
  tags: ["post"],

  // Default: drafts stay private unless explicitly published
  draft: true,

  eleventyComputed: {
    // Only publish when draft is explicitly false
    permalink: (data) => {
      if (data.draft !== false) return false; // don't write a file
      return `/blog/${data.page.fileSlug}/`;
    },

    // Also hide drafts from collections (blog index, tag pages, etc.)
    eleventyExcludeFromCollections: (data) => data.draft !== false,
  },
};
