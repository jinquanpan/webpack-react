const base = require('./webpack-base')
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

const build = {
  output: {
    path: path.resolve(__dirname, '../build'),
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
    new CleanWebpackPlugin() // 替换打包后的文件夹
  ],
  mode: "production",
  devtool:'cheap-module-source-map' // 映射浏览器报错文件位置
}
console.log(build.module.rules,build.plugins)
// 

module.exports = Object.assign(base,build)