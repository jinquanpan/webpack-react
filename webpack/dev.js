const base = require('./webpack-base')
const path = require('path');

const dev = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].js',
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
  devServer:{
    compress:true,
    open:true,
    hot:true, 
    port:8088
  },
  mode: "development",
  devtool:'cheap-module-source-map' // 映射浏览器报错文件位置
}

module.exports = Object.assign(base,dev)