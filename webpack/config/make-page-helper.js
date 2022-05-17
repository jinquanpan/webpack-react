const fs = require("fs");
const path = require("path");

function asyncReaddir(path, option) {
  return new Promise((resolve, _) => {
    fs.readdir(path, option, (err, files) => {
      if (err) {
        throw err;
      }
      resolve(files);
    });
  });
}

function asyncStat(path) {
  return new Promise((resolve, _) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        throw err;
      }
      resolve(stats);
    });
  });
}

function parsePath(p) {
  return p.replace(/\\/g, "\\\\");
}

async function loadModule(modulePath, addImportFun) {
  let resultJs = "{\n";
  let files = await asyncReaddir(modulePath);
  let asyncModule;
  let asyncLayout;
  let moduleConfig;
  let hasChilds = false;
  for (let file of files) {
    if (file == "components") {
      continue;
    }
    let absPath = path.resolve(modulePath, file);
    let stats = await asyncStat(absPath);
    if (stats.isDirectory()) {
      if (!hasChilds) {
        hasChilds = true;
        resultJs += `children:{\n`;
      }
      let dirModule = await loadModule(absPath, addImportFun);
      resultJs += `'${file}':${dirModule},\n`;
    } else if (/^index\.(js|jsx|mjs|ts|tsx)$/.test(file)) {
      asyncModule = file;
    } else if (/^layout\.(js|jsx|mjs|ts|tsx)$/.test(file)) {
      asyncLayout = file;
    } else if (/^_config\.(js|jsx|mjs|ts|tsx|json)$/.test(file)) {
      moduleConfig = file;
    } else {
      let match = /^([^_].*)\.(js|jsx|mjs|ts|tsx)$/.exec(file);
      if (match) {
        if (!hasChilds) {
          hasChilds = true;
          resultJs += `children:{\n`;
        }
        resultJs += `'${match[1]}': {\ncomponent: () => import(/* webpackPrefetch: true */ '${parsePath(
          absPath
        )}')\n},\n`;
      }
    }
  }
  if (hasChilds) {
    resultJs += "},\n";
  }
  if (asyncModule) {
    resultJs += `component: () => import(/* webpackPrefetch: true */ '${parsePath(
      path.resolve(modulePath, asyncModule)
    )}'),\n`;
  }
  if (asyncLayout) {
    resultJs += `layout: () => import(/* webpackPrefetch: true */ '${parsePath(
      path.resolve(modulePath, asyncLayout)
    )}'),\n`;
  }
  if (moduleConfig) {
    resultJs += `_config: ${addImportFun(
      parsePath(path.resolve(modulePath, moduleConfig))
    )},\n`;
  }
  resultJs += "}";
  return resultJs;
}

function addImport(result) {
  let count = 0;
  return module => {
    count++;
    result.import += `import _${count} from '${module}';\n`;
    return `_${count}`;
    // return `require('${module}').default`;
  };
}

module.exports = function(source) {
  // 'home': {//page对象
  //   asyncModule: () => import('@/page/home'),//按需加载组件
  //   config: {...},//当前路径的_config.js
  //   childs: {//子page
  //     'subRoute': {//子page对象
  //       asyncModule: () => import('@/page/home'),
  //       config: {...},
  //       childs: [...]
  //     }
  //   }
  // }
  // this.resourcePath += ".js";
  this.addContextDependency(this.context)
  const callback = this.async();
  (async () => {
    let result = {
      import: "",
      js: ""
    };
    let addImportFun = addImport(result);
    let moduleJs = await loadModule(this.context, addImportFun);
    result.js = `export default ${moduleJs}`;
    callback(null, result.import + result.js);
  })();
};
