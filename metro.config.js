/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig('.');

  return {
    transformer: {
      babelTransformerPath: require.resolve('./transformer.js'),
    },
    resolver: {
      sourceExts: [...sourceExts, 'scss', 'svg', 'json'],
      assetExts: assetExts.filter((ext) => !ext.match(/(svg|scss|json)$/)),
    },
  };
})();
