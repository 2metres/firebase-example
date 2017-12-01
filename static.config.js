import 'dotenv/config'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { RichText } from 'prismic-dom'
import Prismic from 'prismic-javascript'

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
        getProps: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/${post.slugs[0]}`,
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
  webpack: [
    (config, { stage, defaultLoaders }) => {
      console.log(`=> Build Stage: ${stage}`)
      config.module.rules = [{
        oneOf: [
          defaultLoaders.jsLoader,
          {
            test: /\.scss$/,
            exclude: /module\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                { loader: 'css-loader' },
                { loader: 'sass-loader' },
              ],
            }),
          },
          {
            test: /module\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[folder]__[local]___[hash:base64:5]',
                  },
                },
                { loader: 'sass-loader' },
              ],
            }),
          },
          defaultLoaders.fileLoader,
        ],
      }]
      config.plugins.push(
        new ExtractTextPlugin({
          disable: stage === 'dev',
          filename: 'style.css',
          allChunks: true,
        }),
      )
      return config
    },
  ],
}
