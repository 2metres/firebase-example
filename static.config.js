import axios from 'axios';
import {} from 'dotenv/config';
import Prismic from 'prismic-javascript';

export default {
  getSiteProps: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {

    const posts = await Prismic.api(process.env.PRISMIC_API_URL)
      .then(api => api.query('[ at(document.type, "post") ]'))
      .then(response => response.results)

    const homepage = await Prismic.api(process.env.PRISMIC_API_URL)
      .then(api => api.query('[ at(document.type, "homepage") ]'))
      .then(response => response.results[0])

    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getProps: () => ({ homepage }),
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/posts',
        component: 'src/containers/Posts',
        getProps: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/${post.id}`,
          component: 'src/containers/Post',
          getProps: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  // webpack: (config, { defaultLoaders }) => {
  //   config.module.rules = [
  //     {
  //       oneOf: [
  //         {
  //           test: /\.json$/,
  //           use: [{ loader: 'json-loader' }],
  //         },
  //         defaultLoaders.jsLoader,
  //         defaultLoaders.cssLoader,
  //         defaultLoaders.fileLoader,
  //       ],
  //     },
  //   ]
  //   return config
  // },
}
