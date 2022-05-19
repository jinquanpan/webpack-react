const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const { env } = require('../config/devEnv')
const openBrowser = require('react-dev-utils/openBrowser');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

function main (){
  const { PROJECT } = env
  for (let i = 0; i < PROJECT.length; i++) {
    let el = PROJECT[i]
    const confg = require('../config/paths')(env,el)
    const webpackCofing = require('../base/dev')(env,confg)
    startServer(webpackCofing)
    openBrowser("http://localhost:8089")
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