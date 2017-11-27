require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.PRISMIC_REPO_NAME,
        accessToken: process.env.PRISMIC_TOKEN,
      },
    },
  ],
};
