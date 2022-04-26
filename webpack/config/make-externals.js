
module.exports = function () {
  // if (!buildExternalsJs.length) {
  //   buildExternalsJs = globalLibs;
  // }
  return function (context, request, callback) {
    console.log(5558,context, request, callback)
    // getRequest(context, request)

    // let str = externalsJsMap[request];
    // if (str!== undefined) {
    //   // console.log({str})
    //   // endTime += Date.now() - start
    //   // console.log({endTime1: endTime})
    //   return callback(null, str);
    // }

    // for (let i in buildExternalsJs) {
    //   if (new RegExp(`${buildExternalsJs[i]}(\.js)?$`, 'g').test(request)) {
    //     // console.log(`DEPENDCOLLECT[${i}]`)
    //     return callback(null, `jkG[${i}]`)
    //   }
    // }
    callback()
  }
}