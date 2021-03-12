module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'macros',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          assets: './assets/',
          src: './src',
          'app.json': './app.json',
          'package.json': './package.json',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
  ],
};
