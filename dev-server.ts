/* eslint-disable no-restricted-syntax */
import webpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import path from 'path';
import config from './webpack.config';
import env from './env';

// 处理 webpack config
const entries = Object.entries(config.entry as webpack.Entry);
const devConfig: webpack.Configuration = {
  ...config,
  plugins: [new webpack.HotModuleReplacementPlugin()].concat(config.plugins || []),
  entry: entries.reduce(
    (accumulator, [entryName, entryPath]) => ({
      ...accumulator,
      [entryName]: [
        `webpack-dev-server/client?http://localhost:${env.PORT}`,
        'webpack/hot/dev-server',
      ].concat(entryPath),
    }),
    {},
  ),
};
const compiler = webpack(devConfig);

// 设置 webpackDevServer 的 options
const options: webpackDevServer.Configuration = {
  contentBase: path.join(__dirname, 'dist'),
  hot: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  disableHostCheck: true,
  sockPort: env.PORT,
};
webpackDevServer.addDevServerEntrypoints(devConfig, options);

// eslint-disable-next-line new-cap
const server: webpackDevServer = new webpackDevServer(compiler, options);

server.listen(+env.PORT, 'localhost', () => {
  console.log(`dev server listening to port ${env.PORT}!`);
});
