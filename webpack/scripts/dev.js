const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const { env } = require('../config/devEnv')
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const { makeIp } = require('./utils')

function main (){
  const { PROJECT } = env
  for (let i = 0; i < PROJECT.length; i++) {
    let el = PROJECT[i]
    const confg = require('../config/paths')(env,el)
    let { port } = confg.pathConfig
    confg.pathConfig.host = makeIp()
    const webpackCofing = require('../base/dev')(env,confg)
    startServer(webpackCofing)
  }
}

function startServer (webpackConfig) {
  return new Promise(async (yes, no) => {
    const { devServer } = webpackConfig
    let { port, host } = devServer
    webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);
    const compiler = webpack(webpackConfig);
    const server = new webpackDevServer(compiler, devServer);
    port = await choosePort(host, port)
    if (!port) {
      console.log('port not found')
      return 
    }
    server.listen(port, host, (v) => {
      yes({host, port})
    });
  })
}

main()