const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const cwd = process.cwd()

module.exports =  function({env}){
  return {
    entry: ['./src/index.js'],
    module: {
      rules: [
        // {
        //   test:/\.js/,
        //   exclude:'/node_modules/', //排除校验文件
        //   enforce:'pre', // 提前加载
        //   use:{
        //     loader:'eslint-loader'
        //   }
        // },
        { //处理图片格式
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                esModule: false, //解决静态文件html图片引入转换 [object Module]问题
                outputPath: 'img', //决定文件本地输出路径
                publicPath: '/img/', //决定图片使用的url路径
                name: '[hash:8].[ext]', 
                limit: 8192
              }
            }
          ]
        },
        // presets: []
        { // es6转es5
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include:path.resolve(cwd,'src'),
          use: {
            loader: 'babel-loader', 
            options: {
              presets: [
                [
                  '@babel/preset-env',{
                    useBuiltIns: "usage", //按需引入使用的polyfill
                    corejs: { version: 3 }, //解决查找不到的core-js问题
                    targets: { // 指定兼容性处理哪些浏览器
                      "chrome": "78",
                      "ie": "9"
                    }
                  },
                  '@babel/preset-react'
                ]
              ],
              cacheDirectory: true //开启babel缓存
            }
          }
        },
        {
          test: /\.js$/,
          resourceQuery: /jkMakeAsync/,
          type: 'javascript/auto',
          use: [
            {
              loader: require.resolve(
                path.resolve(cwd, 'webpack/config/make-page-helper')
              )
            }
          ]
        },
        {
          test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath:'medle',
                name:'[hash:8].[ext]'
              },
            },
          ],
        },
      ]
    },
    resolve:{
      alias:{
        "@": path.resolve(cwd,'src'),
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename:'css/[name].[contenthash:10].css',
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
      })
    ],
    
  };
} 