/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://rizziinternational.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [],

  // For App Router support
  sourceDir: ".next", // This might help
};
