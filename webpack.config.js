const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry:'./index.js',
  output:{
    path:path.join(__dirname,'.dist'),
    filename:'[name].js'
  },
  module: { 
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader:"babel-loader",
        },
      },
      { 
        test: /\.css$/, 
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use:[MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ]
      },
    ] 
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:'./index.html',
      title: "Development",
    }),
    new MiniCssExtractPlugin({
      filename:'[name].[hash:8].css'
    })
  ],
  target: "web",
  devServer:{
    compress: true,
    hot:true,
    open:true,
    port:8880
  },
  performance: { hints: false },
  mode:'production'
}
// 模块热更新
if (module.hot) {
  module.hot.accept("./js/element.js", (res) => {
    console.log("element 模块发生热更新了",res)
  })
}
