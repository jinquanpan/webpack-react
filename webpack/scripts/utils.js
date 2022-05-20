const os = require("os");

function makeIp () {
  var ifaces = os.networkInterfaces()
  var ip = '',
    result = []
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address
        return;
      }
    })
  }

// console.log(ifaces)
  return ip || '127.0.0.1'
}

module.exports = {
  makeIp:makeIp
}