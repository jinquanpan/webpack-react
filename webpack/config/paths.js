const path = require('path')
const cwd = process.cwd()

const basePath = {
  prod:'http://114.132.223.168:3355/',
  dev:path.resolve(cwd,'build','')
}

module.exports = function (env,branch) {
  console.log(111,env)
  let projectPath = env.MODE === 'prod' ? basePath.prod : basePath.dev;
  return {
    appPath: projectPath,
    path: path.resolve(cwd,'project',branch),
    pathConfig:path.resolve(cwd,'project',branch,'config')
  }
}