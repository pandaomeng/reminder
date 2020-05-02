import webpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import path from 'path';
// @ts-ignore
import config from './webpack.config.ts';
// @ts-ignore
import env from './env.ts';

// 处理 webpack config
// eslint-disable-next-line
for (const entryName in config.entry as any) {
  config.entry![entryName] = [
    `webpack-dev-server/client?http://localhost:${env.PORT}`,
    'webpack/hot/dev-server',
  ].concat(config.entry![entryName]);
}
const compiler = webpack(config);

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(config.plugins || []);
console.log('config', config);

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
webpackDevServer.addDevServerEntrypoints(config, options);

// eslint-disable-next-line new-cap
const server: webpackDevServer = new webpackDevServer(compiler, options);

server.listen(+env.PORT, 'localhost', () => {
  console.log(`dev server listening to port ${env.PORT}!`);
});
