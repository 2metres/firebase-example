import 'dotenv/config'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-dom'

import webpackConfig from './webpack.config'

export default {
  getSiteProps: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const postsReq = Prismic.api(process.env.PRISMIC_API_URL)
      .then(api => api.query('[ at(document.type, "post") ]'))
      .then(response => response.results)

    const homepageReq = Prismic.api(process.env.PRISMIC_API_URL)
      .then(api => api.query('[ at(document.type, "homepage") ]'))
      .then(response => response.results[0])

    const [
      posts,
      homepage,
    ] = await Promise.all([
      postsReq,
      homepageReq,
    ])

    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getProps: () => ({
          homepage: {
            id: homepage.id,
            title: RichText.asText(homepage.data.homepage.title.value),
            description: RichText.asText(homepage.data.homepage.description.value),
            contents: homepage.data.homepage.contents.value,
          },
        }),
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/posts',
        component: 'src/containers/Posts',
        getProps: () => ({ posts }),

        children: posts.map(post => ({
          path: `/${post.slugs[0]}`,
          component: 'src/containers/Post',
          getProps: () => ({ post }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  webpack: [webpackConfig],
}
