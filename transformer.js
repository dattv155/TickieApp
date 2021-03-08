/**
 * @format
 */

// const BabelTransformer = require('metro-react-native-babel-transformer');
const SASSTransformer = require('react-native-sass-transformer');
const PostCSSTransformer = require('react-native-postcss-transformer');
const SVGTransformer = require('react-native-svg-transformer');

module.exports.transform = async function ({src, filename, options}) {
  if (
    filename.endsWith('scss') ||
    filename.endsWith('sass') ||
    filename.endsWith('css')
  ) {
    const css = await SASSTransformer.renderToCSS({src, filename, options});
    return PostCSSTransformer.transform({src: css, filename, options});
  }

  return SVGTransformer.transform({src, filename, options});
};
