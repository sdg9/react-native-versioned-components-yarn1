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
