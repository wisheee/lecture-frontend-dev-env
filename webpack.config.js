const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader', 
          'css-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name][ext]?[hash]',
        },
      }
    ],
  },
  /**
   * TODO: 아래 플러그인을 추가해서 번들 결과를 만들어 보세요.
   * 1. BannerPlugin: 결과물에 빌드 시간을 출력하세요.
   * 2. HtmlWebpackPlugin: 동적으로 html 파일을 생성하세요.
   * 3. CleanWebpackPlugin: 빌드 전에 아웃풋 폴더를 깨끗히 정리하세요.
   * 4. MiniCssExtractPlugin: 모듈에서 css 파일을 분리하세요.
   */
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${childProcess.execSync('git config user.name')}
      `
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      }
    }),
    ...(
      process.env.NODE_ENV === 'production'
      ? [ new MiniCssExtractPlugin() ]
      : []
    ),
  ]
}
