const path = require('path');
const makeEntryScripts = require('./make-entry-scripts')
const webpack = require("webpack");
const env = require("./config/devEnv")
const htmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack-base')(env)
const dev = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath:'/' //所有输出资源在引入公共组件时的公共路径
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          'style-loader',
          'css-loader',
        ]
      },{
        test: /\.less$/,
        use: [ 
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      ...base.module.rules,
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template:'./public/index.html',// 静态文件要识别 htmlWebpackPlugin.options 属性要把html改成ejs文件
      title:'<script type="text/javascript" src="//192.168.2.52:3001/js/app.js"></script>', 
    }),
    new webpack.DefinePlugin(env.stringified),
    ...base.plugins,
  ],
  devServer:{
    compress:true,
    open:true,
    hot:true, 
    port:8089
  },
  mode: "development",
  devtool:'cheap-module-source-map' // 映射浏览器报错文件位置
}

module.exports = Object.assign(base,dev)