// const path = require('path');

// doesn't look like required for workspace, https://dev.to/karanpratapsingh/cleaning-up-imports-using-module-resolver-in-react-native-58g8
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // plugins: [
  //   [
  //     'module-resolver',
  //     {
  //       alias: {
  //         react: require.resolve('react', {
  //           paths: [path.join(__dirname, './')],
  //         }),
  //         '^react-native$': require.resolve('react-native', {
  //           paths: [path.join(__dirname, './')],
  //         }),
  //         '^react-native/(.+)': ([, name]) =>
  //           require.resolve(`react-native/${name}`, {
  //             paths: [path.join(__dirname, './')],
  //           }),
  //       },
  //       extensions: [
  //         '.ios.js',
  //         '.ios.ts',
  //         '.ios.tsx',
  //         '.android.js',
  //         '.android.ts',
  //         '.android.tsx',
  //         '.native.js',
  //         '.native.ts',
  //         '.native.tsx',
  //         '.js',
  //         '.ts',
  //         '.tsx',
  //       ],
  //     },
  //   ],
  // ],
  // env: {
  //   test: {
  //     plugins: ['jest-hoist', 'dynamic-import-node'],
  //   },
  // },
};
