module.exports = {
  layout: "post.njk",
  tags: ["post"],

  // Drafts are private by default
  draft: true,

  // IMPORTANT: do NOT run Liquid/Nunjucks inside blog posts
  templateEngineOverride: "md",

  eleventyComputed: {
    // Only publish when explicitly marked draft: false
    permalink: (data) => {
      if (data.draft !== false) return false;
      return `/blog/${data.page.fileSlug}/`;
    },

    // Keep drafts out of collections
    eleventyExcludeFromCollections: (data) => data.draft !== false,
  },
};
