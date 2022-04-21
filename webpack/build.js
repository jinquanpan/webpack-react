const base = require('./webpack-base')
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const {name,version} = require("../package.json")
const makeEntryScripts = require('./make-entry-scripts')
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const env = process.env

const build = {
  output: {
    path: path.resolve(__dirname, `../build/${name}-${version}`),
    filename: './js/[name].js',
    publicPath:'/' //所有输出资源在引入公共组件时的公共路径
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          MiniCssExtractPlugin.loader,
          'css-loader',
          {   // 通过跟.browserslistrc文件配合处理各浏览器的css兼容
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: ()=> [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009'
                  },
                  stage:3
                }),
                require('postcss-normalize')()
              ],
              sourceMap: true
            }
          }
        ]
      },{
        test: /\.less$/,
        use: [ 
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: ()=> [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009'
                  },
                  stage:3
                }),
                require('postcss-normalize')()
              ],
              sourceMap: true
            }
          },
          'less-loader'
        ]
      },
      ...base.module.rules,
    ]
  },
  plugins: [
    // new makeEntryScripts({env }),
    ...base.plugins,
    new MiniCssExtractPlugin({
      filename:'css/[name].css',
    }),
    new OptimizeCssAssetsWebpackPlugin({ //压缩css文件
      cssProcessorPluginOptions: {
        preset: ['default',{ discardComments: { removeAll: true } }]
      },
      cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true
        }
      }
    }),
    new CleanWebpackPlugin(), // 替换打包后的文件夹
    new SentryWebpackPlugin({
      // sentry-cli configuration - can also be done directly through sentry-cli
      // see https://docs.sentry.io/product/cli/configuration/ for details
      url:'https://sentry.isjike.com/',
      authToken: "48fd06e9b4134bb19ac54222febb4ac57da672408fea492591f4e7246eafb000",
      release: "1.1.6",
      org:'sentry',
      project:"react-demo",
      // other SentryWebpackPlugin configuration
      ignore: ["node_modules", "webpack.config.js"],
      cleanArtifacts:true,
      // include: "build/webpack-react-1.1.6/js",
      // urlPrefix: "~/js/"
    }),
  ],
  mode: "production",
  devtool:'source-map' // 映射浏览器报错文件位置
}

module.exports = Object.assign(base,build)