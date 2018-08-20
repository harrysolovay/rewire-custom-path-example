const {
  injectBabelPlugin,
  getLoader,
  loaderNameMatches
} = require('react-app-rewired')


const getEslintOptions = (rules) => {
  const matcher = (rule) => loaderNameMatches(rule, 'eslint-loader')
  return getLoader(rules, matcher).options
}


module.exports = (config, env, override = f => f) => {
  const oldOptions = config.eslint
  const newOptions = getEslintOptions(config.module.rules)
  const options = oldOptions || newOptions
  options.useEslintrc = true
  options.ignore = true
  override(options)
  config = injectBabelPlugin('react-require', config)
  return config
}