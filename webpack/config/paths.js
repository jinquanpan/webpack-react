const path = require('path')
const cwd = process.cwd()

const basePath = {
  prod:'http://114.132.223.168:3355/',
  dev:path.resolve(cwd,'build','')
}

module.exports = function ({env},project) {
  console.log(111,env.MODE)
  let projectPath = env.MODE === 'prod' ? basePath.prod : basePath.dev;
  return {
    appPath: projectPath,
  }
}