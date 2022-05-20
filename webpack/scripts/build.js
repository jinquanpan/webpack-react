const webpack = require('webpack');
const { env } = require('../config/buildEnv')

function main (){
  const { PROJECT } = env
  for (let i = 0; i < PROJECT.length; i++) {
    let el = PROJECT[i]
    const confg = require('../config/paths')(env,el)
    const webpackCofing = require('../base/dev')(env,confg)
    const config = webpack(webpackCofing)
    console.log(777,config)
  }
}

main()