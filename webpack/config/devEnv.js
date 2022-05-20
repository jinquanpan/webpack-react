const env = {
  MODE:'dev',
  PROJECT: process.argv.slice(2),
}
module.exports = {
  'env': {...env},
}