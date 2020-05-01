import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';

const config: webpack.Configuration = {
  mode: 'production',
  entry: { background: path.join(__dirname, 'src', 'js', 'background.js') },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json',
      },
    ]),
    new WriteFileWebpackPlugin(),
  ],
};

export default config;
