const path = require('path');
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');
const makeExternals = require("../plugins/make-externals")

module.exports = function (env,paths){
  const base = require('./webpack-base')(env,paths)
  let stringified = JSON.stringify(env)
  console.log('env',env,paths)
  const dev = {
    output: {
      path: paths.appPath,
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
    // externals: makeExternals(),
    plugins: [
      new htmlWebpackPlugin({
        template:path.resolve(paths.path, 'public','index.html'),// 静态文件要识别 htmlWebpackPlugin.options 属性要把html改成ejs文件
        title:'<script type="text/javascript" src="//192.168.2.52:3001/js/app.js"></script>', 
      }),
      new webpack.DefinePlugin(stringified),
      ...base.plugins,
    ],
    devServer:{
      compress:true,
      // open:true,
      hot:true, 
      port:8089
    },
    mode: "development",
    devtool:'cheap-module-source-map' // 映射浏览器报错文件位置
  }

  return Object.assign(base,dev)
}
