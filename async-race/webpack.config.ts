import { EnvObj } from './src/types/config';

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

module.exports = (env: EnvObj) => {
  const mode = env.mode || 'development';
  const PORT = env.port || 8080;
  return {
    entry: {
      main: './src/pages/index.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '',
    },
    mode,
    devServer:
      mode === 'development'
        ? {
            static: path.resolve(__dirname, 'dist'),
            open: true,
            compress: true,
            port: PORT,
          }
        : undefined,
    devtool: mode === 'development' ? 'eval-source-map' : undefined,
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.ts$/i,
          loader: 'ts-loader',
        },
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: '/node_modules/',
        },
        {
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            mode === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/sounds/[name][ext]',
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
    ],
  };
};
