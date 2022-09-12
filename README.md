This project demonstrates react native, using yarn to version components in a monorepo.


### Instructions

- Make sure you have yarn 3
- Clone project
- Run `yarn install`


### Publishing

- Make updates to desired component
- Run `yarn workspace @dfs-demo/component-a tsc`
- `npm publish dist/libs/interceptor-react-native-with-reactotron --access public`


### Use Local
- yarn workspace app-mobile add @dfs-demo/component-a@0.1.0

### Use Remote
- yarn workspace app-mobile add @dfs-demo/component-a@0.1.1

### TODO
Understand existing RN behavior based on `workspaces-not-required-with-metro` branch.  That is yarn workspaces don't seem to be required for metro bundler to allow for workspace support.


### Errors

- If I rename local component-a then I get the following error: 
  - Error: Unable to resolve module @dfs-demo/component-a from C:\Users\steve\development\react-native-versioned-components-yarn1\app-mobile\App.js: @dfs-demo/component-a could not be found within the project or in these directories:
  node_modules
  ..\node_modules
So it appears to attempt to resolve locally and then via node_modules.

In fact there appears to be a symlink between the root `node_modules/@dfs-demo/component-a` and my local `packages/component-A` as editing one updates the other in realtime.  It seems like this package is used even if the version # doens't align.


For example if locally I define component A, node_modules symlinks to my local version regardless of the version number.  This means I cannot split the version between other packages, i.e. everyone points local always.

If I rename the package.json name of component A, then it symlinks to the new name and will look to npm to pull in the dependency.

Unlike node where I can use yarn workspaces to point local on version match or remote on no local match, something in RN simply symlinks a matching package name regardless of version #.

- Is this related? https://github.com/microsoft/rnx-kit/discussions/1582
- Read up more on metro: https://facebook.github.io/metro/docs/resolution/#algorithm
  - understand intersection better of metro + babel
  - Issue likely is in https://facebook.github.io/metro/docs/resolution


### Bundle when working

I can see various versions of the same component (comments added). In this case
main-app wants component-a v1.1.1
component-b wants component-a v3.0.0
component-c wants component-a v2.5.5

```js

// Main app code
}, "App can reference A directly (using ", (0, _$$_REQUIRE(_dependencyMap[4], "@dfs-demo/component-a").getVersion)(), ")"), _react.default.createElement(_reactNative.Text, {
    __self: _this,
    __source: {
    fileName: _jsxFileName,
    lineNumber: 47,
    columnNumber: 11
    }
}, "App can reference B who references A (using ", (0, _$$_REQUIRE(_dependencyMap[5], "@dfs-demo/component-b").getVersion)(), ")"), _react.default.createElement(_reactNative.Text, {
    __self: _this,
    __source: {
    fileName: _jsxFileName,
    lineNumber: 50,
    columnNumber: 11
    }
}, "App can reference C who references A (using ", (0, _$$_REQUIRE(_dependencyMap[6], "@dfs-demo/component-c").getVersion)(), ")"))));


// Remote dependency from main-app on to component-A v1.1.1
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getVersion = void 0;

  var getVersion = function getVersion() {
    return "Component-A 1.1.1";
  };

  exports.getVersion = getVersion;
},504,[],"node_modules\\@dfs-demo\\component-a\\src\\index.ts");


// My local component B
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getVersion = void 0;

  var getVersion = function getVersion() {
    return "Component-B 0.1.0 (local) referencing " + (0, _$$_REQUIRE(_dependencyMap[0], "@dfs-demo/component-a").getVersion)() + ", I should be referencing v3.0.0 per my local node_modules";
  };

  exports.getVersion = getVersion;
},505,[506],"..\\packages\\component-B\\src\\index.ts");


// Remote dependency from component-B on to v3.0.0
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getVersion = void 0;

  var getVersion = function getVersion() {
    return "Component-A 3.0.0";
  };

  exports.getVersion = getVersion;
},506,[],"..\\packages\\component-B\\node_modules\\@dfs-demo\\component-a\\dist\\index.js");


// My local component C
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getVersion = void 0;

  var getVersion = function getVersion() {
    return "Component-C 0.1.0 (local) referencing " + (0, _$$_REQUIRE(_dependencyMap[0], "@dfs-demo/component-a").getVersion)();
  };

  exports.getVersion = getVersion;
},507,[508],"..\\packages\\component-C\\src\\index.ts");

// Remote dependency from component-C on to v2.5.5
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getVersion = void 0;

  var getVersion = function getVersion() {
    return "Component-A 2.5.5";
  };

  exports.getVersion = getVersion;
},508,[],"..\\node_modules\\@dfs-demo\\component-a\\dist\\index.js");
```
