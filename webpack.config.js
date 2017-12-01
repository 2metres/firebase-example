import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default (config, { stage, defaultLoaders }) => {
  config.module.rules = [{
    oneOf: [
      defaultLoaders.jsLoader,
      {
        test: /\.scss$/,
        exclude: /module\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: stage === 'prod',
              },
            },
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
                minimize: stage === 'prod',
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
}
