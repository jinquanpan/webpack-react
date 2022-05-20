const webpack = require('webpack');
const { env } = require('../config/buildEnv')
const fs = require('iofs');
const path = require('path')


function main (){
  const { PROJECT } = env
  for (let i = 0; i < PROJECT.length; i++) {
    let el = PROJECT[i]
    const config = require('../config/paths')(env,el)
    const webpackCofing = require('../base/build')(env,config)
    const compiler = webpack(webpackCofing)
    const projectPath = path.resolve(config.cwd,'build', config.store)
    if(fs.exists(projectPath)) {
      fs.rm(projectPath);
    }
    
    new Promise((yes, no) => {
      compiler.run((err, stat) => {
        console.log(777,err)
        if (err) {
          yes(err)
        } else {
          yes(stat)
          
          if(fs.exists(
            path.resolve(projectPath, 'index.html')
          )) {
            fs.mv(
              path.resolve(
                projectPath,
                'index.html'
              ), 
              `${projectPath}/index.html`
            );
            // copyPublicFolder()
          }
        }
      })
    })
  }
}

main()