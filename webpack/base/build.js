const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const makeEntryScripts = require('../plugins/make-entry-scripts')
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const makeExternals = require("../plugins/make-externals")
const TerserPlugin = require("terser-webpack-plugin");
const os = require("os");
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = function(env, paths){
  const base = require('./webpack-base')(env,paths)
  console.log('paths', paths)

  const stringified = JSON.stringify(env)
  const build = {
    output: {
      path: path.resolve(paths.cwd,'build',paths.store),
      filename: 'js/[name].[contenthash:10].js',
      publicPath:'/', //所有输出资源在引入公共组件时的公共路径
      sourceMapFilename:'map/[name].[contenthash:10].js'
    },
    module: {
      rules: [
        ...base.module.rules,
      ]
    },
    optimization: {  //优化  
      minimizer: [
        // 压缩js
        new TerserPlugin({
          test: /\.js$/,
          cache: path.join(os.tmpdir(), ".terser-webpack-plugin"),
          extractComments: false,
          sourceMap: true, // Must be set to true if using source-maps in production 配置源映射这个配置必须
          terserOptions: {
            compress: {
              pure_funcs: ["console.log"], // 去除打印
            },
          },
        }),
      ],
      splitChunks: {
        chunks: "all",
        minSize: 100000,
        maxSize: 400000,
        minChunks: 2,
        maxAsyncRequests: 12,
        maxInitialRequests: 4,
        automaticNameDelimiter: "~",
        name: true,
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
      usedExports: true,
    },
    // externals: makeExternals(),
    plugins: [
      new webpack.DefinePlugin(stringified),
      new makeEntryScripts({paths}),
      new htmlWebpackPlugin({
        template:path.resolve(paths.path, 'public','index.html'),// 静态文件要识别 htmlWebpackPlugin.options 属性要把html改成ejs文件
        inject: false,  //是否引入js文件
        title:'<script type="text/javascript" src="//192.168.2.52:3001/js/app.js"></script>', 
        script:`<script type="text/javascript" src="${paths.appPath}${paths.store}//module/module.js"></script>`
      }),
      ...base.plugins,
      // new webpack.DllPlugin({
      //   path: path.join(__dirname, '/[name].manifest.json'),
      //   name: '[name]',
      //   context: __dirname // 这里的上下文要和我们后面用的DllReferencePlugin的上下文一致。
      // }),
      new CleanWebpackPlugin(), // 替换打包后的文件夹
      // new SentryWebpackPlugin({
      //   // sentry-cli configuration - can also be done directly through sentry-cli
      //   // see https://docs.sentry.io/product/cli/configuration/ for details
      //   url:'https://sentry.isjike.com/',
      //   authToken: "48fd06e9b4134bb19ac54222febb4ac57da672408fea492591f4e7246eafb000",
      //   release: "1.1.12",
      //   org:'sentry',
      //   project:"react-demo",
      //   // other SentryWebpackPlugin configuration
      //   ignore: ["node_modules", "webpack.config.js"],
      //   // cleanArtifacts:true,
      //   include: "build/webpack-react-1.0.0",
      //   // urlPrefix: "~/js"
      // }),
    ],
  
    mode: "production",
    devtool:'source-map' // 映射浏览器报错文件位置
  }
  return Object.assign(base,build)
}
