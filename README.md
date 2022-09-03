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
