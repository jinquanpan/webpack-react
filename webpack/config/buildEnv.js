const env = {
  MODE:'prod', // prod 打包正式   local 本地打包
}
module.exports = {
  'env': env,
  stringified: { 'env': JSON.stringify(env) },
}