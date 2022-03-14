const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry:'./index.js',
  output:{
    path:path.join(__dirname,'.dist'),
    filename:'[name].js'
  },
  target: "web",
  module: { 
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader:"babel-loader",
          options:{
            presets:["@babel/preset-flow"]
          }
        },
      },
      { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use:["style-loader", "css-loader", "sass-loader" ]
      },
    ] 
  },
  plugins:[
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template:'./index.html',
      title: "Development",
      cache: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    compress: true,
    // hot:true,
    open:true,
    port:8880
  },
  performance: { hints: false },
  mode:'production'
}