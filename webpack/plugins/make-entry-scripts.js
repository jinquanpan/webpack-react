const os = require("os");

class ModulePlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    const { paths } = this.options;
    const assetsPublicPath =  '/webpack-react-1.0.0/'
    compiler.plugin('emit', (compilation, next) => {
      let css = [];
      let js = [];
      compilation.entrypoints.forEach(compiler => {
        for (const chunkKey of Object.keys(compiler.chunks)) {
          const chunk = compiler.chunks[chunkKey];
          for (const fileKey of Object.keys(chunk.files)) {
            
            const file = assetsPublicPath
              + chunk.files[fileKey]
            if (/\.js$/i.test(file)) {
              js.push(file);
            } else if (/\.css$/i.test(file)) {
              css.push(file);
            }
          }
        }
      })


      let moduleJson = {};
      // if (projectConfig) {
      //   if (projectConfig.data) {
      //     moduleJson.data = projectConfig.data;
      //   }
      //   if (projectConfig.injectHtml) {
      //     moduleJson.injectHtml = projectConfig.injectHtml;
      //   }
      // }
      moduleJson.css = css;
      moduleJson.js = js;
      console.log(1112,{moduleJson})
      /*let crypto = require('crypto');
      let md5 = crypto.createHash('md5');
      let md5ModuleJson = md5.update(JSON.stringify(moduleJson)).digest('hex')*/
      moduleJson = `_jkModules.push(${JSON.stringify(moduleJson)})`;

      compilation.assets[`module/module.js`] = {
        size() {
          return moduleJson.length;
        },
        source() {
          return moduleJson;
        }
      };
      // console.log({css, js, prodConfig})
      next();
    });
  }
}

module.exports = ModulePlugin;
