/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: 'Honey32 Bear Web Apps',
    description: `My Portfolio`,
    siteUrl: 'https://www.bearwapps.com',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.GATSBY_MICROCMS_API_KEY,
        serviceId: 'bearwebapps',
        endpoint: 'posts',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            output: '/feed.xml',
            title: 'Honey32 Bear Web App Feed',
            serialize: ({ query: { site, allMicrocmsPosts } }) => {
              return allMicrocmsPosts.edges.map(edge => {
                const post = edge.node
                const url = `${site.siteMetadata.siteUrl}/posts/${post.createdAt.substring(0, 10).replace(/-/g, '')}-${post.id.substring(0, 4)}`
                return {
                  description: post.content.substring(0, 50),
                  date: post.createdAt,
                  url: url,
                  guid: url,
                  custom_elements: [{ "content:encoded": post.content }],
                }
              })
            },
            query: `
              { 
                allMicrocmsPosts(limit: 1000, sort: {fields: [createdAt], order: DESC}) {
                  edges {
                      node {
                          id
                          createdAt
                          title
                          exerpt
                          content
                      }
                  }
                }
              }
            `,
          }
        ]
      }
    },
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
  ]
}
